const cloneBoard = (board) => {
  return [...board]
}

function checkSquare(board, row, column, value){
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++){
    for (var c = 0; c < 3; c++){
      if (board[boxRow + r][boxCol + c] === value)
        return false;
    }
  }

  return true;
};

function checkRow(board, row, value){
  for(var i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
          return false;
      }
  }

  return true;
}

function checkColumn(board, column, value){
  for(var i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
          return false;
      }
  }

  return true;
};

const isPossibleCandidate = (board, row, col, candidate) => {
  if(checkRow(board, row, candidate) &&
    checkColumn(board, col, candidate) &&
    checkSquare(board, row, col, candidate)) {
      return true;
  }

  return false;
}

const checkAllChecks = (board, boardInitial, row, col, candidate) => {
  if(boardInitial[row][col] === 0 && isPossibleCandidate(board, row, col, candidate)) {
    return true
  }

  return false
}

const cost = (board) => {
  let myCost = 0

  board.forEach((row) => {
    row.forEach((col) => {
      if(col === 0) {
        myCost++
      }
    })
  })

  // console.log(myCost)
  return myCost
}

const mutation = (board, initialBoard) => {
  const row = Math.floor(Math.random() * (8 - 0 + 1) + 0)
  const col = Math.floor(Math.random() * (8 - 0 + 1) + 0)
  const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1)

  if(checkAllChecks(board, initialBoard, row, col, candidate)) {
    board[row][col] = candidate
  }
}

const initialBoard = [
  [4,0,0,6,0,0,1,2,3],
  [0,0,0,0,0,2,0,7,0],
  [0,0,1,0,3,0,9,0,6],
  [7,0,0,9,2,8,0,0,0],
  [9,1,6,0,0,0,3,8,2],
  [0,0,0,3,6,1,0,0,4],
  [5,0,8,0,1,0,6,0,0],
  [0,9,0,8,0,0,0,0,0],
  [1,2,4,0,0,6,0,0,7]
]

const createRandomSolution = (board, initialBoard) => {
  for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++) {
      const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1)
      if(checkAllChecks(board, initialBoard, row, col, candidate)) {
        board[row][col] = candidate
      }
    }
  }

  return board
}

class GeneticSudokuSolver {
  constructor(board) {
    this.populationSize = 100;
    this.mutationProbability = 0.2;
    this.elitism = 0.2;
    this.generationNumbers = 500;
    this.board = board;
  }

  execute() {
    let population = []
    const board = cloneBoard(this.board)
    for(let i = 0; i < this.populationSize; i++) {
      population.push(createRandomSolution(board, this.board))
    }
    console.log({ teste: JSON.stringify(population) })

    const elitismNumber = this.elitism * this.populationSize

    for(let i = 0; i < this.generationNumbers; i++) {
      population.sort((a, b) => {
        return cost(a) - cost(b)
      })

      population = population.splice(0, elitismNumber);
      while(population.length < this.populationSize) {
          population.push(mutation(board, this.board))
      }
    }
    population.sort((a, b) => {
      return a - b
    })

    return population[0]
  }
}

const solver = new GeneticSudokuSolver(initialBoard)
solver.execute()