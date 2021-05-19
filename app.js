//List of words
const esperanto = ["PERFIDULO", "SALUTON", "ZAMENHOF", "RIĈULO", "ESPERANTUJO", "EVILDEA", "AĈULO", "ARBARO", "BONVENON", "ĜIS", "KORO", "HUNDAĈO", "ILARO", "AMIKECO", "ELĈERPITA", "NASKIĜTAGO", "REGISTARO", "RETUMANTO", "RULSEĜO",
    "MALGRANDA", "ĤAOSO", "ANTAŬVIDI", "ARĜENTO", "ATEISTO", "BROŜURO", "BUBO", "BUMERANGO", "CIMO", "DENASKULO", "DIBOĈI", "DISKUTADO", "DOMAĜO", "DORMOSAKO", "DUBI", "EBI", "EDELJESO", "EDZIĜI", "EKSEDZIĜO", "EKSKREMENTO", "EKVILIBRO", "ENE",
    "ENLITIĜI", "ENMIGRINTO", "ERO", "PLENUMITA", "ETOSO", "ETNA", "EĈ", "OL", "AL", "FANTOMO", "FAŬKO", "FEBRO", "FINE", "FINGROMONTRI", "FINI", "FIVORTOJ", "FOJE", "FORMIKO", "FOSI", "FUMO", "FUŜI", "GENUO", "GLACIAĴO", "KABEI", "GLAKI",
    "GLAVO", "GORĜO", "GRAVEDA", "HEJMBESTO", "HUNDOFILO", "IE", "IEL", "INDIKILO", "JUPO", "KANCERO", "KAPUĈO", "KAŬZI", "KINEJO", "KLAKKAPTO", "KOKOSNUKSO", "KOLOMBO", "KOLĈENO", "KOMPATINDA", "KONKURSO", "KOSMO", "LUNO", "KUPEO", "KVADRATO",
    "LASTATEMPE", "LIPOJ", "LUDILO", "MAMZONO", "MDR", "NU", "OMBRELO", "PINO", "PNEŬO", "PUGNO", "RABOBESTO", "REKLAMI", "RIVERENCI", "SAMIDEANO", "SENLABORECO", "TENEBRO", "TREZORO", "TUJ", "TIVTERO", "UMO", "ŜAKO", "ŜPRUCI"];
const canvas = document.querySelector('.myCanvas');
//So we need to generate a random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
//Then we need to have that pick a random word from the array
let ranNum = (getRandomInt(0, esperanto.length));
let pendulo = esperanto[ranNum];
let answerArray = [...pendulo];
let blankArray = [];
let incorrectGuesses = 0;
//Plug the word into the screen
function gameGenerator() {
    let blankGuess = document.getElementById("guesses");
    for (i = 0; i < pendulo.length; i++) {
        blankArray.push("_");
        blankGuess.appendChild(document.createTextNode("_"));
    }
}
//Create the game
gameGenerator();

function checkAnswer() {
    const isButton = event.target.nodeName === 'BUTTON';
    let selection = event.target.id;
    if (pendulo.includes(selection)) {
        for (i = 0; i < pendulo.length; i++) {
            if (selection === answerArray[i]) {
                //replace blackArray[i] with selection
                blankArray[i] = selection;
                //Remove old blanks
                let blankGuess = document.getElementById("guesses");
                blankGuess.innerHTML = "";
                //Replace with anwers
                for (k = 0; k < pendulo.length; k++) {
                    blankGuess.appendChild(document.createTextNode(blankArray[k]));
                }
                // checkAnswer();
            }
        }
    } else {

        //logging incorrect guesses
        incorrectGuesses += 1;

        // draw();

        //If the man is completed first, then failure
        if (incorrectGuesses > 9) {
            // alert(`Mi bedaŭras ke vi malsukcesis. The vorto estis ${pendulo}`);
            let loser = document.getElementById('lose');
            loser.appendChild(document.createTextNode(`Mi bedaŭras ke vi malsukcesis. The vorto estis ${pendulo}`));
            document.getElementById("lose").style.backgroundColor = "#D9534f";
        }
        draw(incorrectGuesses);
    }
    //disable clicked buttons
    let unplug = document.getElementById(selection);
    document.getElementById(selection).style.visibility = "hidden";
    //If they complete the word, then success
    if (blankArray.toString() === answerArray.toString()) {
        let winner = document.getElementById('win');
        winner.appendChild(document.createTextNode('Gratulon! Vi estas tre lerta esperantisto!'));
        document.getElementById("win").style.backgroundColor = "#5cb85c";
    }
}

