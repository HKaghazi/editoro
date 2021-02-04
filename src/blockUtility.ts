import { Block } from "./block";

export class BlockUtility {
  private editor: HTMLDivElement;

  constructor(editor: HTMLDivElement) {
    this.editor = editor;
  }

  public static jsonToHTMLElement(data: any): Array<Block> {
    let elements: Array<Block> = [];

    (data?.blocks as any[]).forEach((block) => {
      if (block?.text) {
        switch (block?.type) {
          // paragraph
          case "paragraph":
            elements.push(new Block("p", { text: block?.text, value: "" }));
            break;

          // default create paragraph
          default:
            elements.push(new Block("p", { text: block?.text, value: "" }));
            break;
        }
      }
    });

    return elements;
  }
  
}
