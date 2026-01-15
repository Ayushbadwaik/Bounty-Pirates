import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db,"game");
const timerRef = ref(db,"countdown");

let localTimer=0;
let interval=null;

window.startGame=function(){
  intro.classList.add("hidden");
  main.classList.remove("hidden");
}

// TIMER
onValue(timerRef,snap=>{
  localTimer=parseInt(snap.val());
  runTimer();
});

function runTimer(){
  clearInterval(interval);
  timer.innerText=localTimer;

  interval=setInterval(()=>{
    if(localTimer>0){
      localTimer--;
      timer.innerText=localTimer;
    }
  },1000);
}

// GAME DATA
onValue(gameRef,snap=>{
  const data=snap.val();

  // TEAM TABLE
  let rows="";
  data.teams.forEach(t=>{
    rows+=`<tr><td>${t.name}</td><td>${t.players.join(", ")}</td></tr>`;
  });
  teamsTable.querySelector("tbody").innerHTML=rows;

  // PIRATE GRID
  let grid="";
  data.teams.forEach((t,i)=>{
    grid+=`
    <div>
      <img src="pirates/p${i+1}.jpg"
           onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/5/5a/Pirate_flag.svg'">
      <b>${t.name}</b>
    </div>`;
  });
  pirateGrid.innerHTML=grid;

  // RESULTS
  r1.innerText=data.round1.length?data.round1.join(", "):"Not declared";
  r2.innerText=data.round2.length?data.round2.join(", "):"Not declared";
  r3.innerText=data.round3.length?data.round3.join(", "):"Not declared";

  if(data.winner){
    winnerBox.innerText="🏆 Winner: "+data.winner;
  }
});
