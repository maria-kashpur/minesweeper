import { ElementID, SmileClass } from "../../data/constants";
import { Coordinate } from "../../types/types";
import { CellModel } from "../Cell/CellModel";
import { CellView } from "../Cell/CellView";
import { MineswipperData } from "./GameModel";

export default class GameView {
  markerBox: HTMLElement | null;
  smileBox: HTMLElement | null;
  timeBox: HTMLElement | null;
  stepsBox: HTMLElement | null;
  cellOpenLeftBox: HTMLElement | null;
  fieldBox: HTMLElement | null;
  isMarkerMode: boolean;
  field: CellView[][];
  markerBtn: HTMLElement | null;

  constructor(data: CellModel[][], width: number) {
    this.isMarkerMode = false;
    this.markerBtn = document.getElementById(ElementID.markerBtn);
    this.markerBox = document.getElementById(ElementID.markerLeftBox);
    this.smileBox = document.getElementById(ElementID.smileBox);
    this.timeBox = document.getElementById(ElementID.time);
    this.stepsBox = document.getElementById(ElementID.stepsBox);
    this.cellOpenLeftBox = document.getElementById(ElementID.cellsLeftBox);
    this.fieldBox = document.getElementById(ElementID.fieldBox);

    this.field = [];
    this.createNewField(data, width);
    this.initClickMarker();
  }

  getCell(coordinate: Coordinate) {
    return this.field[coordinate.y][coordinate.x];
  }

  private updateMarkerBox(value: number) {
    if (!this.markerBox)
      throw new Error(`#${ElementID.markerLeftBox} is not found`);
    this.markerBox.textContent = `${value}`;
  }

  private updateSmileBox(type: "game" | "looser" | "winner") {
    if (!this.smileBox) throw new Error(`#${ElementID.smileBox} is not found`);
    this.smileBox.className = "status__smile";
    switch (type) {
      case "game":
        this.smileBox.classList.add(SmileClass.happy);
        break;
      case "looser":
        this.smileBox.classList.add(SmileClass.looser);
        break;
      case "winner":
        this.smileBox.classList.add(SmileClass.winner);
        break;
      default:
        break;
    }
  }

  updateTimeBox(value: number) {
    if (!this.timeBox) throw new Error(`#${ElementID.time} is not found`);
    const currentValue = this.timeBox.textContent;

    if (currentValue !== `${value}`) {
      this.timeBox.textContent = `${value}`;
    }
  }

  private updateStepsBox(value: number) {
    if (!this.stepsBox) throw new Error(`#${ElementID.stepsBox} is not found`);
    const currentValue = this.stepsBox.textContent;
    if (currentValue !== `${value}`) {
      this.stepsBox.textContent = `${value}`;
    }
  }

  private updateCellOpenLeftBox(value: number) {
    if (!this.cellOpenLeftBox)
      throw new Error(`#${ElementID.cellsLeftBox} is not found`);

    const currentValue = this.cellOpenLeftBox.textContent;
    if (currentValue !== `${value}`) {
      this.cellOpenLeftBox.textContent = `${value}`;
    }
  }

  private toggleMarkerMode() {
    this.isMarkerMode = !this.isMarkerMode;
  }

  createNewField(data: CellModel[][], width: number) {
    if (!this.fieldBox) throw new Error(`#${ElementID.fieldBox} is not found`);

    if (this.getFieldBox().classList.contains("unactive")) {
      this.getFieldBox().classList.remove("unactive");
    }

    this.fieldBox.innerHTML = "";

    if (!data || data.length === 0) throw new Error("data is not found");

    this.field = data.map((row) => {
      return row.map((cell) => {
        if (!this.fieldBox)
          throw new Error(`#${ElementID.fieldBox} is not found`);
        const el = new CellView(cell.coordinate, this.fieldBox);
        return el;
      });
    });

    this.fieldBox.style.setProperty("--numCell", `${width}`);
  }

  getFieldBox() {
    if (!this.fieldBox) throw new Error(`#${ElementID.fieldBox} is not found`);
    return this.fieldBox;
  }

  initClickMarker() {
    if (!this.markerBtn)
      throw new Error(`#${ElementID.markerBtn} is not found`);
    this.markerBtn.addEventListener("click", () => {
      this.markerBtn?.classList.toggle("active");
      this.toggleMarkerMode();
    });
  }

  showCellsWithBomb(type: "mined" | "bomb", coordinates: Coordinate[]) {
    coordinates.forEach((coordinate) => {
      const cell = this.getCell(coordinate);
      cell.open(type);
    });
  }

  updateCells(data: CellModel[][]) {
    data.forEach((row) => {
      row.forEach((cellData) => {
        const cell = this.getCell(cellData.coordinate);
        if (cellData.isMarker) {
          cell.controlMarker("add");
        } else {
          cell.controlMarker("delete");
        }
        if (cellData.isOpen) {
          cell.open(cellData.value);
        }
      });
    });
  }

  updateData(gameData: MineswipperData) {
    if (gameData.data.isFinish) {
      this.showCellsWithBomb(
        gameData.data.status === "winner" ? "mined" : "bomb",
        gameData.data.bombCoordinates
      );
      this.getFieldBox().classList.add("unactive");
    }

    this.updateSmileBox(gameData.data.status);
    this.updateMarkerBox(gameData.data.markers);
    this.updateStepsBox(gameData.data.steps);
    this.updateCellOpenLeftBox(gameData.data.cellLeftOpen);
    this.updateCells(gameData.field);
  }
}
