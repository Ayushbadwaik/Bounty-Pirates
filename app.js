import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db, "game");
const timerRef = ref(db, "countdown");

let localTimer = 0;
let interval = null;

// Countdown sync
onValue(timerRef, snap => {
  localTimer = parseInt(snap.val());
  startTimer();
});

function startTimer(){
  clearInterval(interval);
  document.getElementById("timer").innerText = localTimer;

  interval = setInterval(()=>{
    if(localTimer > 0){
      localTimer--;
      document.getElementById("timer").innerText = localTimer;
    }
  },1000);
}

// Game data
onValue(gameRef, snap => {

  const data = snap.val();

  // Table
  let rows = "";
  data.teams.forEach((t,i)=>{
    rows += `
    <tr>
      <td>${t.name}</td>
      <td>${t.players.join(", ")}</td>
      <td>
        <img src="pirates/p${i+1}.jpg"
             onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/5/5a/Pirate_flag.svg'">
      </td>
    </tr>`;
  });

  document.querySelector("#teamsTable tbody").innerHTML = rows;

  // Results
  document.getElementById("r1").innerText =
    data.round1.length ? data.round1.join(", ") : "Not declared";

  document.getElementById("r2").innerText =
    data.round2.length ? data.round2.join(", ") : "Not declared";

  document.getElementById("r3").innerText =
    data.round3.length ? data.round3.join(", ") : "Not declared";

  if(data.winner){
    document.getElementById("winnerBox").innerText =
      "🏆 Winner: " + data.winner;
  }

});
