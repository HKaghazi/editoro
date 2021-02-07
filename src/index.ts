import { Block } from './block';
import { BlockManager } from './blockManager';
import { BlockUtility } from './blockUtility';
import { Toolbar } from './toolbar';
// Default SortableJS
import Sortable from 'sortablejs';

export default class Editoro {
  public core;

  constructor(config?: EditoroConfig) {
    this.core = new Core(config);
  }

  onChange() {}
}

class Core {
  private _holder = 'editoro';
  private _topWhiteSpace = '0px';
  private _bottomWhiteSpace = '100px';
  private _editMode = true;
  private _css_container = 'editoro-container';

  constructor(config?: EditoroConfig) {
    this._holder = config?.holder ?? 'editoro';

    // initial config
    document.execCommand('defaultParagraphSeparator', false, 'p');

    const allEditors = document.getElementsByClassName(this._holder) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < allEditors.length; i++) {
      const editor = allEditors.item(i) as HTMLDivElement;
      editor.innerHTML = '';
      const blockContainer = document.createElement('div');
      blockContainer.innerText = 'Hello world';
      blockContainer.classList.add(this._css_container);
      blockContainer.style.paddingTop = this._topWhiteSpace;
      blockContainer.style.paddingBottom = this._bottomWhiteSpace;
      blockContainer.contentEditable = 'true';
      editor.appendChild(blockContainer);

      // toolbar
      const toolbar = new Toolbar(editor);

      // block manager
      const blockMgr = new BlockManager(editor, blockContainer, toolbar);

      // set data if exists
      if (config?.data) {
        const blocks = BlockUtility.jsonToHTMLElement(config?.data);
        blockContainer.innerHTML = '';
        blockMgr.insertBlocks(blocks);
      }

      // List with handle
      Sortable.create(blockContainer, {
        handle: '.editoro-block',
        animation: 150,
      });

      // interceptors
      // this.interceptors(editor);

      // change event listiner
      // this.onChnage(editor);
      // editor.setAttribute("contentEditable", "true");
    }
  }

  // interceptors(editor: HTMLElement) {
  //   // prevent paste any things
  //   editor.addEventListener("paste", function (e: any) {
  //     e.preventDefault();
  //     var text = (e.originalEvent || e).clipboardData.getData("text/plain");
  //     document.execCommand("insertHTML", false, text);
  //   });
  // }

  // onChnage(editor: HTMLElement) {
  //   // on change
  //   editor.addEventListener("input", (e) => {
  //     // console.log(e.target);
  //   });
  // }
}

interface EditoroConfig {
  holder?: string;
  data?: string | HTMLElement | object;
}
