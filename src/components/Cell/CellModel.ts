import { Coordinate } from "../../types/types";
import calculateNeighboursCoordinates from "../utils/calculateNeighboursCoordinates";

export class CellModel {
  coordinate: Coordinate;
  neighbours: { angle: Coordinate[]; axis: Coordinate[] };
  value: "bomb" | number;
  isOpen: boolean;
  isMarker: boolean;

  constructor(coordinate: Coordinate, fieldSize: { w: number; h: number }) {
    this.coordinate = coordinate;
    this.value = 0;
    this.neighbours = calculateNeighboursCoordinates(fieldSize, coordinate);
    this.isOpen = false;
    this.isMarker = false;
  }
}
