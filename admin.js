import { db } from './firebase.js'
import { ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const gameRef = ref(db,"game");
const passRef = ref(db,"adminPassword");
const timerRef = ref(db,"countdown");

window.login = async function(){
const p = document.getElementById("pass").value;
const snap = await get(passRef);
if(p==snap.val()){
document.getElementById("loginBox").classList.add("hidden");
document.getElementById("panel").classList.remove("hidden");
loadData();
}else{
alert("Wrong Password");
}
}

function loadData(){
get(gameRef).then(s=>{
document.getElementById("json").value=JSON.stringify(s.val(),null,2);
});
}

window.saveAll=function(){
set(gameRef, JSON.parse(document.getElementById("json").value));
set(timerRef, document.getElementById("timerInput").value);
alert("Website updated live");
}
