import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db, "game");
const timerRef = ref(db, "countdown");

let localTimer = 0;
let interval = null;

window.startGame = function(){
  intro.classList.add("hidden");
  main.classList.remove("hidden");
};

// TIMER
onValue(timerRef, snap=>{
  localTimer = parseInt(snap.val());
  startCountdown();
});

function startCountdown(){
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

  let rows="";
  data.teams.forEach((t,i)=>{
    rows+=`
    <tr>
      <td>${t.name}</td>
      <td>${t.players.join(", ")}</td>
      <td><img src="pirates/p${i+1}.jpg"></td>
    </tr>
    `;
  });
  document.querySelector("#teamsTable tbody").innerHTML = rows;

  r1.innerText = data.round1.join(", ") || "Not declared";
  r2.innerText = data.round2.join(", ") || "Not declared";
  r3.innerText = data.round3.join(", ") || "Not declared";

  if(data.winner){
    winnerBox.innerText = "🏆 Winner: " + data.winner;
    winSound.play();
  }
});
