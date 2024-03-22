import { GameStatisticModel } from "../Statistic/statistic";

export function getStatisticTemplate(amountOfLastItems: number) {
  const data = GameStatisticModel.get(amountOfLastItems);
  const items = data.map(
    (el, i) =>
      `<div class="statistics_value">${i + 1}</div>
      <div class="statistics_value">${el.date}</div>
      <div class="statistics_value">${el.status}</div>
      <div class="statistics_value">${el.time}</div>
      <div class="statistics_value">${el.steps}</div>`
  );

  const titleOfTable = `
    <div class="statistics_title">№</div>
    <div class="statistics_title">Дата</div>
    <div class="statistics_title">Статус</div>
    <div class="statistics_title">Время</div>
    <div class="statistics_title">Количество ходов</div>
  `;

  const table = `
    <div class="statistics_table">
      ${titleOfTable}
      ${items.join("")}
    </div>
    `;

  const resetStatisticBtn = `<button class="options_save" type="button" id="resetStat"}>Сбросить статистику</button>`;

  const template = `<div class="popap__statistics statistics_minesweeper">
      <h2 class="statistics_minesweeper__title">Статистика</h2>
      <div class="statistics_minesweeper__items statistic">
        ${items.length === 0 ? "Данные отсутствуют" : table}
      </div> 
     ${items.length === 0 ? "" : resetStatisticBtn}
    </div>`;

  return template;
}
