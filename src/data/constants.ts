import { InitialData } from "../types/types";

export const LEVELS = {
  easy: { w: 10, h: 10 },
  middle: { w: 15, h: 15 },
  hard: { w: 20, h: 20 },
};

export const BOMB = {
  min: 10,
  max: 99,
};

export const initialData: InitialData = {
  bombs: 10,
  level: "easy",
};

export const enum CellsClass {
  marked = "minesweeper__cell-marked",
  closed = "minesweeper__cell-closed",
  opened = "minesweeper__cell-opened",

  numbered = "minesweeper__cell-numbered",
  mined = "minesweeper__cell-mined",
  boom = "minesweeper__cell-boom",
}

export const enum SmileClass {
  happy = "status__smile-happy",
  winner = "status__smile-winner",
  looser = "status__smile-looser",
}

export enum ElementID {
  newGameBtn = "newGameBtn",
  optionsBtn = "optionsBtn",
  statisticsBtn = "statisticsBtn",
  infoBtn = "infoBtn",

  colorBtn = "color",
  loupeMinBtn = "loupeMin",
  loupePlusBtn = "loupePlus",
  soundBtn = "sound",

  optionsBox = "optionsBox",
  optionsForm = "optionsForm",
  optionsSaveBtn = "optionsSave",
  optionMessage = "optionMessage",

  staticReset = "resetStat",

  infoBox = "infoBox",

  markerBtn = "marker",
  stepsBox = "setting__steps",
  cellsLeftBox = "cells_left",
  markerLeftBox = "flag_left",
  smileBox = "smile",
  time = "time",
  fieldBox = "field",

  popapContentBox = "popap__content",
  popapBox = "popap",
  popapCloseBtn = "popap__btn_close",
}

export const AUDIO = {
  bomp: new Audio("././sounds/Sound_Bomb.mp3"),
  step: new Audio("././sounds/step.mp3"),
  win: new Audio("././sounds/aplodismentyi-pri-pozdravlenii-33950.mp3"),
  muttedOn: function () {
    [this.bomp, this.step, this.win].forEach((audio) => {
      audio.muted = true;
    });
  },
  muttedOff: function () {
    [this.bomp, this.step, this.win].forEach((audio) => {
      audio.muted = false;
    });
  },
};
