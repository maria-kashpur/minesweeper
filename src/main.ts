import "./styles/main.scss";
import { ElementID } from "./data/constants.ts";
import Options from "./components/Options/Options.ts";
import Game from "./components/Game/Game.ts";
import Popap from "./components/Popap/Popap.ts";
import { getStartTemplate } from "./components/templates/mainTemplate.ts";

document.body.innerHTML = getStartTemplate();
Popap.init();
const game = new Game();
game.initSaveData();
game.initNewGameClick(Options.getNewGameBtn());

Options.initThemeSwitcher(document.getElementById(ElementID.colorBtn));
Options.initIncreaseSizeAreaBtn(
  document.getElementById(ElementID.loupePlusBtn)
);
Options.initDecreaseSizeAreaBtn(document.getElementById(ElementID.loupeMinBtn));
Options.initOpenSection(
  document.getElementById(ElementID.optionsBtn),
  document.getElementById(ElementID.optionsBox)
);
Options.initOpenSection(
  document.getElementById(ElementID.infoBtn),
  document.getElementById(ElementID.infoBox)
);
Options.initMuttedSwitcher(document.getElementById(ElementID.soundBtn));

Options.initeSavingStatistic();

Options.initOpenStatistic(document.getElementById(ElementID.statisticsBtn));

Options.initChangeSettings(game);
