# Tic Tac Toe Tournament 🎮

A modern, responsive web-based Tic Tac Toe game featuring a 5-round tournament mode where two players can compete against each other.

## Features ✨

- **Two-Player Gameplay** – Challenge a friend on the same device
- **5-Round Tournament** – Track scores across multiple matches
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** – Clean, intuitive interface with smooth animations
- **Custom Player Names** – Personalize your gaming experience
- **Score Tracking** – Keep track of wins and draws throughout the tournament
- **Game Status Display** – Real-time updates on current player, round number, and scores
- **Winning Highlight** – Winning moves are highlighted in green for clarity

## Game Rules 📋

- Two players take turns marking spaces on a 3×3 grid
- Player 1 is X, Player 2 is O
- The first player to get three marks in a row (horizontally, vertically, or diagonally) wins the match
- If all 9 squares are filled with no winner, the game is a draw
- The tournament consists of 5 matches
- Players alternate who goes first each match
- The player with the most wins after 5 matches wins the tournament

## How to Play 🕹️

1. Click **"Start Game"** on the intro screen
2. Enter player names (optional – defaults to "Player One" and "Player Two")
3. Click **"Begin Match"** to start
4. Players take turns clicking empty squares to place their marks
5. The game announces the winner or draw after each match
6. After 5 rounds, the tournament results are displayed
7. Click **"Let's Play Again!"** to start a new tournament or **"End Game"** to return to the menu

## Technologies Used 🛠️

- **HTML5** – Semantic markup
- **CSS3** – Modern styling with CSS variables and flexbox/grid
- **JavaScript (ES6+)** – Game logic with factory pattern and module pattern
- **Google Fonts** – Fredoka and Orbitron fonts for modern typography
- **Material Icons** – Icon library for UI elements

## Project Structure 📁

```
tic-tac-toe-web/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── script.js           # Game logic (Gameboard, GameController, DisplayController)
├── README.md           # This file
└── assets/             # (Optional) Images, icons, etc.
```

## Architecture 🏗️

The project follows a clean, modular architecture using the **Factory Pattern** and **IIFE (Module Pattern)**:

### Gameboard (IIFE Factory)
- Manages the 3×3 board array
- Handles move placement and win detection
- Provides methods: `placeMove()`, `checkWin()`, `getFreeCells()`, `isFull()`, `reset()`

### GameController (IIFE Factory)
- Controls game flow and turn management
- Tracks rounds and tournament scores
- Manages game state (current player, round number, scores)
- Provides methods: `playMove()`, `nextRound()`, `resetTournament()`, etc.

### DisplayController (IIFE Factory)
- Handles all DOM manipulation and UI updates
- Renders the game board
- Manages modal displays and event listeners
- Keeps all DOM queries encapsulated
- Provides methods: `renderBoard()`, `updateDisplay()`, `showRoundResult()`

**Benefits:**
- ✅ Minimal global code
- ✅ Clear separation of concerns
- ✅ Easy to maintain and extend
- ✅ Game logic separate from display logic

## How to Run 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/SenatorCode/Tic-Tac-Toe-web.git
   cd Tic-Tac-Toe-web
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. Start playing!

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements 🚀

- [ ] Single-player mode with AI opponent
- [ ] Difficulty levels for AI
- [ ] Game statistics and leaderboard
- [ ] Sound effects and animations
- [ ] Local storage for game history
- [ ] Multiplayer online mode
- [ ] Theme customization (dark mode, custom colors)

## Made By 👨‍💻

**[SenatorCode](https://github.com/SenatorCode)**

## Repository 📦

[GitHub - Tic-Tac-Toe-web](https://github.com/SenatorCode/Tic-Tac-Toe-web)

## License 📄

This project is open source and available under the MIT License.

---

**Enjoy the game! Feel free to fork, contribute, or suggest improvements.** 🎉