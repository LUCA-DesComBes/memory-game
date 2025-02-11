const memoryCases = document.querySelectorAll(".memory-btn");
const scoreOne = document.getElementById("score-one");
const scoreTwo = document.getElementById("score-two");
const scoreThree = document.getElementById("score-three");
const scoreFour = document.getElementById("score-four");
const playerDivs = document.querySelectorAll(".player-div");
let flippedCards = [];
let matchedCards = [];
let pairesCounter = 0;

const playersArray = ["joueur1", "joueur2", "joueur3", "joueur4"];
let tour = 0;

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
	  flippedCards = [];
	
	  if (matchedCards.length === memoryCases.length) {
		console.log(pairesCounter)
	  }
	} else {
	  for (const cases of flippedCards) {
		cases.classList.remove("flipped")
	  }
	  flippedCards = [];
	}
  }

function playerTours() {
	console.log(`C'est au tour de ${playersArray[tour]}`);

	// for (let i = 0; i < playerDivs.length; i++) {
	// 	const playerDiv = playerDivs[i];
	// }
	tour = (tour + 1) % playersArray.length;
}
// let numberRandom = Math.floor(Math.random() * 8)

for(let i = 0; i < memoryCases.length; i++) {
    const memoryCase = memoryCases[i];
    let random = Math.floor(Math.random() * 8)
	// console.log(random)
    memoryCase.style.order = random
    memoryCase.addEventListener("click", flipCard)
}

