import { db } from "./firebase.js";
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db, "game");
const timerRef = ref(db, "countdown");

let localTimer = 0;
let interval = null;

window.startGame = function(){
  intro.classList.add("hidden");
  main.classList.remove("hidden");
};

window.showTab = function(id){
  ["r1","r2","r3"].forEach(t=>document.getElementById(t).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

// TIMER LOGIC (FIXED)
onValue(timerRef, snap=>{
  localTimer = parseInt(snap.val());
  updateTimer();
});

function updateTimer(){
  clearInterval(interval);
  document.getElementById("timer").innerText = localTimer;
  interval = setInterval(()=>{
    if(localTimer>0){
      localTimer--;
      document.getElementById("timer").innerText = localTimer;
    }
  },1000);
}

// GAME DATA
onValue(gameRef, snap=>{
  const data = snap.val();

  // Teams table
  let rows="";
  data.teams.forEach(t=>{
    rows+=`<tr><td>${t.name}</td><td>${t.players.join(", ")}</td></tr>`;
  });
  document.querySelector("#teamsTable tbody").innerHTML = rows;

  // Pirate images auto assign
  let imgHtml="";
  data.teams.forEach((t,i)=>{
    imgHtml+=`<div><img src="https://i.imgur.com/8Qf7K9N.png"><p>${t.name}</p></div>`;
  });
  pirateImages.innerHTML=imgHtml;

  // Rounds
  r1.innerText=data.round1.join(", ")||"No teams yet";
  r2.innerText=data.round2.join(", ")||"No teams yet";
  r3.innerText=data.round3.join(", ")||"No teams yet";

  // Winner
  if(data.winner){
    winnerBox.innerText="🏆 Winner: "+data.winner;
    winSound.play();
  }
});
