import { AUDIO, ElementID } from "../../data/constants";
import Game from "../Game/Game";
import LocalStorageData from "../LocalStorageData/LocalStorageData";
import Popap from "../Popap/Popap";
import setSizeArea from "../utils/setSizeArea";
import { getStatisticTemplate } from "../templates/statisticTemplate";
import { GameStatisticModel } from "../Statistic/statistic";

export default class Options {
  static initChangeSettings(game: Game) {
    const form = document.getElementById(ElementID.optionsForm);
    const messageBox = document.getElementById(ElementID.optionMessage);
    const optionsSaveBtn = document.getElementById(ElementID.optionsSaveBtn);

    if (!optionsSaveBtn || !(optionsSaveBtn instanceof HTMLButtonElement))
      throw new Error(`#${ElementID.optionsSaveBtn} is not found`);
    if (!messageBox)
      throw new Error(`#${ElementID.optionMessage} is not found`);
    if (!form || !(form instanceof HTMLFormElement))
      throw new Error(`#${ElementID.optionsForm} is not found`);

    form.addEventListener("change", () => {
      if (!messageBox.classList.contains("active")) {
        messageBox.classList.add("active");
        optionsSaveBtn.disabled = false;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (messageBox.classList.contains("active")) {
        messageBox.classList.remove("active");
        optionsSaveBtn.disabled = true;
      }

      const formData = new FormData(form);
      const formDataObject: { [key: string]: string | number } = {};
      for (var pair of formData.entries()) {
        const [key, value] = pair;
        formDataObject[key] =
          typeof value === "string"
            ? value
            : parseInt(value as unknown as string, 10);
      }

      if ("level" in formDataObject && "bombs" in formDataObject) {
        game.setNewSettings(
          formDataObject.level as Game["level"],
          +formDataObject.bombs as Game["bombs"]
        );
        game.newGame();
      }
    });
  }

  static getNewGameBtn() {
    const btn = document.getElementById(ElementID.newGameBtn);
    if (!btn) throw new Error(`#${ElementID.newGameBtn} is not found`);
    return btn;
  }

  static initeSavingStatistic() {
    window.addEventListener("beforeunload", () => {
      LocalStorageData.statisticData("save", GameStatisticModel.get(10));
    });
  }

  private static initResetStistic() {
    const btn = document.getElementById(ElementID.staticReset);
    btn?.addEventListener("click", () => {
      GameStatisticModel.reset();
      Popap.close();
    });
  }

  static initOpenStatistic(btn: HTMLElement | null) {
    if (!btn) throw new Error("button is not found");
    btn.addEventListener("click", () => {
      Popap.open(getStatisticTemplate(10));
      this.initResetStistic();
    });
  }

  static initOpenSection(btn: HTMLElement | null, section: HTMLElement | null) {
    if (!btn) throw new Error("button is not found");
    if (!section) throw new Error("section is not found");
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      section.classList.toggle("active");
    });
  }

  static initDecreaseSizeAreaBtn(decreaseBtn: HTMLElement | null) {
    if (!decreaseBtn) throw new Error(`btn is not found`);
    decreaseBtn.addEventListener("click", () => {
      setSizeArea(false, document.querySelector(".minesweeper__area_wrap"));
    });
  }

  static initIncreaseSizeAreaBtn(increaseBtn: HTMLElement | null) {
    if (!increaseBtn) throw new Error(`btn is not found`);
    increaseBtn.addEventListener("click", () => {
      setSizeArea(true, document.querySelector(".minesweeper__area_wrap"));
    });
  }

  static initThemeSwitcher(btn: HTMLElement | null) {
    if (!btn) throw new Error(`btn is not found`);

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  static initMuttedSwitcher(btn: HTMLElement | null) {
    if (!btn) throw new Error(`btn is not found`);

    btn.addEventListener("click", () => {
      if (btn.classList.contains("off")) {
        btn.classList.remove("off");
        AUDIO.muttedOff();
      } else {
        btn.classList.add("off");
        AUDIO.muttedOn();
      }
    });
  }
}
