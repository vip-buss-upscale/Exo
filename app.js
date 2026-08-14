document.addEventListener("DOMContentLoaded", () => {
  const boardContainer = document.getElementById("chessboard");
  const resetBtn = document.getElementById("reset-btn");

  // Initial Chessboard Setup (Unicode Chess Pieces)
  const initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
  ];

  let selectedSquare = null;

  function renderBoard() {
    boardContainer.innerHTML = "";
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("button");
        square.classList.add("square");
        
        // Alternate subtle square shading
        if ((row + col) % 2 === 1) {
          square.classList.add("dark-square");
        }

        square.dataset.row = row;
        square.dataset.col = col;
        square.textContent = initialBoard[row][col];

        // Click handler for selection and glow effect
        square.addEventListener("click", () => handleSquareClick(square, row, col));

        boardContainer.appendChild(square);
      }
    }
  }

  function handleSquareClick(square, row, col) {
    // Add glow effect trigger on click
    square.classList.add("glowing");
    setTimeout(() => square.classList.remove("glowing"), 300);

    // Simple click-to-move piece logic
    if (selectedSquare) {
      const prevRow = selectedSquare.dataset.row;
      const prevCol = selectedSquare.dataset.col;

      if (prevRow !== row.toString() || prevCol !== col.toString()) {
        initialBoard[row][col] = initialBoard[prevRow][prevCol];
        initialBoard[prevRow][prevCol] = "";
      }

      selectedSquare.classList.remove("selected");
      selectedSquare = null;
      renderBoard();
    } else if (initialBoard[row][col] !== "") {
      selectedSquare = square;
      square.classList.add("selected");
    }
  }

  resetBtn.addEventListener("click", () => {
    location.reload();
  });

  renderBoard();
});