import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db, "game");

onValue(gameRef, snap => {

  const data = snap.val();

  // TABLE
  let rows = "";
  data.teams.forEach((t,i) => {
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

  // RESULTS
  document.getElementById("r1").innerText = data.round1.length ? data.round1.join(", ") : "Not declared";
  document.getElementById("r2").innerText = data.round2.length ? data.round2.join(", ") : "Not declared";
  document.getElementById("r3").innerText = data.round3.length ? data.round3.join(", ") : "Not declared";

  if(data.winner){
    document.getElementById("winnerBox").innerText = "🏆 Winner: " + data.winner;
  }

});
