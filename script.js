// ===== GAMEBOARD OBJECT (Factory Pattern) =====
const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const getBoard = () => [...board];

    const placeMove = (index, playerChoice) => {
        if (board[index] === null) {
            board[index] = playerChoice;
            return true;
        }
        return false;
    };

    const checkWin = (playerChoice) => {
        for (let pattern of winPatterns) {
            if (board[pattern[0]] === playerChoice && 
                board[pattern[1]] === playerChoice && 
                board[pattern[2]] === playerChoice) {
                return { won: true, pattern };
            }
        }
        return { won: false };
    };

    const getFreeCells = () => {
        let cells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) cells.push(i);
        }
        return cells;
    };

    const isFull = () => getFreeCells().length === 0;

    const reset = () => {
        board = [null, null, null, null, null, null, null, null, null];
    };

    return {
        getBoard,
        placeMove,
        checkWin,
        getFreeCells,
        isFull,
        reset
    };
})();

// ===== GAME CONTROLLER OBJECT (Factory Pattern, IIFE) =====
const GameController = (() => {
    let player1, player2;
    let currentPlayer;
    let currentRound = 1;
    const totalRounds = 5;
    let scores = { player1: 0, player2: 0, draws: 0 };
    let gameActive = true;

    const setPlayers = (p1Name, p2Name) => {
        player1 = { name: p1Name, choice: "x" };
        player2 = { name: p2Name, choice: "o" };
        currentPlayer = player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const getPlayer1 = () => player1;

    const getPlayer2 = () => player2;

    const playMove = (index) => {
        if (!gameActive || !Gameboard.placeMove(index, currentPlayer.choice)) {
            return null;
        }

        const player1Win = Gameboard.checkWin(player1.choice);
        const player2Win = Gameboard.checkWin(player2.choice);

        if (player1Win.won) {
            scores.player1++;
            gameActive = false;
            return { winner: player1.name, roundOver: true, pattern: player1Win.pattern };
        }

        if (player2Win.won) {
            scores.player2++;
            gameActive = false;
            return { winner: player2.name, roundOver: true, pattern: player2Win.pattern };
        }

        if (Gameboard.isFull()) {
            scores.draws++;
            gameActive = false;
            return { winner: null, draw: true, roundOver: true };
        }

        switchTurn();
        return { winner: null, roundOver: false };
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const nextRound = () => {
        if (currentRound < totalRounds) {
            currentRound++;
            resetRound();
            return true;
        }
        return false;
    };

    const resetRound = () => {
        Gameboard.reset();
        currentPlayer = player1;
        gameActive = true;
    };

    const resetTournament = () => {
        currentRound = 1;
        scores = { player1: 0, player2: 0, draws: 0 };
        resetRound();
    };

    const getCurrentRound = () => currentRound;

    const getTotalRounds = () => totalRounds;

    const getScores = () => ({ ...scores });

    const getTournamentWinner = () => {
        if (scores.player1 > scores.player2) return player1.name;
        if (scores.player2 > scores.player1) return player2.name;
        return null;
    };

    return {
        setPlayers,
        getCurrentPlayer,
        getPlayer1,
        getPlayer2,
        playMove,
        switchTurn,
        nextRound,
        resetRound,
        resetTournament,
        getCurrentRound,
        getTotalRounds,
        getScores,
        getTournamentWinner
    };
})();

// ===== DISPLAY CONTROLLER OBJECT (Factory Pattern, IIFE) =====
const DisplayController = (() => {
    const setupSection = document.querySelector("#setupSection");
    const startBtn = document.querySelector("#startBtn");
    const introSection = document.querySelector("#introSection");
    const backToIntroBtn = document.querySelector("#backToIntroBtn");
    const beginBtn = document.querySelector("#beginBtn");
    const player1NameInput = document.querySelector("#player1Name");
    const player2NameInput = document.querySelector("#player2Name");
    const gameSection = document.querySelector("#gameSection");
    const player1Status = document.querySelector("#player1Status");
    const player2Status = document.querySelector("#player2Status");
    const player1StatusName = document.querySelector("#player1StatusName");
    const player2StatusName = document.querySelector("#player2StatusName");
    const turnInfo = document.querySelector("#turnInfo");
    const gameBoard = document.querySelector("#gameBoard");
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.querySelector("#restartBtn");
    const editNamesBtn = document.querySelector("#editNamesBtn");
    const roundInfo = document.querySelector("#roundInfo");
    const resultsSection = document.querySelector("#resultsSection");
    const resultContainer = document.querySelector("#resultContainer");
    const playAgainBtn = document.querySelector("#playAgainBtn");
    const changePlayersBtn = document.querySelector("#changePlayersBtn");
    const helpBtn = document.querySelector("#helpBtn");
    const helpModal = document.querySelector("#helpModal");
    const closeHelpBtn = document.querySelector("#closeHelpBtn");
    const closeHelpBtnBottom = document.querySelector("#closeHelpBtnBottom");
    const tournamentModal = document.querySelector("#tournamentModal");
    const closeTournamentBtn = document.querySelector("#closeTournamentBtn");
    const playAgainTournamentBtn = document.querySelector("#playAgainTournamentBtn");
    const endGameBtn = document.querySelector("#endGameBtn");

    const switchSection = (hideSection, showSection) => {
        hideSection.classList.remove("active");
        showSection.classList.add("active");
    };

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index] ? board[index].toUpperCase() : "";
            cell.className = "cell";

            if (board[index] === GameController.getPlayer1().choice) {
                cell.classList.add("x");
            } else if (board[index] === GameController.getPlayer2().choice) {
                cell.classList.add("o");
            }
        });
    };

    const updateDisplay = () => {
        const player1 = GameController.getPlayer1();
        const player2 = GameController.getPlayer2();
        const currentPlayer = GameController.getCurrentPlayer();

        player1StatusName.textContent = player1.name;
        player2StatusName.textContent = player2.name;

        if (currentPlayer === player1) {
            player1Status.classList.add("active");
            player2Status.classList.remove("active");
            turnInfo.textContent = `↻ Current Turn: ${player1.name} (${player1.choice.toUpperCase()})`;
        } else {
            player1Status.classList.remove("active");
            player2Status.classList.add("active");
            turnInfo.textContent = `↻ Current Turn: ${player2.name} (${player2.choice.toUpperCase()})`;
        }

        roundInfo.textContent = `Round ${GameController.getCurrentRound()} of ${GameController.getTotalRounds()}`;
    };

    const showRoundResult = (status) => {
        const player1 = GameController.getPlayer1();
        const player2 = GameController.getPlayer2();
        const scores = GameController.getScores();
        const board = Gameboard.getBoard();

        const resultHTML = `
            <h2 class="result-title ${status.winner ? 'winner' : 'draw'}">
                ${status.winner ? `Victory! ${status.winner} Wins!` : `It's a Draw!`}
            </h2>
            <p class="result-subtitle">
                ${status.winner ? 'Congratulations on a perfect match!' : 'No winner this time. Both players played well.'}
            </p>
            <div class="board-result">
                ${board.map((cell, idx) => `
                    <div class="cell-result ${cell ? cell : ''} ${status.pattern && status.pattern.includes(idx) ? 'winner' : ''}">
                        ${cell ? cell.toUpperCase() : ''}
                    </div>
                `).join('')}
            </div>
            <div class="score-board">
                <div class="score-item">
                    <div class="score-label">${player1.name} (X)</div>
                    <div class="score-value">${scores.player1}</div>
                </div>
                <div class="score-item">
                    <div class="score-label">Draws</div>
                    <div class="score-value">${scores.draws}</div>
                </div>
                <div class="score-item">
                    <div class="score-label">${player2.name} (O)</div>
                    <div class="score-value">${scores.player2}</div>
                </div>
            </div>
            <div class="button-group" style="margin-top: 2rem;">
                <button class="btn btn-primary" id="nextRoundBtn">Next Round →</button>
            </div>
        `;

        resultContainer.innerHTML = resultHTML;
        switchSection(gameSection, resultsSection);

        document.querySelector("#nextRoundBtn").addEventListener("click", () => {
            if (GameController.nextRound()) {
                switchSection(resultsSection, gameSection);
                renderBoard();
                updateDisplay();
            } else {
                showTournamentResults();
            }
        });
    };

    const showTournamentResults = () => {
        const player1 = GameController.getPlayer1();
        const player2 = GameController.getPlayer2();
        const scores = GameController.getScores();
        const winner = GameController.getTournamentWinner();

        const tournamentHTML = `
            <div style="text-align: center;">
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: #004E89;">
                    ${winner ? `🏆 ${winner} Wins the Tournament! 🏆` : '🤝 Tournament is a Tie!'}
                </h3>
                <div class="tournament-results">
                    <div class="result-item ${scores.player1 > scores.player2 ? 'winner' : ''}">
                        <p><span class="label">${player1.name} (X):</span> <span class="value"zzz>${scores.player1}</span> Wins</p>
                    </div>
                    <div class="result-item">
                        <p><span class="label">Draws:</span> <span class="value">${scores.draws}</span></p>
                    </div>
                    <div class="result-item ${scores.player2 > scores.player1 ? 'winner' : ''}">
                        <p><span class="label">${player2.name} (O):</span> <span class="value">${scores.player2}</span> Wins</p>
                    </div>
                </div>
            </div>
        `;

        document.querySelector("#tournamentResults").innerHTML = tournamentHTML;
        tournamentModal.classList.add("active");
    };

    const highlightWinner = (pattern) => {
        pattern.forEach(idx => {
            cells[idx].classList.add("winner");
        });
    };

    const clearWinnerHighlight = () => {
        cells.forEach(cell => cell.classList.remove("winner"));
    };

    const addEventListeners = () => {
        startBtn.addEventListener("click", () => {
            switchSection(introSection, setupSection);
        });

        backToIntroBtn.addEventListener("click", () => {
            switchSection(setupSection, introSection);
        });

        beginBtn.addEventListener("click", () => {
            const p1Name = player1NameInput.value || "Player One";
            const p2Name = player2NameInput.value || "Player Two";
            GameController.setPlayers(p1Name, p2Name);
            GameController.resetRound();
            switchSection(setupSection, gameSection);
            renderBoard();
            updateDisplay();
        });

        cells.forEach(cell => {
            cell.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                clearWinnerHighlight();
                const status = GameController.playMove(index);

                if (status) {
                    renderBoard();
                    
                    if (status.roundOver) {
                        if (status.pattern) {
                            highlightWinner(status.pattern);
                        }
                        setTimeout(() => {
                            showRoundResult(status);
                        }, 500);
                    } else {
                        updateDisplay();
                    }
                }
            });
        });

        restartBtn.addEventListener("click", () => {
            GameController.resetTournament();
            renderBoard();
            updateDisplay();
        });

        editNamesBtn.addEventListener("click", () => {
            const player1 = GameController.getPlayer1();
            const player2 = GameController.getPlayer2();
            switchSection(gameSection, setupSection);
            player1NameInput.value = player1.name;
            player2NameInput.value = player2.name;
        });

        playAgainBtn.addEventListener("click", () => {
            GameController.resetTournament();
            renderBoard();
            updateDisplay();
            switchSection(resultsSection, gameSection);
        });

        changePlayersBtn.addEventListener("click", () => {
            GameController.resetTournament();
            switchSection(resultsSection, setupSection);
        });

        helpBtn.addEventListener("click", () => {
            helpModal.classList.add("active");
        });

        closeHelpBtn.addEventListener("click", () => {
            helpModal.classList.remove("active");
        });

        closeHelpBtnBottom.addEventListener("click", () => {
            helpModal.classList.remove("active");
        });

        helpModal.addEventListener("click", (e) => {
            if (e.target === helpModal) {
                helpModal.classList.remove("active");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                helpModal.classList.remove("active");
                tournamentModal.classList.remove("active");
            }
        });

        closeTournamentBtn.addEventListener("click", () => {
            tournamentModal.classList.remove("active");
            switchSection(resultsSection, introSection);
        });

        playAgainTournamentBtn.addEventListener("click", () => {
            tournamentModal.classList.remove("active");
            GameController.resetTournament();
            renderBoard();
            updateDisplay();
            switchSection(resultsSection, gameSection);
        });

        endGameBtn.addEventListener("click", () => {
            tournamentModal.classList.remove("active");
            GameController.resetTournament();
            switchSection(resultsSection, introSection);
        });
    };

    return addEventListeners;
})();

// ===== INITIALIZE GAME =====
DisplayController();