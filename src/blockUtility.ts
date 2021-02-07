import { Block } from "./block";

export class BlockUtility {
  private editor: HTMLDivElement;

  constructor(editor: HTMLDivElement) {
    this.editor = editor;
  }

  public static jsonToHTMLElement(data: any): Array<Block> {
    let elements: Array<Block> = [];

    (data?.blocks as any[]).forEach((block) => {
      switch (block?.type) {
        // paragraph
        case "paragraph":
          elements.push(new Block("p", { text: block?.text }));
          break;

        // unordered list
        case "list":
          elements.push(new Block("ul", { text: block?.text, options: block?.options }));
          break;

        // image
        case "image":
          elements.push(new Block("img", { text: block?.text, value: block?.value }));
          break;

        // default create paragraph
        default:
          elements.push(new Block("p", { text: block?.text }));
          break;
      }
    });

    return elements;
  }
}
