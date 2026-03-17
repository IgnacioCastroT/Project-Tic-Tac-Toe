/* ── DOM References ── */
const casilla       = document.querySelectorAll(".casilla");
const name_jugador  = document.querySelectorAll(".name_jugador");
let   score_jugador = document.querySelectorAll(".score_jugador");
const turno         = document.querySelector(".turn");
const reiniciarBtn  = document.getElementById("reiniciarBtn");
const modalGanador  = document.getElementById("modalGanador");
const modalEmpate   = document.getElementById("modalEmpate");
const infoGanador   = document.querySelector(".info-ganador");
const ganadorSubs   = document.querySelectorAll(".ganador-sub");
const btn_info      = document.querySelector(".btn-info");
const btn_empate    = document.querySelector(".btn-empate");

/* ── Setup Screen ── */
const setupOverlay = document.getElementById("setupOverlay");
const gameBoard    = document.querySelector(".tablero");
const setupStart   = document.getElementById("setup-start");
const inputP1      = document.getElementById("input-p1");
const inputP2      = document.getElementById("input-p2");
const setupError   = document.getElementById("setup-error");

let p1Name = "Player 1";
let p2Name = "Player 2";
let currentPlayer;

/* ── Win conditions ── */
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let boardGame = { board: ["","","","","","","","",""] };

/* ── Setup: start game ── */
setupStart.addEventListener("click", () => {
    const v1 = inputP1.value.trim();
    const v2 = inputP2.value.trim();

    if (!v1 || !v2) {
        setupError.textContent = "¡Ingresá el nombre de ambos jugadores!";
        return;
    }

    setupError.textContent = "";
    p1Name = v1;
    p2Name = v2;

    name_jugador[0].textContent = p1Name;
    name_jugador[1].textContent = p2Name;

    setupOverlay.classList.add("hidden");
    gameBoard.classList.remove("hidden");

    comenzar();
});

/* ── Game init ── */
function actualizarTurno() {
    turno.textContent = `Turno de ${currentPlayer === 0 ? p1Name : p2Name}`;
}

function comenzar() {
    restBoard();
    resetScores();
    currentPlayer = Math.floor(Math.random() * 2);
    actualizarTurno();
}

function cambiarTurno() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    actualizarTurno();
}

/* ── Mark cell ── */
casilla.forEach(cel => {
    cel.addEventListener("click", () => {
        const index = cel.dataset.index;
        if (boardGame.board[index] !== "") return;

        const simbolo = marcador();
        cel.textContent = simbolo;
        cel.style.color = simbolo === "X" ? "#F07848" : "rgb(154, 230, 154)";
        boardGame.board[index] = simbolo;

        if (ganarRonda()) return;   // winner found → handled inside

        if (!boardGame.board.includes("")) {
            // Board full, no winner → DRAW
            mostrarEmpate();
            return;
        }

        cambiarTurno();
    });
});

function marcador() {
    return currentPlayer === 0 ? "X" : "O";
}

/* ── Win check ── */
function ganarRonda() {
    for (const [a, b, c] of winConditions) {
        if (
            boardGame.board[a] !== "" &&
            boardGame.board[a] === boardGame.board[b] &&
            boardGame.board[a] === boardGame.board[c]
        ) {
            sumarPunto();
            return true;
        }
    }
    return false;
}

function sumarPunto() {
    if (currentPlayer === 0) {
        score_jugador[0].textContent++;
    } else {
        score_jugador[1].textContent++;
    }
    ganarPartida();
}

function ganarPartida() {
    const p1Score = parseInt(score_jugador[0].textContent);
    const p2Score = parseInt(score_jugador[1].textContent);

    if (p1Score >= 3 || p2Score >= 3) {
        const winner = currentPlayer === 0 ? p1Name : p2Name;
        // Show winner modal
        infoGanador.textContent = winner;
        if (ganadorSubs.length > 0) {
            ganadorSubs[0].textContent = "¡Has ganado el juego!";
        }
        modalGanador.classList.remove("hidden");
        modalGanador.style.display = "flex";
    } else {
        // Round won but game continues — reset board after brief moment
        restBoard();
        cambiarTurno();
    }
}

/* ── Draw ── */
function mostrarEmpate() {
    modalEmpate.classList.remove("hidden");
    modalEmpate.style.display = "flex";
}

/* ── Modal buttons ── */
// Winner: "Jugar de nuevo" → fully reset game back to setup
btn_info.addEventListener("click", () => {
    modalGanador.style.display = "none";
    modalGanador.classList.add("hidden");
    resetFullGame();
});

// Draw: "Continuar" → reset board only, keep scores
btn_empate.addEventListener("click", () => {
    modalEmpate.style.display = "none";
    modalEmpate.classList.add("hidden");
    restBoard();
    cambiarTurno();
});

/* ── Reiniciar Juego button: full reset → back to setup ── */
reiniciarBtn.addEventListener("click", () => {
    resetFullGame();
});

/* ── Reset helpers ── */
function restBoard() {
    casilla.forEach(cel => { cel.textContent = ""; });
    boardGame.board = ["","","","","","","","",""];
}

function resetScores() {
    score_jugador.forEach(s => { s.textContent = "0"; });
}

function resetFullGame() {
    restBoard();
    resetScores();
    gameBoard.classList.add("hidden");
    setupOverlay.classList.remove("hidden");
    inputP1.value = "";
    inputP2.value = "";
    setupError.textContent = "";
    modalGanador.style.display = "none";
    modalGanador.classList.add("hidden");
    modalEmpate.style.display = "none";
    modalEmpate.classList.add("hidden");
}
