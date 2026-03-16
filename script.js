const casilla = document.querySelectorAll(".casilla");
const name_jugador = document.querySelectorAll(".name_jugador");
let score_jugador = document.querySelectorAll(".score_jugador");
let turno = document.querySelector(".turno");
const rest_game = document.querySelector(".rest-game");
let info = document.querySelectorAll(".info")
let ganador = document.querySelector(".info-ganador")
let btn_info = document.querySelector(".btn-info")
let btn_empate = document.querySelector(".btn-empate")
let currentPlayer;
let simbolo = marcador();

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


let boardGame = {
   board: ["","","","","","","","",""],
}

function comenzar() {
    restGame()
    currentPlayer = Math.floor(Math.random() * 2)
}

function cambiarTurno() {
    if (currentPlayer == 0) {
        currentPlayer = 1
    }else {
        currentPlayer = 0
    }
}

/*Marcar casilla*/
casilla.forEach(cel => {
    cel.addEventListener("click", () => {
        let index = cel.dataset.index;

        if (boardGame.board[index] == "") {
            let simbolo = marcador();
            cel.textContent = simbolo;
            cel.style.color = simbolo == "X" ? "#F07848" : "rgb(154, 230, 154)";
            boardGame.board[index] = simbolo;
            ganarRonda(boardGame.board);
            cambiarTurno();
        } else if (!boardGame.board.includes("")) {
            info[1].style.display = "flex"
            btn_empate.addEventListener("click", () => {info[1].style.display = "none"})
            restBoard();
        }
    });
});

function marcador() {
    if (currentPlayer == 0){
        return "X"
    }if (currentPlayer == 1) {
        return "O"
    }
}

/*Puntaje*/
function ganarRonda(currentPlayer) {

    for (let condition of winConditions) {
        const [a, b, c] = condition
        if (
            boardGame.board[a] !== "" &&
            boardGame.board[a] === boardGame.board[b] &&
            boardGame.board[a] === boardGame.board[c]
        ) {
            sumarPunto()
            restBoard()
            return boardGame.board[a]
        }
    }
    return null
}

function sumarPunto() {
    if (currentPlayer == 0) {
        score_jugador[0].textContent++
    }else{
        score_jugador[1].textContent++
    }
    
    ganarPartida()
}

function ganarPartida() {
    if (parseInt(score_jugador[0].textContent) >= 3 || parseInt(score_jugador[1].textContent) >= 3) {
        info[0].style.display = "flex"
        ganador.textContent = "Has ganado"
        restGame()
    }
}


/*Bot Player*/
function randomCell() {
    return Math.floor(Math.random() * 9)
}

function marcarCeldaBot(){
    if (currentPlayer === "player2"){
    }
}



/*Reiniciar Juego*/
rest_game.addEventListener("click", restGame)

function restBoard() {

    casilla.forEach(cel => {
    cel.textContent = ""
    })
    boardGame.board = ["","","","","","","","",""]
}

function restGame() {
    casilla.forEach(cel => {
        cel.textContent = ""
    })

    score_jugador.forEach(score => {
        score.textContent = "0"
    })

    boardGame.board = ["","","","","","","","",""]
}

btn_info.addEventListener("click", () => {
    restGame()
    info[0].style.display = "none"
})

comenzar()
