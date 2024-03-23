var T=Object.defineProperty;var F=(s,t,e)=>t in s?T(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>(F(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const p={easy:{w:10,h:10},middle:{w:15,h:15},hard:{w:20,h:20}},y={min:10,max:99},k={bombs:10,level:"easy"};var l=(s=>(s.marked="minesweeper__cell-marked",s.closed="minesweeper__cell-closed",s.opened="minesweeper__cell-opened",s.numbered="minesweeper__cell-numbered",s.mined="minesweeper__cell-mined",s.boom="minesweeper__cell-boom",s))(l||{}),b=(s=>(s.happy="status__smile-happy",s.winner="status__smile-winner",s.looser="status__smile-looser",s))(b||{}),n=(s=>(s.newGameBtn="newGameBtn",s.optionsBtn="optionsBtn",s.statisticsBtn="statisticsBtn",s.infoBtn="infoBtn",s.colorBtn="color",s.loupeMinBtn="loupeMin",s.loupePlusBtn="loupePlus",s.soundBtn="sound",s.optionsBox="optionsBox",s.optionsForm="optionsForm",s.optionsSaveBtn="optionsSave",s.optionMessage="optionMessage",s.staticReset="resetStat",s.infoBox="infoBox",s.markerBtn="marker",s.stepsBox="setting__steps",s.cellsLeftBox="cells_left",s.markerLeftBox="flag_left",s.smileBox="smile",s.time="time",s.fieldBox="field",s.popapContentBox="popap__content",s.popapBox="popap",s.popapCloseBtn="popap__btn_close",s))(n||{});const f={bomp:new Audio("././sounds/Sound_Bomb.mp3"),step:new Audio("././sounds/step.mp3"),win:new Audio("././sounds/aplodismentyi-pri-pozdravlenii-33950.mp3"),muttedOn:function(){[this.bomp,this.step,this.win].forEach(s=>{s.muted=!0})},muttedOff:function(){[this.bomp,this.step,this.win].forEach(s=>{s.muted=!1})}};class h{static bombs(t,e){const i="bombs";switch(t){case"get":const o=localStorage.getItem(i);return typeof o=="string"?+o:k.bombs;case"save":if(!e)throw new Error("bombs is not found");localStorage.setItem(i,`${e}`);break;default:throw new Error("invalid type")}}static level(t,e){const i="level";switch(t){case"get":const o=localStorage.getItem(i);return o==="easy"||o==="middle"||o==="hard"?o:k.level;case"save":if(e===void 0)throw new Error("level is not found");localStorage.setItem(i,`${e}`);break;default:throw new Error("invalid type")}}static gameData(t,e){const i="game";switch(t){case"get":const o=localStorage.getItem(i);return o?JSON.parse(o):null;case"save":this.save(i,e);break;case"delete":localStorage.removeItem(i);break;default:throw new Error("invalid type")}}static statisticData(t,e){const i="statistic";switch(t){case"get":const o=localStorage.getItem(i);return!o||o===void 0?[]:JSON.parse(o);case"save":this.save(i,e);break;case"delete":localStorage.removeItem(i);break;default:throw new Error("invalid type")}}static save(t,e){if(!e)throw new Error("value is not found");localStorage.setItem(t,JSON.stringify(e))}}function M(s,t,...e){if(!s)throw new Error("parent is not found");const i=document.createElement(t);return e.forEach(o=>{i.classList.add(o)}),s.append(i),i}class g{static get conteiner(){const t=document.getElementById(n.popapBox);if(!t)throw new Error("");return t}static get closeBtns(){return[document.getElementById(n.popapCloseBtn)]}static get contentBox(){const t=document.getElementById(n.popapContentBox);if(!t)throw new Error("");return t}static init(){var t;this.addTemplate(),this.closeBtns.forEach(e=>{e==null||e.addEventListener("click",()=>{this.close()})}),(t=this.conteiner)==null||t.addEventListener("click",e=>{e.target===e.currentTarget&&this.close()})}static addTemplate(){const t=M(document.body,"div","popap");t.id=n.popapBox,t.innerHTML=`
      <button class="popap__btn_close" id="${n.popapCloseBtn}">
          <svg
            style="enable-background: new 0 0 24 24"
            version="1.1"
            viewBox="0 0 24 24"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="info" />
            <g id="icons">
              <path
                d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
                id="exit"
              />
            </g>
          </svg>
        </button>
        <div class="popap__content" id="${n.popapContentBox}"></div>
    `}static open(t){var e;if(document.body.classList.add("lock"),(e=this.conteiner)==null||e.classList.add("active"),!this.contentBox)throw new Error("contentBox is not found");this.contentBox.innerHTML=t}static close(){var t;if(document.body.classList.remove("lock"),(t=this.conteiner)==null||t.classList.remove("active"),!this.contentBox)throw new Error("contentBox is not found");this.contentBox.innerHTML=""}}function L(s,t){if(!t)throw new Error("area is not found");const e=+getComputedStyle(t).getPropertyValue("--sizeCell").replace("px",""),i=!s&&e>10?e-1:s&&e<50?e+1:e;t==null||t.style.setProperty("--sizeCell",`${i}px`)}function N(s){let t=s.getDate(),e=s.getMonth()+1,i=s.getFullYear();return`${t<10?"0"+t:t}.${e<10?"0"+e:e}.${i}`}let u=h.statisticData("get");class w{static add(t){const e={...t,date:N(new Date)};u.push(e)}static get(t){return u.length>t?u.splice(-t):u}static reset(){u=[]}}function G(s){const e=w.get(s).map((d,v)=>`<div class="statistics_value">${v+1}</div>
      <div class="statistics_value">${d.date}</div>
      <div class="statistics_value">${d.status}</div>
      <div class="statistics_value">${d.time}</div>
      <div class="statistics_value">${d.steps}</div>`),o=`
    <div class="statistics_table">
      
    <div class="statistics_title">№</div>
    <div class="statistics_title">Дата</div>
    <div class="statistics_title">Статус</div>
    <div class="statistics_title">Время</div>
    <div class="statistics_title">Количество ходов</div>
  
      ${e.join("")}
    </div>
    `;return`<div class="popap__statistics statistics_minesweeper">
      <h2 class="statistics_minesweeper__title">Статистика</h2>
      <div class="statistics_minesweeper__items statistic">
        ${e.length===0?"Данные отсутствуют":o}
      </div> 
     ${e.length===0?"":'<button class="options_save" type="button" id="resetStat"}>Сбросить статистику</button>'}
    </div>`}class m{static initChangeSettings(t){const e=document.getElementById(n.optionsForm),i=document.getElementById(n.optionMessage),o=document.getElementById(n.optionsSaveBtn);if(!o||!(o instanceof HTMLButtonElement))throw new Error(`#${n.optionsSaveBtn} is not found`);if(!i)throw new Error(`#${n.optionMessage} is not found`);if(!e||!(e instanceof HTMLFormElement))throw new Error(`#${n.optionsForm} is not found`);e.addEventListener("change",()=>{i.classList.contains("active")||(i.classList.add("active"),o.disabled=!1)}),e.addEventListener("submit",r=>{r.preventDefault(),i.classList.contains("active")&&(i.classList.remove("active"),o.disabled=!0);const c=new FormData(e),d={};for(var v of c.entries()){const[O,B]=v;d[O]=typeof B=="string"?B:parseInt(B,10)}"level"in d&&"bombs"in d&&(t.setNewSettings(d.level,+d.bombs),t.newGame())})}static getNewGameBtn(){const t=document.getElementById(n.newGameBtn);if(!t)throw new Error(`#${n.newGameBtn} is not found`);return t}static initeSavingStatistic(){window.addEventListener("beforeunload",()=>{h.statisticData("save",w.get(10))})}static initResetStistic(){const t=document.getElementById(n.staticReset);t==null||t.addEventListener("click",()=>{w.reset(),g.close()})}static initOpenStatistic(t){if(!t)throw new Error("button is not found");t.addEventListener("click",()=>{g.open(G(10)),this.initResetStistic()})}static initOpenSection(t,e){if(!t)throw new Error("button is not found");if(!e)throw new Error("section is not found");t.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active")})}static initDecreaseSizeAreaBtn(t){if(!t)throw new Error("btn is not found");t.addEventListener("click",()=>{L(!1,document.querySelector(".minesweeper__area_wrap"))})}static initIncreaseSizeAreaBtn(t){if(!t)throw new Error("btn is not found");t.addEventListener("click",()=>{L(!0,document.querySelector(".minesweeper__area_wrap"))})}static initThemeSwitcher(t){if(!t)throw new Error("btn is not found");t.addEventListener("click",()=>{document.body.classList.toggle("dark")})}static initMuttedSwitcher(t){if(!t)throw new Error("btn is not found");t.addEventListener("click",()=>{t.classList.contains("off")?(t.classList.remove("off"),f.muttedOff()):(t.classList.add("off"),f.muttedOn())})}}const A="Вы проиграли. Попробуйте еще раз.";function I(s,t){return`
  <div class="popap__message-winner">
    Ура! Вы нашли все мины за <span>${s}</span> секунд и <span>${t}</span> ходов!
  </div>
  `}function z(s){return Array.from({length:s.h},()=>Array.from({length:s.w}))}function S(s,t){return s=Math.ceil(s),t=Math.floor(t),Math.floor(Math.random()*(t-s)+s)}function C(s,t){const e={x:S(0,s.w-1),y:S(0,s.h-1)};return t.filter(o=>o.x===e.x&&o.y===e.y).length!==0?C(s,t):e}function V(s,t){const e=t.x,i=t.y,o=[{x:e-1,y:i-1},{x:e-1,y:i+1},{x:e+1,y:i-1},{x:e+1,y:i+1}],r=[{x:e-1,y:i},{x:e+1,y:i},{x:e,y:i-1},{x:e,y:i+1}];return{angle:E(o,s),axis:E(r,s)}}function E(s,t){return s.filter(e=>e.x>=0&&e.y>=0&&e.x<t.w&&e.y<t.h)}class H{constructor(t,e){a(this,"coordinate");a(this,"neighbours");a(this,"value");a(this,"isOpen");a(this,"isMarker");this.coordinate=t,this.value=0,this.neighbours=V(e,t),this.isOpen=!1,this.isMarker=!1}}class ${constructor(t,e,i){a(this,"fieldSize");a(this,"bombs");a(this,"field");a(this,"data");this.fieldSize=p[t],this.bombs=e,this.field=z(this.fieldSize).map((o,r)=>o.map((c,d)=>new H({x:d,y:r},this.fieldSize))),this.data={steps:0,cellLeftOpen:p[t].h*p[t].w-e,time:0,markers:e,isFinish:!1,status:"game",bombCoordinates:[]},i&&"field"in i&&"data"in i&&(this.field=i.field,this.data=i.data,setInterval(()=>this.increaseTime(),1e3)),this.initSaveGame()}initSaveGame(){window.addEventListener("beforeunload",()=>h.gameData("save",{field:this.field,data:this.data}))}start(t){for(;this.data.bombCoordinates.length<this.bombs;){const e=C(this.fieldSize,[t,...this.data.bombCoordinates]);this.data.bombCoordinates.push(e)}this.data.bombCoordinates.forEach(e=>{const i=this.field[e.y][e.x];i.value="bomb"}),this.field.forEach(e=>{e.forEach(i=>{if(i.value!=="bomb"){const{neighbours:o}=i,r=[...o.axis,...o.angle].map(c=>this.field[c.y][c.x].value).filter(c=>c==="bomb").length;i.value=r}})}),setInterval(()=>this.increaseTime(),1e3)}getCell(t){return this.field[t.y][t.x]}decreaseCellLeftOpen(){this.data.cellLeftOpen!==0&&(this.data.cellLeftOpen-=1)}increaseStep(){return this.data.isFinish||(this.data.steps+=1,f.step.play()),this.data.steps}increaseTime(){this.data.isFinish===!1&&(this.data.time+=1)}markCell(t){const e=this.getCell(t);return e.isMarker===!0?(this.data.markers+=1,e.isMarker=!1,!0):e.isMarker===!1&&this.data.markers>0?(this.data.markers-=1,e.isMarker=!0,!0):!1}finish(t){switch(t){case"win":this.data.isFinish=!0,this.data.status="winner",f.win.play();break;case"looser":this.data.isFinish=!0,this.data.status="looser",f.bomp.play();break;case"check":this.data.cellLeftOpen===0&&this.finish("win");break;default:throw new Error("invalid type")}}getGameData(){return{data:this.data,field:this.field}}checkCell(t){const e=this.getCell(t),{value:i}=e;return e.isOpen=!0,this.increaseStep(),this.decreaseCellLeftOpen(),i==="bomb"?this.finish("looser"):(i===0&&this.openNeighbors(e.neighbours.axis),this.finish("check")),this.getGameData()}openNeighbors(t){t.forEach(e=>{const i=this.getCell(e);if(i.isOpen)return;const{value:o}=i;o!=="bomb"&&(this.decreaseCellLeftOpen(),i.isOpen=!0),o===0&&i.isOpen===!0&&this.openNeighbors(i.neighbours.axis)})}}class P{constructor(t,e){a(this,"box");a(this,"coordinate");const i=M(e,"li","minesweeper__cell",l.closed);this.box=i,this.coordinate=t,this.box.setAttribute("coordirate",JSON.stringify(t))}open(t){this.controlMarker("delete"),this.box.classList.contains(l.closed)&&this.box.classList.remove(l.closed),this.box.classList.add(l.opened);const e=this.getClassForCells(t);e!==""&&this.box.classList.add(e),typeof t=="number"&&t>0&&(this.box.textContent=`${t}`)}controlMarker(t){switch(t){case"add":this.box.classList.contains(l.marked)||this.box.classList.add(l.marked);break;case"delete":this.box.classList.contains(l.marked)&&this.box.classList.remove(l.marked);break;case"toggle":this.box.classList.contains(l.marked)?this.box.classList.remove(l.marked):this.box.classList.add(l.marked);break}}getClassForCells(t){switch(t){case"bomb":return l.boom;case"mined":return l.mined;case 0:return"";case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:return`${l.numbered}_${t}`;default:throw new Error("invalid type")}}}class R{constructor(t,e){a(this,"markerBox");a(this,"smileBox");a(this,"timeBox");a(this,"stepsBox");a(this,"cellOpenLeftBox");a(this,"fieldBox");a(this,"isMarkerMode");a(this,"field");a(this,"markerBtn");this.isMarkerMode=!1,this.markerBtn=document.getElementById(n.markerBtn),this.markerBox=document.getElementById(n.markerLeftBox),this.smileBox=document.getElementById(n.smileBox),this.timeBox=document.getElementById(n.time),this.stepsBox=document.getElementById(n.stepsBox),this.cellOpenLeftBox=document.getElementById(n.cellsLeftBox),this.fieldBox=document.getElementById(n.fieldBox),this.field=[],this.createNewField(t,e),this.initClickMarker()}getCell(t){return this.field[t.y][t.x]}updateMarkerBox(t){if(!this.markerBox)throw new Error(`#${n.markerLeftBox} is not found`);this.markerBox.textContent=`${t}`}updateSmileBox(t){if(!this.smileBox)throw new Error(`#${n.smileBox} is not found`);switch(this.smileBox.className="status__smile",t){case"game":this.smileBox.classList.add(b.happy);break;case"looser":this.smileBox.classList.add(b.looser);break;case"winner":this.smileBox.classList.add(b.winner);break}}updateTimeBox(t){if(!this.timeBox)throw new Error(`#${n.time} is not found`);this.timeBox.textContent!==`${t}`&&(this.timeBox.textContent=`${t}`)}updateStepsBox(t){if(!this.stepsBox)throw new Error(`#${n.stepsBox} is not found`);this.stepsBox.textContent!==`${t}`&&(this.stepsBox.textContent=`${t}`)}updateCellOpenLeftBox(t){if(!this.cellOpenLeftBox)throw new Error(`#${n.cellsLeftBox} is not found`);this.cellOpenLeftBox.textContent!==`${t}`&&(this.cellOpenLeftBox.textContent=`${t}`)}toggleMarkerMode(){this.isMarkerMode=!this.isMarkerMode}createNewField(t,e){if(!this.fieldBox)throw new Error(`#${n.fieldBox} is not found`);if(this.getFieldBox().classList.contains("unactive")&&this.getFieldBox().classList.remove("unactive"),this.fieldBox.innerHTML="",!t||t.length===0)throw new Error("data is not found");this.field=t.map(i=>i.map(o=>{if(!this.fieldBox)throw new Error(`#${n.fieldBox} is not found`);return new P(o.coordinate,this.fieldBox)})),this.fieldBox.style.setProperty("--numCell",`${e}`)}getFieldBox(){if(!this.fieldBox)throw new Error(`#${n.fieldBox} is not found`);return this.fieldBox}initClickMarker(){if(!this.markerBtn)throw new Error(`#${n.markerBtn} is not found`);this.markerBtn.addEventListener("click",()=>{var t;(t=this.markerBtn)==null||t.classList.toggle("active"),this.toggleMarkerMode()})}showCellsWithBomb(t,e){e.forEach(i=>{this.getCell(i).open(t)})}updateCells(t){t.forEach(e=>{e.forEach(i=>{const o=this.getCell(i.coordinate);i.isMarker?o.controlMarker("add"):o.controlMarker("delete"),i.isOpen&&o.open(i.value)})})}updateData(t){t.data.isFinish&&(this.showCellsWithBomb(t.data.status==="winner"?"mined":"bomb",t.data.bombCoordinates),this.getFieldBox().classList.add("unactive")),this.updateSmileBox(t.data.status),this.updateMarkerBox(t.data.markers),this.updateStepsBox(t.data.steps),this.updateCellOpenLeftBox(t.data.cellLeftOpen),this.updateCells(t.field)}}class J{constructor(){a(this,"model");a(this,"level");a(this,"bombs");a(this,"view");this.level=h.level("get"),this.bombs=h.bombs("get"),this.model=new $(this.level,this.bombs,h.gameData("get")),this.view=new R(this.model.field,this.model.fieldSize.w),this.view.updateData(this.model.getGameData()),this.initClickCell(),this.initNewGameClick(this.view.smileBox),setInterval(()=>this.view.updateTimeBox(this.model.data.time),1e3)}initSaveData(){window.addEventListener("beforeunload",()=>{h.level("save",this.level),h.bombs("save",this.bombs)})}initNewGameClick(t){t==null||t.addEventListener("click",()=>this.newGame())}setNewSettings(t,e){this.level=t,this.bombs=e}newGame(){h.gameData("delete"),this.model=new $(this.level,this.bombs),this.view.createNewField(this.model.field,p[this.level].w),this.view.updateData(this.model.getGameData())}doStep(t){this.model.data.steps===0&&this.model.start(t),this.model.checkCell(t),this.view.updateData(this.model.getGameData()),this.model.data.isFinish&&this.showMessegeAfterFinish(this.model.getGameData())}showMessegeAfterFinish(t){if(t.data.status==="winner"){const e=I(t.data.time,t.data.steps);setTimeout(()=>g.open(e),1e3)}else if(t.data.status==="looser"){const e=A;setTimeout(()=>g.open(e),1e3)}this.addStatistic(t)}addStatistic(t){const{status:e,time:i,steps:o}=t.data;w.add({status:e,time:i,steps:o})}markCell(t){this.model.markCell(t)&&this.view.updateData(this.model.getGameData())}initClickCell(){const t=this.view.getFieldBox();t.addEventListener("click",e=>{if(!e.target||!(e.target instanceof HTMLElement))return;let i=e.target.getAttribute("coordirate");if(!i)return;const o=JSON.parse(i);this.view.isMarkerMode?this.markCell(o):this.doStep(o)}),t.addEventListener("contextmenu",e=>{if(e.preventDefault(),!e.target||!(e.target instanceof HTMLElement))return;let i=e.target.getAttribute("coordirate");if(!i)return;const o=JSON.parse(i);this.markCell(o)})}}const x={easy:"Легкий (10х10)",middle:"Средний (15х15)",hard:"Сложный (20х20)"};function j(){const s=h.level("get"),t=h.bombs("get");return`
    <header class="conteiner">
      <div class="header">
        <div class="logo">
          <img src="./icons/44633_bomb_icon.png" alt="logo" height="40">
          <h1>minesweeper</h1>
          <img src="./icons/45325_bomb_icon.png" alt="logo" height="40">
        </div>
        <div class="header_btns">
          <button id="${n.newGameBtn}" type="button">Новая игра</button>
          <button id="${n.optionsBtn}" type="button">Параметры</button>
          <button id="${n.statisticsBtn}" type="button">Статистика</button>
          <button id="${n.infoBtn}" type="button">Об игре</button>
          <button id="${n.colorBtn}" type="button" class="setting__color"></button>
          <div>
            <button id="${n.loupeMinBtn}" type="button" class="setting__loupe_minus"></button>
            <button id="${n.loupePlusBtn}" type="button" class="setting__loupe_plus"></button>
          </div>
          <button id="${n.soundBtn}" type="button" class="setting__sound"></button>
        </div>
      </div>
    </header>
    <main class="conteiner">
      <section class="options" id="${n.optionsBox}">
        <h2>Параметры:</h2>
        <form class="options__form" id="${n.optionsForm}">
          <div class="options_lavel">
            <h3 class="options__title">Уровень:</h3>
            <div class="level">
              ${Object.keys(p).map(i=>{const o=i==="easy"?x.easy:i==="middle"?x.middle:i==="hard"?x.hard:"";if(o==="")throw new Error("invalid text");return`<label class="level_item"><input type="radio" name="level" value="${i}" ${i===s?"checked":""}><span>${o}</span></label>`}).join(" ")}
            </div>
          </div>
          <div class="options_bombs">
            <label for="bombs">
              <h3 class="options__title">Количество бомб (от 10 до 99):</h3>
              <input class="bombs_value" name="bombs" type="number" value="${t}" min="${y.min}" max="${y.max}">
            </label>
          </div>
          <button id="${n.optionsSaveBtn}" class="options_save" type="submit" disabled>Сохранить настройки</button>
          <p class="options_message" id="${n.optionMessage}">Сохраните настройки, чтобы начать игру</p>
        </form>
        
      </section>
      <section class="info" id="${n.infoBox}">
        <h2>Об игре:</h2>
        <p>Minesweeper — это логическая игра на поле, на котором спрятаны мины. 
        <p>Цель игры: открыть все ячейки поля, не попадая на мины. </p>
        <p>Игровое поле представляет собой сетку квадратных ячеек. Каждая ячейка может быть либо закрытой, либо открытой. 
          Каждая открытая ячейка, кроме тех, где находится мина, содержит число от 0 до 8.
          Это число указывает на количество мин, расположенных в соседних ячейках (верхней, нижней, левой, правой и диагональной).
        </p>
        <p>Игрок может открыть ячейку, щелкнув по ней левой кнопкой мыши.
          Если в открытой ячейке нет мины, открывается число или пустая область.
          Если в открытой ячейке число 0, открываются все соседние ячейки, до тех пор, пока не будет обнаружена граница с числами.</p>
        <p>Игрок может поставить метку на ячейку, где, по его мнению, есть мина, щелкнув по ней правой кнопкой мыши. 
          Это позволяет игроку помечать мины и избегать их.</p>
        <p>Игра выиграна, когда открыты все ячейки, в которых нет мин. Игра проиграна, если игрок открывает ячейку с миной.</p>
      </section>

      <section class="minesweeper">

        <div class="minesweeper__setting setting">
          <button
            id="${n.markerBtn}"
            name="flag"
            type="button"
            class="setting__flag setting__item"></button>
          <div class="setting__steps setting__item-aditional">Ходов: <span id="${n.stepsBox}">0</span>
          <div class="setting__cells_left setting__item-aditional">
            Осталось открыть ячеек: <span id="${n.cellsLeftBox}">0</span>
          </div>
        </div>
        
        </div>
        <div class="minesweeper__area_wrap">
          <div class="minesweeper__status status">
            <div class="status__flags" id="${n.markerLeftBox}">0</div>
            <button type="button" id="${n.smileBox}" class="status__smile status__smile-happy"></button>
            <div id="${n.time}" class="status__timer">0</div>
          </div>
          <ul class="minesweeper__area" id="${n.fieldBox}"></ul>
        </div>
      </section>
    </main>
    <footer class="conteiner">
      <div class="footer">
        <div><a href="https://www.iconfinder.com/" target="_blank">Thanks for icons iconfinder.com</a></div>
        <div class="github"><a href="https://github.com/maria-kashpur" target="_blank"><img src="./svg/211904_social_github_icon.svg" alt="github" height="30">maria-kashpur</a></div>
        <div><a href="https://rs.school/index.html" target="_blank"><img src="./svg/rs_school_js.svg" alt="RS" height="30"></a></div>
      </div>
    </footer>
  `}document.body.innerHTML=j();g.init();const _=new J;_.initSaveData();_.initNewGameClick(m.getNewGameBtn());m.initThemeSwitcher(document.getElementById(n.colorBtn));m.initIncreaseSizeAreaBtn(document.getElementById(n.loupePlusBtn));m.initDecreaseSizeAreaBtn(document.getElementById(n.loupeMinBtn));m.initOpenSection(document.getElementById(n.optionsBtn),document.getElementById(n.optionsBox));m.initOpenSection(document.getElementById(n.infoBtn),document.getElementById(n.infoBox));m.initMuttedSwitcher(document.getElementById(n.soundBtn));m.initeSavingStatistic();m.initOpenStatistic(document.getElementById(n.statisticsBtn));m.initChangeSettings(_);
