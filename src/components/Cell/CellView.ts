import { CellsClass } from "../../data/constants";
import { Coordinate } from "../../types/types";
import createEl from "../utils/create_element";

export class CellView {
  box: HTMLElement;
  coordinate: Coordinate;

  constructor(coordinate: Coordinate, parent: HTMLElement) {
    const el = createEl(parent, "li", "minesweeper__cell", CellsClass.closed);
    this.box = el;
    this.coordinate = coordinate;
    this.box.setAttribute("coordirate", JSON.stringify(coordinate));
  }

  open(type: "bomb" | "mined" | number) {
    this.controlMarker("delete");

    if (this.box.classList.contains(CellsClass.closed)) {
      this.box.classList.remove(CellsClass.closed);
    }
    this.box.classList.add(CellsClass.opened);

    const className = this.getClassForCells(type);
    if (className !== "") this.box.classList.add(className);
    if (typeof type === "number" && type > 0) {
      this.box.textContent = `${type}`;
    }
  }

  controlMarker(type: "add" | "delete" | "toggle") {
    switch (type) {
      case "add":
        if (!this.box.classList.contains(CellsClass.marked))
          this.box.classList.add(CellsClass.marked);
        break;
      case "delete":
        if (this.box.classList.contains(CellsClass.marked)) {
          this.box.classList.remove(CellsClass.marked);
        }
        break;
      case "toggle":
        if (this.box.classList.contains(CellsClass.marked)) {
          this.box.classList.remove(CellsClass.marked);
        } else {
          this.box.classList.add(CellsClass.marked);
        }
        break;
      default:
        break;
    }
  }

  private getClassForCells(type: "bomb" | "mined" | number) {
    switch (type) {
      case "bomb":
        return CellsClass.boom;
      case "mined":
        return CellsClass.mined;
      case 0:
        return "";
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return `${CellsClass.numbered}_${type}`;
      default:
        throw new Error("invalid type");
    }
  }
}
