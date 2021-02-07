export class Block {
  public type: string;
  public data: {
    text?: string;
    value?: string;
    options?: string[];
  };

  constructor(
    type: string,
    data: {
      text?: string;
      value?: string;
      options?: string[];
    }
  ) {
    this.type = type;
    this.data = data;
  }

  public static anchorNode(): Node | null {
    const selection = window.getSelection();
    return selection ? selection.anchorNode : null;
  }

  onSelectionChnage(editor: HTMLElement) {
    if ("onselectionchange" in editor) {
      console.log(editor.onselectionchange);
    } else {
      console.log("not selected");
    }
  }
}
