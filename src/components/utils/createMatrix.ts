import { Field } from "../../types/types";

export default function createMatrix(fieldSize: Field) {
  return Array.from({ length: fieldSize.h }, () =>
    Array.from({ length: fieldSize.w })
  );
}



