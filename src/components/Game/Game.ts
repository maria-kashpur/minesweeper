import { LEVELS } from "../../data/constants";
import { Coordinate, InitialData } from "../../types/types";
import LocalStorageData from "../LocalStorageData/LocalStorageData";
import Popap from "../Popap/Popap";
import { GameStatisticModel } from "../Statistic/statistic";
import { messageLoserTemplate } from "../templates/messageLoser";
import getMessegeWinnerTemplate from "../templates/messegeWinner";
import GameModel, { MineswipperData } from "./GameModel";
import GameView from "./GameView";

export default class Game {
  model: GameModel;
  private level: "easy" | "middle" | "hard";
  private bombs: number;
  view: GameView;

  constructor() {
    this.level = LocalStorageData.level("get") as InitialData["level"];
    this.bombs = LocalStorageData.bombs("get") as InitialData["bombs"];
    this.model = new GameModel(
      this.level,
      this.bombs,
      LocalStorageData.gameData("get")
    );
    this.view = new GameView(this.model.field, this.model.fieldSize.w);
    this.view.updateData(this.model.getGameData());
    this.initClickCell();
    this.initNewGameClick(this.view.smileBox);
    setInterval(() => this.view.updateTimeBox(this.model.data.time), 1000);
  }

  initSaveData() {
    window.addEventListener("beforeunload", () => {
      LocalStorageData.level("save", this.level);
      LocalStorageData.bombs("save", this.bombs);
    });
  }

  initNewGameClick(btn: HTMLElement | null) {
    btn?.addEventListener("click", () => this.newGame());
  }

  setNewSettings(level: Game["level"], bombs: Game["bombs"]) {
    this.level = level;
    this.bombs = bombs;
  }

  newGame() {
    LocalStorageData.gameData("delete");
    this.model = new GameModel(this.level, this.bombs);
    this.view.createNewField(this.model.field, LEVELS[this.level].w);
    this.view.updateData(this.model.getGameData());
  }

  doStep(coordinate: Coordinate) {
    if (this.model.data.steps === 0) {
      this.model.start(coordinate);
    }
    this.model.checkCell(coordinate);
    this.view.updateData(this.model.getGameData());

    if (this.model.data.isFinish) {
      this.showMessegeAfterFinish(this.model.getGameData());
    }
  }

  showMessegeAfterFinish(gameData: MineswipperData) {
    if (gameData.data.status === "winner") {
      const content = getMessegeWinnerTemplate(
        gameData.data.time,
        gameData.data.steps
      );
      setTimeout(() => Popap.open(content), 1000);
    } else if (gameData.data.status === "looser") {
      const content = messageLoserTemplate;
      setTimeout(() => Popap.open(content), 1000);
    }
    this.addStatistic(gameData);
  }

  addStatistic(gameData: MineswipperData) {
    const { status, time, steps } = gameData.data;
    GameStatisticModel.add({ status, time, steps });
  }

  markCell(coordinate: Coordinate) {
    const isAction = this.model.markCell(coordinate);
    if (!isAction) return;
    this.view.updateData(this.model.getGameData());
  }

  initClickCell() {
    const fieldBox = this.view.getFieldBox();
    fieldBox.addEventListener("click", (e) => {
      if (!e.target || !(e.target instanceof HTMLElement)) return;

      let coordinateAttr = e.target.getAttribute("coordirate");
      if (!coordinateAttr) return;
      const coordinate = JSON.parse(coordinateAttr) as Coordinate;
      if (this.view.isMarkerMode) {
        this.markCell(coordinate);
      } else {
        this.doStep(coordinate);
      }
    });

    fieldBox.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (!e.target || !(e.target instanceof HTMLElement)) return;
      let coordinateAttr = e.target.getAttribute("coordirate");
      if (!coordinateAttr) return;
      const coordinate = JSON.parse(coordinateAttr) as Coordinate;
      this.markCell(coordinate);
    });
  }
}
