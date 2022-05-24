const cloneBoard = (board) => {
  return board.map((row) => row.map((col) => col));
};

function checkSquare(board, row, column, value) {
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}

function checkRow(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

const isPossibleCandidate = (board, row, col, candidate) => {
  if (
    checkRow(board, row, candidate) &&
    checkColumn(board, col, candidate) &&
    checkSquare(board, row, col, candidate)
  ) {
    return true;
  }

  return false;
};

const checkAllChecks = (board, boardInitial, row, col, candidate) => {
  if (
    boardInitial[row][col] === 0 &&
    isPossibleCandidate(board, row, col, candidate)
  ) {
    return true;
  }

  return false;
};

const cost = (board) => {
  let myCost = 0;
  board.forEach((row) => {
    row.forEach((col) => {
      if (col === 0) {
        myCost++;
      }
    });
  });

  return myCost;
};

const mutation = (board, initialBoard) => {
  const exampleBoard = cloneBoard(board);
  const row = Math.floor(Math.random() * (8 - 0 + 1) + 0);
  const col = Math.floor(Math.random() * (8 - 0 + 1) + 0);
  const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  if (checkAllChecks(board, initialBoard, row, col, candidate)) {
    exampleBoard[row][col] = candidate;
    return {
      board: exampleBoard,
      mutated: true,
    };
  }

  return {
    board: null,
    mutated: false,
  };
};

const initialBoard = [
  [4, 0, 0, 6, 0, 0, 1, 2, 3],
  [0, 0, 0, 0, 0, 2, 0, 7, 0],
  [0, 0, 1, 0, 3, 0, 9, 0, 6],
  [7, 0, 0, 9, 2, 8, 0, 0, 0],
  [9, 1, 6, 0, 0, 0, 3, 8, 2],
  [0, 0, 0, 3, 6, 1, 0, 0, 4],
  [5, 0, 8, 0, 1, 0, 6, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [1, 2, 4, 0, 0, 6, 0, 0, 7],
];

const createRandomSolution = (board, initialBoard) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1);
      if (checkAllChecks(board, initialBoard, row, col, candidate)) {
        board[row][col] = candidate;
      }
    }
  }
  return board;
};

// Genetico
// Busca Tabu
// Simulated Anealing
// Hill clibimng

class GeneticSudokuSolver {
  constructor(board) {
    this.populationSize = 300;
    // this.mutationProbability = 0.2;
    this.elitism = 0.4;
    this.generationNumbers = 3000;
    this.board = board;
  }

  execute() {
    let population = [];
    let currentGeneration = 0;
    for (let i = 0; i < this.populationSize; i++) {
      const board = cloneBoard(this.board);
      population.push(createRandomSolution(board, initialBoard));
    }

    const elitismNumber = this.elitism * this.populationSize;

    for (let i = 0; i < this.generationNumbers; i++) {
      currentGeneration++;
      population.sort((a, b) => {
        return cost(a) - cost(b);
      });

      if (cost(population[0]) === 0) {
        return {
          board: population[0],
          cost: cost(population[0]),
          currentGeneration,
        };
      }

      population = population.slice(0, elitismNumber);
      while (population.length < this.populationSize) {
        const m = Math.floor(Math.random() * elitismNumber);
        const clonedSolution = cloneBoard(population[m]);
        const { board, mutated } = mutation(clonedSolution, initialBoard);

        if (mutated) {
          population.push(board, initialBoard);
        } else {
          population.push(undefined);
        }
      }
    }

    population.sort((a, b) => {
      return cost(a) - cost(b);
    });

    return {
      board: population[0],
      cost: cost(population[0]),
      currentGeneration,
    };
  }
}

const solver = new GeneticSudokuSolver(initialBoard);
const finalResults = solver.execute();
console.log(finalResults);
