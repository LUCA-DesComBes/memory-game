const memoryCases = document.querySelectorAll(".memory-btn");
const scoreOne = document.getElementById("score-one");
const scoreTwo = document.getElementById("score-two");
const scoreThree = document.getElementById("score-three");
const scoreFour = document.getElementById("score-four");
const playerDivs = document.querySelectorAll(".player-div");
const scores = [scoreOne, scoreTwo, scoreThree, scoreFour];
const opaDiv = document.getElementById("opa");
const winSect = document.getElementById("win-sect");
const winSectSolo = document.getElementById("win-sect-solo");
const classementDiv = document.querySelector(".classement");
const playerWinSpan = document.querySelector(".player-win");
const restartWinBtn = document.getElementById("restart-win");
const restartWinSoloBtn = document.getElementById("restart-win-solo");
const Times = document.querySelectorAll(".span-times")
const Moves = document.querySelectorAll(".span-moves")
let flippedCards = [];
let matchedCards = [];
let pairesCounter = 0;

const playersArray = ["Player 1", "Player 2", "Player 3", "Player 4"];
let tour = 0;
let pairesJoueurs = [0, 0, 0, 0];

const timeDisplay = document.getElementById("span-times");
const movesDisplay = document.getElementById("span-moves");
const scorePaire = document.getElementById("score-paire");
let seconds = 0;
let minutes = 0;
let timerInterval;
let movesCounter = 0;

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      for(let i = 0; i < Times.length; i++) {
        Times[i].textContent = `${minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`;
      }
    }, 1000);
  }
}

  
function afficherClassementSolo() {
    opaDiv.style.display = "block";
    winSectSolo.style.display = "flex";
    // let classement = [];

    // // Ajoutez ici l'enregistrement du temps et des mouvements
    // classement.push({ moves: movesCounter, time: `${minutes}:${seconds}` });

    // // Vérifiez la longueur après avoir ajouté les résultats
    // if (classement.length === 0) {
    //     classementDiv.innerHTML = "<p>Aucun score enregistré.</p>";
    //     return;
    // }

    // let classementHTML = `
    //     <div class="player-classement">
    //         <span class="player-span">Time Elapsed</span>
    //         <span class="paire-para">${classement[0].time}</span>
    //     </div>
    //     <div class="player-classement">
    //         <span class="player-span">Moves Taken</span>
    //         <p class="paire-para"><span class="score-paire">${classement[0].moves}</span> Moves</p>
    //     </div>
    // `;
    // classementDiv.innerHTML = classementHTML;
    // console.log("Classement mis à jour :", classement);
}


  
function flipCard() {
  if (
    flippedCards.length < 2 &&
    !this.classList.contains("flipped") &&
    !matchedCards.includes(this)
  ) {
    if (movesCounter == 0 && seconds == 0 && minutes == 0) {
      startTimer();
    }

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      movesCounter++;
      for(const span of Moves) {
        span.textContent = movesCounter;
      }
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const number1 = card1.dataset.number;
    const number2 = card2.dataset.number;
  
    if (number1 === number2) {
      matchedCards.push(card1, card2);
      card1.classList.add("trouver");
      card2.classList.add("trouver");
      pairesCounter++;
      pairesJoueurs[tour]++; 
      scores[tour].textContent = pairesJoueurs[tour];
      flippedCards = [];
      setTimeout(() => {
        card1.classList.remove("trouver");
        card2.classList.remove("trouver");
      }, 1000);
      if (matchedCards.length === memoryCases.length) {
        clearInterval(timerInterval);
        afficherClassementSolo();
      }
    } else {
      flippedCards.forEach(card => card.classList.remove("flipped"));
      flippedCards = [];
      changePlayer();
    }
  }

function changePlayer() {
  playerDivs[tour].classList.remove("active-player");
  tour = (tour + 1) % playersArray.length;
  playerDivs[tour].classList.add("active-player");
}

// function afficherClassement() {
//   opaDiv.style.display = "none";
//   winSect.style.display = "none";

//   let classement = [];
//   for (let i = 0; i < playersArray.length; i++) {
//     classement.push({ name: playersArray[i], score: pairesJoueurs[i] });
//   }

//   classement.sort((a, b) => b.score - a.score);
//   playerWinSpan.textContent = `${classement[0].name} Wins!`;

//   let classementHTML = "";
//   for (let i = 0; i < classement.length; i++) {
//     classementHTML += `
//             <div class="player-classement ${i === 0 ? "win-div" : ""}">
//                 <p class="win-para ${i === 0 ? "win" : ""}">
//                     <span class="player-span-win">${
//                       classement[i].name
//                     }</span> ${i === 0 ? "(Winner!)" : ""}
//                 </p>
//                 <p class="paire-para${i === 0 ? "-win" : ""}">
//                     <span class="score-paire ${i === 0 ? "win" : ""}">${
//       classement[i].score
//     }</span> Pairs
//                 </p>
//             </div>
//         `;
//   }
//   classementDiv.innerHTML = classementHTML;
// }
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    pairesCounter = 0;
    pairesJoueurs = [0, 0, 0, 0];
    tour = 0;
    movesCounter = 0;
    for(const span of Moves) {
        span.textContent = movesCounter;
    }
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 0;
    seconds = 0;
    for(let j = 0; j < Times.length; j++) {
        Times[j].textContent = `0:0`
    }

    for (let i = 0; i < scores.length; i++) {
      scores[i].textContent = "0";
    }
    for (let i = 0; i < playerDivs.length; i++) {
      playerDivs[i].classList.remove("active-player");
    }
    playerDivs[0].classList.add("active-player");

    opaDiv.style.display = "none";
    winSect.style.display = "none";
    winSectSolo.style.display = "none";

    for (let i = 0; i < memoryCases.length; i++) {
      memoryCases[i].classList.remove("flipped", "trouver");
      let random = Math.floor(Math.random() * 8);
      memoryCases[i].style.order = random;
    }
}
  
  restartWinBtn.addEventListener("click", restartGame);
  restartWinSoloBtn.addEventListener("click", restartGame);
  
for (let i = 0; i < memoryCases.length; i++) {
  let random = Math.floor(Math.random() * 8);
  memoryCases[i].style.order = random;
  memoryCases[i].addEventListener("click", flipCard);
}
