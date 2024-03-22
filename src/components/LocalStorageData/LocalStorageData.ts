import { initialData } from "../../data/constants";
import { InitialData, Statictic } from "../../types/types";
import { MineswipperData } from "../Game/GameModel";

export default class LocalStorageData {
  static bombs(type: "get" | "save", value?: InitialData["bombs"]) {
    const lsKey = "bombs";

    switch (type) {
      case "get":
        const bombs = localStorage.getItem(lsKey);
        return typeof bombs === "string" ? +bombs : initialData.bombs;

      case "save":
        if (!value) throw new Error("bombs is not found");
        localStorage.setItem(lsKey, `${value}`);
        break;

      default:
        throw new Error("invalid type");
    }
  }

  static level(type: "get" | "save", value?: InitialData["level"]) {
    const lsKey = "level";
    switch (type) {
      case "get":
        const level = localStorage.getItem(lsKey);
        return level === "easy" || level === "middle" || level === "hard"
          ? level
          : initialData.level;

      case "save":
        if (value === undefined) throw new Error("level is not found");
        localStorage.setItem(lsKey, `${value}`);
        break;

      default:
        throw new Error("invalid type");
    }
  }

  static gameData(type: "get" | "save" | "delete", value?: MineswipperData) {
    const lsKey = "game";
    switch (type) {
      case "get":
        const data = localStorage.getItem(lsKey);
        if (!data) return null;

        return JSON.parse(data);

      case "save":
        this.save(lsKey, value);
        break;

      case "delete":
        localStorage.removeItem(lsKey);
        break;

      default:
        throw new Error("invalid type");
    }
  }
  static statisticData(type: "get" | "save" | "delete", value?: Statictic[]) {
    const lsKey = "statistic";
    switch (type) {
      case "get":
        const data = localStorage.getItem(lsKey);
        if (!data || data === undefined) return [];

        return JSON.parse(data);

      case "save":
        this.save(lsKey, value)
        break;

      case "delete":
        localStorage.removeItem(lsKey);
        break;

      default:
        throw new Error("invalid type");
    }
  }

  private static save(lsKey: string, value: unknown) {
    if (!value) throw new Error("value is not found");
    localStorage.setItem(lsKey, JSON.stringify(value));
  }
}
