export class Toolbar {
  private editor: HTMLDivElement;
  private toolbar_css = 'editoro-toolbar';
  private toolbar_show_css = 'show';
  private toolbar_hide_css = 'hide';
  private toolbar: HTMLDivElement;

  private tools = [
    { type: 'button', name: 'bold', tooltip: 'bold', command: 'bold', icon: './icons/svg/004-bold.svg' },
    { type: 'button', name: 'italic', tooltip: 'italic', command: 'italic', icon: './icons/svg/031-italic.svg' },
    {
      type: 'group',
      name: 'heading',
      icon: './icons/svg/027-font.svg',
      tools: [
        { type: 'button', name: 'p', tooltip: 'paragraph', command: 'p', icon: './icons/svg/043-paragraph.svg' },
        { type: 'button', name: 'H1', tooltip: 'heading 1', command: 'h1', icon: undefined },
        { type: 'button', name: 'H2', tooltip: 'heading 2', command: 'h2', icon: undefined },
        { type: 'button', name: 'H3', tooltip: 'heading 3', command: 'h3', icon: undefined },
        { type: 'button', name: 'H4', tooltip: 'heading 4', command: 'h4', icon: undefined },
        { type: 'button', name: 'H5', tooltip: 'heading 5', command: 'h5', icon: undefined },
        { type: 'button', name: 'H6', tooltip: 'heading 6', command: 'h6', icon: undefined },
        { type: 'button', name: 'pre', tooltip: 'pre', command: 'pre', icon: './icons/svg/009-code.svg' },
      ],
    },
    { type: 'button', name: 'img', tooltip: 'img', command: 'file', icon: './icons/svg/007-calendar.svg' },
    { type: 'button', name: 'file', tooltip: 'file', command: 'file', icon: './icons/svg/042-paperclip.svg' },
  ];

  constructor(editor: HTMLDivElement) {
    this.editor = editor;

    this.init();
    this.initTools();
  }

  private init() {
    // create container
    let toolbar = document.createElement('div');
    toolbar.classList.add(this.toolbar_css);
    toolbar.addEventListener('mousedown', (e) => {
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
      if (tool.type == 'button') {
        let el = document.createElement('button');
        el.classList.add('editoro-toolbar-item');
        el.innerHTML = tool.icon ? `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>` : tool.name;
        el.addEventListener('click', () => {
          this.runCommand(tool.command);
        });
        this.toolbar.appendChild(el);
      } else {
        let el = document.createElement('button');
        el.classList.add('editoro-toolbar-item');
        el.innerHTML = tool.icon ? `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>` : tool.name;
        this.toolbar.appendChild(el);
        // submenu
        let sub = document.createElement('div');
        sub.classList.add('editoro-toolbar-sub');
        tool.tools.forEach((tool) => {
          let el = document.createElement('button');
          el.classList.add('editoro-toolbar-item');
          el.innerHTML = tool.icon ? `<img class='editoro-toolbar-item-icon' src='${tool.icon}'/>` : tool.name;
          el.addEventListener('click', () => {
            this.runCommand(tool.command);
          });
          sub.appendChild(el);
        });
        sub.style.display = 'none';
        el.addEventListener('click', (ev) => {
          if (sub.style.display == 'none') {
            sub.style.display = 'block';
          } else {
            sub.style.display = 'none';
          }
        });
        this.toolbar.appendChild(sub);
      }
    });
  }

  runCommand(cmd: string) {
    const sel = document.getSelection();

    if (sel.type == 'Caret') {
      this.executeBlockCommand(cmd);
    } else {
      this.executeCommand(cmd);
    }
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
    console.log('range', command);
    const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
    if (commands.includes(command)) {
      document.execCommand('formatBlock', false, command);
      return;
    }
    document.execCommand(command, false, null);
  }

  /**
   * Executed command from editor header buttons exclude toggleEditorMode
   * @param command string from triggerCommand
   */
  executeBlockCommand(command: string) {
    console.log('block', command);
  }
}
