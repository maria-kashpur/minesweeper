import { Coordinate, Field } from "../../types/types";

  export default function calculateNeighboursCoordinates(fieldSize: { w: number; h: number }, target: Coordinate) {
    const currentX = target.x;
    const currentY = target.y;

    const angle = [
      { x: currentX - 1, y: currentY - 1 }, // topLeft
      { x: currentX - 1, y: currentY + 1 }, // bottomLeft
      { x: currentX + 1, y: currentY - 1 }, // topRight
      { x: currentX + 1, y: currentY + 1 }, // bottomRight
    ];

    const axis = [
      { x: currentX - 1, y: currentY }, // left
      { x: currentX + 1, y: currentY }, // right
      { x: currentX, y: currentY - 1 }, // top
      { x: currentX, y: currentY + 1 }, // bottom
    ];

    return {
      angle: getValidCoordinates(angle, fieldSize),
      axis: getValidCoordinates(axis, fieldSize),
    };
  }

  function getValidCoordinates(coordinates: Coordinate[], fieldSize: Field) {
    return coordinates.filter(
      (el) => el.x >= 0 && el.y >= 0 && el.x < fieldSize.w && el.y < fieldSize.h
    );
  }