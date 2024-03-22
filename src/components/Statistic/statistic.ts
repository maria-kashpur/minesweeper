import { Statictic } from "../../types/types";
import LocalStorageData from "../LocalStorageData/LocalStorageData";
import formatDate from "../utils/formatDate";

export let STATISTIC_DB: Statictic[] = LocalStorageData.statisticData('get');

export class GameStatisticModel {
  static add(data: Omit<Statictic, "date">) {
    const item: Statictic = {
      ...data,
      date: formatDate(new Date()),
    }
    STATISTIC_DB.push(item);
  }

  static get(amountOfLastItems: number) {
    if (STATISTIC_DB.length > amountOfLastItems) {
      return STATISTIC_DB.splice(-amountOfLastItems);
    }
    return STATISTIC_DB;
  }

  static reset() {
    STATISTIC_DB = []
  }
}

