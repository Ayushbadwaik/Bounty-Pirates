import { db } from './firebase.js'
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db, "game");
const timerRef = ref(db, "countdown");

window.startGame=function(){
document.getElementById("intro").classList.add("hidden");
document.getElementById("main").classList.remove("hidden");
}

onValue(timerRef, snap=>{
document.getElementById("timer").innerText = snap.val();
});

onValue(gameRef, snap=>{
const data = snap.val();

let html="";
data.teams.forEach(t=>{
html+=`<div><h3>${t.name}</h3><p>${t.players.join(", ")}</p></div>`;
});
document.getElementById("teams").innerHTML=html;

document.getElementById("rounds").innerHTML=`
<h2>Round 1</h2><p>${data.round1.join(", ")}</p>
<h2>Round 2</h2><p>${data.round2.join(", ")}</p>
<h2>Round 3</h2><p>${data.round3.join(", ")}</p>
`;

if(data.winner){
document.getElementById("winnerBox").innerHTML = "🏆 Winner: "+data.winner;
document.getElementById("winSound").play();
}
});
