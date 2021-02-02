// import './style/style.css';

export default class Editoro {
  public core;

  constructor(config?: EditoroConfig) {
    this.core = new Core(config);
  }

  onChange() {}
}

class Core {
  private _holder = "editoro";
  private _blockClassName = "editoro-block";
  private _topWhiteSpace = "32px";
  private _bottomWhiteSpace = "100px";

  constructor(config?: EditoroConfig) {
    this._holder = config?.holder ?? "editoro";

    // initial config
    document.execCommand("defaultParagraphSeparator", false, "p");

    const allEditors = document.getElementsByClassName(this._holder) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < allEditors.length; i++) {
      const editor = allEditors.item(i);

      // editor container style
      editor.style.paddingTop = this._topWhiteSpace;
      editor.style.paddingBottom = this._bottomWhiteSpace;

      // clear editor container
      editor.innerHTML = "";

      // set data if exists
      if (config?.data) {
        this.creteNewBlock(editor, config.data);
      }

      // interceptors
      this.interceptors(editor);

      // change event listiner
      this.onChnage(editor);

      editor.setAttribute("contentEditable", "true");
    }
  }

  creteNewBlock(editor: Element, data?: string | HTMLElement | object) {
    // type: string
    if (typeof data === "string") {
      editor.innerHTML = data;
    }

    // type: htmlElement
    if (data instanceof HTMLElement) {
      editor.appendChild(data);
    }

    // object
    if (typeof data === "object") {
      this.jsonToHTMLElement(data).forEach((el) => {
        el.addEventListener("focus", () => {
          console.log(typeof el);
          el.classList.add("editoro-block-focus");
        });
        editor.append(el);
      });
    }
  }

  interceptors(editor: Element) {
    // prevent paste any things
    editor.addEventListener("paste", function (e: any) {
      e.preventDefault();
      var text = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    });
  }

  onChnage(editor: Element) {
    // on change
    editor.addEventListener("input", (e) => {
      console.log(e.target);
    });
  }

  jsonToHTMLElement(data: any): Array<HTMLElement> {
    let elements: Array<HTMLElement> = [];

    (data?.blocks as any[]).forEach((block) => {
      if (block?.text) {
        switch (block?.type) {
          // paragraph
          case "paragraph":
            let p_el = document.createElement("div");
            p_el.className = this._blockClassName;
            p_el.innerText = block?.text;
            elements.push(p_el);
            break;

          // default create paragraph
          default:
            let d_el = document.createElement("div");
            d_el.className = this._blockClassName;
            d_el.innerText = block?.text;
            elements.push(p_el);
            break;
        }
      }
    });

    return elements;
  }
}

interface EditoroConfig {
  holder?: string;
  data?: string | HTMLElement | object;
}
