import Editoro from ".";
import { Block } from "./block";
import { Toolbar } from "./toolbar";

export class BlockManager {
  private _blockClassName = "editoro-block";
  private _css_paragraph = "editoro-paragraph";
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
    let el = document.createElement(block.type);
    el.innerText = block.data.text;
    el.classList.add(this._blockClassName);
    el.setAttribute("contentEditable", "true");
    switch (block.type) {
      case "p":
        el.classList.add(this._css_paragraph);
        break;

      default:
        el.classList.add(this._css_paragraph);
        break;
    }
    this.addEventToBlock(el, block.type);
    if (refNode) {
      this.blockContainer.insertBefore(el, refNode.nextSibling);
    } else {
      this.blockContainer.appendChild(el);
    }
    return el;
  }

  private containerEvents() {
    this.blockContainer.addEventListener("focus", (e) => {
      // console.log(this.getFocusedNote(e));
      this.toolbar.show();
    });
    this.blockContainer.addEventListener("blur", () => {
      // el.classList.add("editoro-block-focus");
      this.toolbar.hide();
    });
    this.blockContainer.addEventListener("click", (e) => {
      let tg = <HTMLDivElement>e.target;
      let selectedBlock: HTMLElement;

      if (tg.classList.contains("editoro-block")) {
        selectedBlock = tg;
      } else {
        const selection = document.getSelection();
        selectedBlock = selection.getRangeAt(0).commonAncestorContainer.parentNode as HTMLElement;
      }
      
      console.log(selectedBlock);
    });
  }

  // add events to blocks
  private addEventToBlock(el: HTMLElement, blockType: string) {
    // on focus block
    el.addEventListener("focus", () => {
      el.classList.add("editoro-block-focus");
      this.toolbar.show();
    });

    // on blur focus
    el.addEventListener("blur", () => {
      el.classList.remove("editoro-block-focus");
      this.toolbar.hide();
    });

    // on block key down
    el.addEventListener("keydown", (e) => {
      // console.log(e);
      switch (e.code) {
        case "Enter":
          this.onEnterKeyPressed(e, el, blockType);
          break;

        case "Backspace":
          this.onBackSpaceKeyPressed(e, el, blockType);
          break;

        case "Delete":
          this.onDeleteKeyPressed(e, el, blockType);
          break;

        default:
          break;
      }
    });
  }

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
