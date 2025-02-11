const memoryCases = document.querySelectorAll(".memory-btn");
const scoreOne = document.getElementById("score-one");
const scoreTwo = document.getElementById("score-two");
const scoreThree = document.getElementById("score-three");
const scoreFour = document.getElementById("score-four");
const playerDivs = document.querySelectorAll(".player-div");
const scores = [scoreOne, scoreTwo, scoreThree, scoreFour];
const opaDiv = document.getElementById("opa");
const winSect = document.getElementById("win-sect");
const classementDiv = document.querySelector(".classement");
const playerWinSpan = document.querySelector(".player-win");
const restartWinBtn = document.getElementById("restart-win");
let flippedCards = [];
let matchedCards = [];
let pairesCounter = 0;

const playersArray = ["joueur1", "joueur2", "joueur3", "joueur4"];
let tour = 0;
let pairesJoueurs = [0, 0, 0, 0];

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
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
        pairesJoueurs[tour]++; // Ajoute un point au joueur actuel
        scores[tour].textContent = pairesJoueurs[tour];
        flippedCards = [];

        if (matchedCards.length === memoryCases.length) {
            afficherClassement();
        }
    } else {
        for (let i = 0; i < flippedCards.length; i++) {
            flippedCards[i].classList.remove("flipped");
        }
        flippedCards = [];
        changePlayer();
    }
}

function changePlayer() {
    playerDivs[tour].classList.remove("active-player");
    tour = (tour + 1) % playersArray.length;
    playerDivs[tour].classList.add("active-player");
}

function afficherClassement() {
    opaDiv.style.display = "block";
    winSect.style.display = "flex";
    
    let classement = [];
    for (let i = 0; i < playersArray.length; i++) {
        classement.push({ name: playersArray[i], score: pairesJoueurs[i] });
    }
    
    classement.sort((a, b) => b.score - a.score);
    playerWinSpan.textContent = `${classement[0].name} Wins!`;
    
    let classementHTML = "";
    for (let i = 0; i < classement.length; i++) {
        classementHTML += `
            <div class="player-classement ${i === 0 ? 'win-div' : ''}">
                <p class="win-para ${i === 0 ? 'win' : ''}">
                    <span class="player-span-win">${classement[i].name}</span> ${i === 0 ? '(Winner!)' : ''}
                </p>
                <p class="paire-para${i === 0 ? '-win' : ''}">
                    <span class="score-paire ${i === 0 ? 'win' : ''}">${classement[i].score}</span> Pairs
                </p>
            </div>
        `;
    }
    classementDiv.innerHTML = classementHTML;
}

function restartGame() {
    flippedCards = [];
    matchedCards = [];
    pairesCounter = 0;
    pairesJoueurs = [0, 0, 0, 0];
    tour = 0;
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = "0";
    }
    for (let i = 0; i < playerDivs.length; i++) {
        playerDivs[i].classList.remove("active-player");
    }
    playerDivs[0].classList.add("active-player");
    opaDiv.style.display = "none";
    winSect.style.display = "none";
    for (let i = 0; i < memoryCases.length; i++) {
        memoryCases[i].classList.remove("flipped", "trouver");
        let random = Math.floor(Math.random() * 8);
        memoryCases[i].style.order = random;
    }
}

restartWinBtn.addEventListener("click", restartGame);

for (let i = 0; i < memoryCases.length; i++) {
    let random = Math.floor(Math.random() * 8);
    memoryCases[i].style.order = random;
    memoryCases[i].addEventListener("click", flipCard);
}
