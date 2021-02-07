import Editoro from ".";
import { Block } from "./block";
import { Toolbar } from "./toolbar";

export class BlockManager {
  private _blockClassName = "editoro-block";
  private _css_paragraph = "editoro-paragraph";
  private _css_unorderedlist = "editoro-ul";
  private _css_image = "editoro-image";
  private _css_block_container = "editoro-blocks-container";
  private editor: HTMLDivElement;
  private blockContainer: HTMLDivElement;
  private toolbar: Toolbar;

  constructor(editor: HTMLDivElement, blockContainer: HTMLDivElement, toolbar: Toolbar) {
    this.editor = editor;
    this.toolbar = toolbar;
    this.blockContainer = blockContainer;

    this.containerEvents();
    // document.addEventListener('selectionchange' , (e) => {
    //   console.log(e);
    // })
  }

  public insertBlocks(blocks?: Block[]) {
    blocks.forEach((block) => {
      this.createBlock(block);
    });
  }

  // create block in DOM
  private createBlock(block: Block, refNode?: HTMLElement): HTMLElement {
    const shouldBeDiv = ["img"];
    let el = document.createElement(shouldBeDiv.includes(block.type) ? "div" : block.type);
    el.classList.add(this._blockClassName);
    el.setAttribute("contentEditable", "true");
    // console.log(block);
    // block content
    switch (block.type) {
      case "p":
        el.classList.add(this._css_paragraph);
        el.innerText = block.data.text;
        break;

      case "ul":
        el.classList.add(this._css_unorderedlist);
        block.data.options.forEach((opt) => {
          const op = document.createElement("li");
          op.innerText = opt;
          el.appendChild(op);
        });
        break;

      case "img":
        el.contentEditable = 'false';
        el.classList.add(this._css_image);
        const im = document.createElement("div");
        im.style.backgroundImage = `url(${block.data.value})`;
        el.appendChild(im);
        break;

      default:
        el.classList.add(this._css_paragraph);
        el.innerText = block.data.text;
        break;
    }

    // this.addEventToBlock(el, block.type);
    if (refNode) {
      this.blockContainer.insertBefore(el, refNode.nextSibling);
    } else {
      this.blockContainer.appendChild(el);
    }

    // empty block
    if (block.type == "img") {
      let eb = document.createElement("div");
      eb.classList.add(this._blockClassName);
      eb.classList.add(this._css_paragraph);
      if (refNode) {
        this.blockContainer.insertBefore(eb, refNode.nextSibling);
      } else {
        this.blockContainer.appendChild(eb);
      }
    }
    return el;
  }

  private containerEvents() {
    this.blockContainer.addEventListener("DOMNodeInserted", (e) => {
      // console.log(e);
      // this.editorInsertBlockEvent;
    });

    // this.editorInsertBlockEvent();

    ["focus", "click", "keydown"].forEach((evKey) => {
      this.blockContainer.addEventListener(evKey, () => {
        this.getCurretnBlockFromCaretPosition();
      });
    });

    this.blockContainer.addEventListener("blur", () => {
      this.toolbar.hide();
    });
  }

  getCurretnBlockFromCaretPosition() {
    const selection = document.getSelection();
    let selectedItem;

    setTimeout(() => {
      if (selection) {
        selectedItem = selection.anchorNode?.nodeName;
        // const type = this.editorInsertBlockEvent(selection.anchorNode);
        // console.log(type);
        this.toolbar.show();
      }
    }, 50);
  }

  // editorInsertBlockEvent(el: Node) {
  //   let x = el?.parentElement;
  //   while(el?.nodeName != undefined){
  //     console.log(x);
  //     x = x?.parentElement;
  //   };
  // }

  private onEnterKeyPressed(e: KeyboardEvent, el: HTMLElement, blockType: string) {
    const selection = document.getSelection();

    let textNeedBreak = "";
    if (selection.type == "Caret") {
      textNeedBreak = el.innerText.substring(selection.focusOffset);
      el.innerText = el.innerText.substring(0, selection.focusOffset);
    }

    if (selection.type == "Range") {
      if (selection.focusOffset > selection.anchorOffset) {
        textNeedBreak = el.innerText.substring(selection.focusOffset);
        // clear selected range
        el.innerText = el.innerText.substring(0, selection.anchorOffset);
      } else {
        textNeedBreak = el.innerText.substring(selection.anchorOffset);
        // clear selected range
        el.innerText = el.innerText.substring(0, selection.focusOffset);
      }
    }

    this.createBlock(new Block("p", { text: textNeedBreak, value: "" }), el).focus();
    e.preventDefault();
  }

  private onBackSpaceKeyPressed(e: KeyboardEvent, el: HTMLElement, blockType: string) {
    const selection = document.getSelection();

    // this.createBlock(new Block("p", { text: textNeedBreak, value: "" }), el).focus();
    // e.preventDefault();
    let currentElementText = "";
    if (selection.anchorOffset === 0) {
      currentElementText = el.textContent ?? "";
      // el.previousElementSibling.innerHTML += " " + currentElementText;
      (el.previousElementSibling as HTMLElement).focus();
      document.execCommand("insertText", true, " " + currentElementText);
      el.remove();
      e.preventDefault();
    }
  }

  private onDeleteKeyPressed(e: KeyboardEvent, el: HTMLElement, blockType: string) {
    const selection = document.getSelection();

    let nextSiblingText = "";
    if (selection.anchorOffset === el.textContent.length) {
      nextSiblingText = el.nextSibling?.textContent ?? "";
      document.execCommand("insertText", true, " " + nextSiblingText);
      el.nextSibling?.remove();
      e.preventDefault();
    }

    // this.createBlock(new Block("p", { text: textNeedBreak, value: "" }), el).focus();
  }

  private getNextSiblingType(el: HTMLElement): string {
    let type = "paragraph";
    console.log(el.nodeType);
    return type;
  }
}
