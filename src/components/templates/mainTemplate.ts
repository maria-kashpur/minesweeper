import { BOMB, ElementID, LEVELS } from "../../data/constants";
import LocalStorageData from "../LocalStorageData/LocalStorageData";

const LevelsName = {
  easy: "Легкий (10х10)",
  middle: "Средний (15х15)",
  hard: "Сложный (20х20)",
};

export function getStartTemplate (): string {
  const level = LocalStorageData.level('get')
  const bombs = LocalStorageData.bombs('get')

  const template = `
    <header class="conteiner">
      <div class="header">
        <div class="logo">
          <img src="./icons/44633_bomb_icon.png" alt="logo" height="40">
          <h1>minesweeper</h1>
          <img src="./icons/45325_bomb_icon.png" alt="logo" height="40">
        </div>
        <div class="header_btns">
          <button id="${ElementID.newGameBtn}" type="button">Новая игра</button>
          <button id="${ElementID.optionsBtn}" type="button">Параметры</button>
          <button id="${
            ElementID.statisticsBtn
          }" type="button">Статистика</button>
          <button id="${ElementID.infoBtn}" type="button">Об игре</button>
          <button id="${
            ElementID.colorBtn
          }" type="button" class="setting__color"></button>
          <div>
            <button id="${
              ElementID.loupeMinBtn
            }" type="button" class="setting__loupe_minus"></button>
            <button id="${
              ElementID.loupePlusBtn
            }" type="button" class="setting__loupe_plus"></button>
          </div>
          <button id="${
            ElementID.soundBtn
          }" type="button" class="setting__sound"></button>
        </div>
      </div>
    </header>
    <main class="conteiner">
      <section class="options" id="${ElementID.optionsBox}">
        <h2>Параметры:</h2>
        <form class="options__form" id="${ElementID.optionsForm}">
          <div class="options_lavel">
            <h3 class="options__title">Уровень:</h3>
            <div class="level">
              ${Object.keys(LEVELS)
                .map((value) => {
                  const text =
                    value === "easy"
                      ? LevelsName.easy
                      : value === "middle"
                      ? LevelsName.middle
                      : value === "hard"
                      ? LevelsName.hard
                      : "";
                  if (text === "") throw new Error("invalid text");
                  const radioBtn = `<label class="level_item"><input type="radio" name="level" value="${value}" ${
                    value === level ? "checked" : ""
                  }><span>${text}</span></label>`;
                  return radioBtn;
                })
                .join(" ")}
            </div>
          </div>
          <div class="options_bombs">
            <label for="bombs">
              <h3 class="options__title">Количество бомб (от 10 до 99):</h3>
              <input class="bombs_value" name="bombs" type="number" value="${bombs}" min="${
    BOMB.min
  }" max="${BOMB.max}">
            </label>
          </div>
          <button id="${
            ElementID.optionsSaveBtn
          }" class="options_save" type="submit" disabled>Сохранить настройки</button>
          <p class="options_message" id="${
            ElementID.optionMessage
          }">Сохраните настройки, чтобы начать игру</p>
        </form>
        
      </section>
      <section class="info" id="${ElementID.infoBox}">
        <h2>Об игре:</h2>
        <p>Minesweeper — это логическая игра на поле, на котором спрятаны мины. 
        <p>Цель игры: открыть все ячейки поля, не попадая на мины. </p>
        <p>Игровое поле представляет собой сетку квадратных ячеек. Каждая ячейка может быть либо закрытой, либо открытой. 
          Каждая открытая ячейка, кроме тех, где находится мина, содержит число от 0 до 8.
          Это число указывает на количество мин, расположенных в соседних ячейках (верхней, нижней, левой, правой и диагональной).
        </p>
        <p>Игрок может открыть ячейку, щелкнув по ней левой кнопкой мыши.
          Если в открытой ячейке нет мины, открывается число или пустая область.
          Если в открытой ячейке число 0, открываются все соседние ячейки, до тех пор, пока не будет обнаружена граница с числами.</p>
        <p>Игрок может поставить метку на ячейку, где, по его мнению, есть мина, щелкнув по ней правой кнопкой мыши. 
          Это позволяет игроку помечать мины и избегать их.</p>
        <p>Игра выиграна, когда открыты все ячейки, в которых нет мин. Игра проиграна, если игрок открывает ячейку с миной.</p>
      </section>

      <section class="minesweeper">

        <div class="minesweeper__setting setting">
          <button
            id="${ElementID.markerBtn}"
            name="flag"
            type="button"
            class="setting__flag setting__item"></button>
          <div class="setting__steps setting__item-aditional">Ходов: <span id="${
            ElementID.stepsBox
          }">0</span>
          <div class="setting__cells_left setting__item-aditional">
            Осталось открыть ячеек: <span id="${
              ElementID.cellsLeftBox
            }">0</span>
          </div>
        </div>
        
        </div>
        <div class="minesweeper__area_wrap">
          <div class="minesweeper__status status">
            <div class="status__flags" id="${ElementID.markerLeftBox}">0</div>
            <button type="button" id="${ElementID.smileBox}" class="status__smile status__smile-happy"></button>
            <div id="${ElementID.time}" class="status__timer">0</div>
          </div>
          <ul class="minesweeper__area" id="${ElementID.fieldBox}"></ul>
        </div>
      </section>
    </main>
    <footer class="conteiner">
      <div class="footer">
        <div><a href="https://www.iconfinder.com/" target="_blank">Thanks for icons iconfinder.com</a></div>
        <div class="github"><a href="https://github.com/maria-kashpur" target="_blank"><img src="./svg/211904_social_github_icon.svg" alt="github" height="30">maria-kashpur</a></div>
        <div><a href="https://rs.school/index.html" target="_blank"><img src="./svg/rs_school_js.svg" alt="RS" height="30"></a></div>
      </div>
    </footer>
  `;

  return template;
}