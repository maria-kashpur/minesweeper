import { Coordinate, Field } from "../../types/types";
import getRandomNum from "./getRandomNum";

export default function generateRandomCoordinate(fieldSize: Field, exclude: Coordinate[]): Coordinate {
   const coordinate = {
     x: getRandomNum(0, fieldSize.w - 1),
     y: getRandomNum(0, fieldSize.h - 1),
   };
   const invalidCoondinates = exclude.filter(
     (el) => el.x === coordinate.x && el.y === coordinate.y
   );
   if (invalidCoondinates.length !== 0) {
     return generateRandomCoordinate(fieldSize, exclude);
   }
   return coordinate;
}
