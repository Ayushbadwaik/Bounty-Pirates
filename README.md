Bounty Pirates - Full Feature Edition

FEATURES:
- Firebase realtime sync
- Admin dashboard with password
- Countdown timer
- Winner celebration animation
- Pirate sound effects
- Mobile responsive UI
- GitHub CI/CD
- GitHub Pages hosting

Firebase Database JSON Structure:

{
  "adminPassword": "pirate123",
  "countdown": 120,
  "game": {
    "teams":[
      {"name":"Black Pearl","players":["A","B","C","D"]},
      {"name":"Sea Wolves","players":["E","F","G","H"]}
    ],
    "round1":["Black Pearl"],
    "round2":["Black Pearl"],
    "round3":["Black Pearl"],
    "winner":"Black Pearl"
  }
}

Replace Firebase config in firebase.js before hosting.
