export class Toolbar {
  private editor: HTMLDivElement;
  private toolbar_css = "editoro-toolbar";
  private toolbar_show_css = "show";
  private toolbar_hide_css = "hide";
  private toolbar: HTMLDivElement;

  private tools = [
    { type: "button", name: "file", tooltip: "file", command: "file", icon: "./drag.svg" },
    {
      type: "group",
      icon: "./icons/svg/027-font.svg",
      tools: [
        { type: "button", name: "p", tooltip: "paragraph", command: "p", icon: "./drag.svg" },
        { type: "button", name: "H1", tooltip: "heading 1", command: "h1", icon: "./drag.svg" },
        { type: "button", name: "H2", tooltip: "heading 2", command: "h2", icon: "./drag.svg" },
        { type: "button", name: "H3", tooltip: "heading 3", command: "h3", icon: "./drag.svg" },
        { type: "button", name: "H4", tooltip: "heading 4", command: "h4", icon: "./drag.svg" },
        { type: "button", name: "H5", tooltip: "heading 5", command: "h5", icon: "./drag.svg" },
        { type: "button", name: "H6", tooltip: "heading 6", command: "h6", icon: "./drag.svg" },
        { type: "button", name: "pre", tooltip: "pre", command: "pre", icon: "./drag.svg" },
      ],
    },
    { type: "button", name: "img", tooltip: "img", command: "file", icon: "./drag.svg" },
  ];

  constructor(editor: HTMLDivElement) {
    this.editor = editor;

    this.init();
    this.initTools();
  }

  private init() {
    // create container
    let toolbar = document.createElement("div");
    toolbar.classList.add(this.toolbar_css);
    toolbar.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
    // this.toolbar.classList.add(this.toolbar_hide_css);
    this.editor.appendChild(toolbar);
    this.toolbar = toolbar;
    // console.log()
  }

  initTools() {
    console.log(this.tools);
    this.tools.forEach((tool) => {
      if (tool.type == "button") {
        let el = document.createElement("button");
        el.classList.add("editoro-toolbar-item");
        el.innerHTML = `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>`;
        this.toolbar.appendChild(el);
      } else {
        let el = document.createElement("button");
        el.classList.add("editoro-toolbar-item");
        el.innerHTML = `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>`;
        this.toolbar.appendChild(el);
        // submenu
        let sub = document.createElement("div");
        sub.classList.add("editoro-toolbar-sub");
        tool.tools.forEach((tool) => {
          let el = document.createElement("button");
          el.classList.add("editoro-toolbar-item");
          el.innerHTML = `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>`;
          sub.appendChild(el);
        });
        sub.style.display = "none";
        el.addEventListener("click", (ev) => {
          if (sub.style.display == "none") {
            sub.style.display = "block";
          } else {
            sub.style.display = "none";
          }
        });
        this.toolbar.appendChild(sub);
      }
    });
    // h1.addEventListener("click", () => {
    //   document.execCommand("formatBlock", false, "h1");
    //   console.log("h1 clicked");
    // });
  }

  /**
   * Toggle toolbar display
   */
  public show() {
    this.toolbar.classList.remove(this.toolbar_hide_css);
    this.toolbar.classList.add(this.toolbar_show_css);
  }

  public hide() {
    this.toolbar.classList.remove(this.toolbar_show_css);
    this.toolbar.classList.add(this.toolbar_hide_css);
  }

  /**
   * Executed command from editor header buttons exclude toggleEditorMode
   * @param command string from triggerCommand
   */
  executeCommand(command: string) {
    const commands = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre"];
    if (commands.includes(command)) {
      document.execCommand("formatBlock", false, command);
      return;
    }
    document.execCommand(command, false, null);
  }
}
