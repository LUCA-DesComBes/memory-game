const memoryCases = document.querySelectorAll(".memory-btn");
const scoreOne = document.getElementById("score-one");
const scoreTwo = document.getElementById("score-two");
const scoreThree = document.getElementById("score-three");
const scoreFour = document.getElementById("score-four");
const playerDivs = document.querySelectorAll(".player-div");

const arrayMemorys = [
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
];
const playersArray = ["joueur1", "joueur2", "joueur3", "joueur4"];
let tour = 0;

function playerTours() {
	console.log(`C'est au tour de ${playersArray[tour]}`);

	// for (let i = 0; i < playerDivs.length; i++) {
	// 	const playerDiv = playerDivs[i];
	// }
	tour = (tour + 1) % playersArray.length;
}
let numberRandom = Math.floor(Math.random() * 8)

for(let i = 0; i < memoryCases.length; i++) {
    const memoryCase = memoryCases[i];
    let random = Math.floor(Math.random() * 8)
    let truc = memoryCase.style.order = random
    memoryCase.addEventListener("click", ()=> {
        memoryCase.style.backgroundColor = "#BCCED9"
        memoryCase.style.color = "#FCFCFC"
        memoryCases[i] = truc;
        console.log(memoryCase.textContent)
    })
}