//Then we need to have the user choose a letter (if button press === letter in word (for each) then reveal)
const wrapper = document.getElementById('keyboard');
//Maybe we need to break each work (when selected) into it's own array of letters.
keyboard.addEventListener('click', (event) => {
    checkAnswer(event);
});

function gameRestart() {
    //empty the old array
    blankArray = [];
    //generate new random number
    newRanNum = (getRandomInt(0, esperanto.length));
    ranNum = newRanNum;
    incorrectGuesses = 0;
    draw();
    //generate a new word
    pendulo = esperanto[ranNum];
    answerArray = [...pendulo];
    //old guesses <p> get's deleted need a new one
    let blankGuess = document.getElementById("guesses");
    for (i = 0; i < pendulo.length; i++) {
        blankArray.push("_");
        blankGuess.appendChild(document.createTextNode("_"));
    }
}

rekomencu.addEventListener('click', (event) => {
    // restart(event);
    let restart = document.getElementsByClassName("selector");
    for (let each of restart) {
        each.style.visibility = "visible";
    }
    let blankGuess = document.getElementById("guesses");
    //Remove old answers
    blankGuess.innerText = '';
    //Remove winner/loser text
    let winner = document.getElementById('win');
    winner.innerHTML = '';
    let loser = document.getElementById('lose');
    loser.innerText = ''
    document.getElementById("lose").style.backgroundColor = "#ffffffbe";
    document.getElementById("win").style.backgroundColor = "#ffffffbe";
    gameRestart();
});


function draw() {
    const canvas = document.querySelector('#canvas');
    // if (!canvas.getContext) {
    //     return;
    // }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    if (incorrectGuesses >= 10) {
        line10 = ctx.beginPath(), ctx.moveTo(220, 240), ctx.lineTo(200, 198), ctx.stroke(); //right leg
    } else if (incorrectGuesses >= 9) {
        line9 = ctx.beginPath(), ctx.moveTo(180, 240), ctx.lineTo(200, 198), ctx.stroke(); //left leg
    } else if (incorrectGuesses >= 8) {
        line1 = ctx.beginPath(), ctx.moveTo(225, 170), ctx.lineTo(200, 125), ctx.stroke(); //arm right
    } else if (incorrectGuesses >= 7) {
        line7 = ctx.beginPath(), ctx.moveTo(170, 170), ctx.lineTo(200, 125), ctx.stroke(); //arm left
    } else if (incorrectGuesses >= 6) {
        line6 = ctx.beginPath(), ctx.moveTo(200, 200), ctx.lineTo(200, 100), ctx.stroke(); //body
    } else if (incorrectGuesses >= 5) {
        line5 = ctx.arc(200, 95, 20, 0, Math.PI * 2, false), ctx.moveTo(25, 15), ctx.fillStyle = "black", ctx.fill(); //head
    } else if (incorrectGuesses >= 4) {
        line4 = (ctx.beginPath(), ctx.moveTo(200, 95), ctx.lineTo(200, 48), ctx.stroke(), ctx.beginPath(), ctx.moveTo(200, 95), ctx.lineTo(200, 95), ctx.stroke()); //rope
    } else if (incorrectGuesses >= 3) {
        line8 = ctx.beginPath(), ctx.moveTo(200, 50), ctx.lineTo(72, 50), ctx.stroke(); //cross beam
    } else if (incorrectGuesses >= 2) {
        line2 = ctx.beginPath(), ctx.moveTo(75, 300), ctx.lineTo(75, 50), ctx.stroke(); //main beam
    } else if (incorrectGuesses >= 1) {
        line3 = (ctx.beginPath(), ctx.moveTo(25, 300), ctx.lineTo(125, 300), ctx.stroke()); //Base
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("ready to begin");
    }

}