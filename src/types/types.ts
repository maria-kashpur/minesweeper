export type Coordinate = { x: number; y: number };

export type Field = { w: number; h: number };

export interface InitialData {
  level: "easy" | "middle" | "hard";
  bombs: number;
}

export type StatusGame = "game" | "looser" | "winner";

export interface Statictic {
  date: string;
  status: string;
  time: number;
  steps: number;
}