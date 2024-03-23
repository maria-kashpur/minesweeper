import { AUDIO, LEVELS } from "../../data/constants";
import { Coordinate, Field, InitialData } from "../../types/types";
import LocalStorageData from "../LocalStorageData/LocalStorageData";
import createMatrix from "../utils/createMatrix";
import generateRandomCoordinate from "../utils/generateRandomCoordinates";
import { CellModel } from "../Cell/CellModel";

export type MineswipperData = {
  field: GameModel["field"];
  data: GameModel["data"];
};

interface GameData {
  steps: number;
  cellLeftOpen: number;
  time: number;
  markers: number;
  isFinish: boolean;
  status: "game" | "winner" | "looser";
  bombCoordinates: Coordinate[];
}

export default class GameModel {
  fieldSize: Field;
  bombs: number;
  field: CellModel[][];
  data: GameData;

  constructor(
    level: InitialData["level"],
    bombs: InitialData["bombs"],
    saveProperty?: MineswipperData
  ) {
    this.fieldSize = LEVELS[level];
    this.bombs = bombs;

    this.field = createMatrix(this.fieldSize).map((row, y) => {
      return row.map((_el, x) => {
        const cell = new CellModel({ x, y }, this.fieldSize);
        return cell;
      });
    });

    this.data = {
      steps: 0,
      cellLeftOpen: LEVELS[level].h * LEVELS[level].w - bombs,
      time: 0,
      markers: bombs,
      isFinish: false,
      status: "game",
      bombCoordinates: [],
    };

    if (saveProperty && "field" in saveProperty && "data" in saveProperty) {
      this.field = saveProperty.field;
      this.data = saveProperty.data;
      setInterval(() => this.increaseTime(), 1000);
    }

    this.initSaveGame();
  }

  private initSaveGame() {
    window.addEventListener("beforeunload", () =>
      LocalStorageData.gameData("save", { field: this.field, data: this.data })
    );
  }

  start(startIndex: Coordinate) {
    // generate bombs
    while (this.data.bombCoordinates.length < this.bombs) {
      const bombCoordinate = generateRandomCoordinate(this.fieldSize, [
        startIndex,
        ...this.data.bombCoordinates,
      ]);

      this.data.bombCoordinates.push(bombCoordinate);
    }

    //add bombs on the field
    this.data.bombCoordinates.forEach((bombCoordinate) => {
      const cell = this.field[bombCoordinate.y][bombCoordinate.x];
      cell.value = "bomb";
    });

    //add numbers on the field
    this.field.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value !== "bomb") {
          const { neighbours } = cell;
          const bombsNearby = [...neighbours.axis, ...neighbours.angle]
            .map((pos) => this.field[pos.y][pos.x].value)
            .filter((cell) => cell === "bomb").length;
          cell.value = bombsNearby;
        }
      });
    });

    // init timer
    setInterval(() => this.increaseTime(), 1000);
  }

  private getCell(coordinate: Coordinate) {
    return this.field[coordinate.y][coordinate.x];
  }

  private decreaseCellLeftOpen() {
    if (this.data.cellLeftOpen !== 0) {
      this.data.cellLeftOpen -= 1;
    }
  }

  private increaseStep() {
    if (!this.data.isFinish) {
      this.data.steps += 1;
      AUDIO.step.play();
    }
    return this.data.steps;
  }

  private increaseTime() {
    if (this.data.isFinish === false) {
      this.data.time += 1;
    }
  }

  markCell(coordinate: Coordinate): boolean {
    const cell = this.getCell(coordinate);
    if (cell.isMarker === true) {
      this.data.markers += 1;
      cell.isMarker = false;
      return true;
    } else if (cell.isMarker === false && this.data.markers > 0) {
      this.data.markers -= 1;
      cell.isMarker = true;
      return true;
    }
    return false;
  }

  private finish(type: "win" | "looser" | "check"): void {
    switch (type) {
      case "win":
        this.data.isFinish = true;
        this.data.status = "winner";
        AUDIO.win.play();
        break;
      case "looser":
        this.data.isFinish = true;
        this.data.status = "looser";
        AUDIO.bomp.play();
        break;
      case "check":
        if (this.data.cellLeftOpen === 0) {
          this.finish("win");
        }
        break;
      default:
        throw new Error("invalid type");
    }
  }

  getGameData(): MineswipperData {
    return {
      data: this.data,
      field: this.field,
    };
  }

  checkCell(coordinate: Coordinate) {
    const cell = this.getCell(coordinate);
    const { value } = cell;

    cell.isOpen = true;

    this.increaseStep();
    this.decreaseCellLeftOpen();

    if (value === "bomb") {
      this.finish("looser");
    } else {
      if (value === 0) this.openNeighbors(cell.neighbours.axis);
      this.finish("check");
    }

    return this.getGameData();
  }

  private openNeighbors(coordinates: Coordinate[]) {
    coordinates.forEach((coordinate) => {
      const cell = this.getCell(coordinate);
      if (cell.isOpen) return;
      const { value } = cell;
      if (value !== "bomb") {
        this.decreaseCellLeftOpen();
        cell.isOpen = true;
      }
      if (value === 0 && cell.isOpen === true)
        this.openNeighbors(cell.neighbours.axis);
    });
  }
}
