import { ElementID } from "../../data/constants";
import createEl from "../utils/create_element";

export default class Popap {
  static get conteiner() {
    const el = document.getElementById(ElementID.popapBox);
    if (!el) throw new Error("");
    return el;
  }

  static get closeBtns () {
    return [document.getElementById(ElementID.popapCloseBtn)];
  }

  static get contentBox() {
    const el = document.getElementById(ElementID.popapContentBox);
    if (!el) throw new Error("");
    return el;
  }

  static init() {
    this.addTemplate();
    this.closeBtns.forEach((btn) => {
      btn?.addEventListener("click", () => {
        this.close();
      });
    });
    this.conteiner?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }

  private static addTemplate() {
    const popap = createEl(document.body, "div", "popap");
    popap.id = ElementID.popapBox;
    popap.innerHTML = `
      <button class="popap__btn_close" id="${ElementID.popapCloseBtn}">
          <svg
            style="enable-background: new 0 0 24 24"
            version="1.1"
            viewBox="0 0 24 24"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="info" />
            <g id="icons">
              <path
                d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
                id="exit"
              />
            </g>
          </svg>
        </button>
        <div class="popap__content" id="${ElementID.popapContentBox}"></div>
    `;
  }

  static open(content: string) {
    document.body.classList.add("lock");
    this.conteiner?.classList.add("active");
    if (!this.contentBox) throw new Error("contentBox is not found");
    this.contentBox.innerHTML = content;
  }

  static close() {
    document.body.classList.remove("lock");
    this.conteiner?.classList.remove("active");
    if (!this.contentBox) throw new Error("contentBox is not found");
    this.contentBox.innerHTML = "";
  }
}
