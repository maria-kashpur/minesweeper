export default function getMessegeWinnerTemplate (time: number, steps: number): string {
  return`
  <div class="popap__message-winner">
    Ура! Вы нашли все мины за <span>${time}</span> секунд и <span>${steps}</span> ходов!
  </div>
  `; 
}