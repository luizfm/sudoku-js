function SudokuSolver() {
  var puzzle_table = [];
  let recursiveCalls = 0
  /*
  * Check if the number is a legal candidate
  * for the given cell (by Sudoku rules).
  */
  function check_candidate(num, row, col) {
    for (var i = 0; i < 9; i++) {
      var b_index = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
      if (num == puzzle_table[(row * 9) + i] ||
        num == puzzle_table[col + (i * 9)] ||
        num == puzzle_table[b_index]) {
        return false;
      }
    }
    return true;
  }
  /*
  * Recursively test all possible numbers for a given cell until
  * the puzzle is solved.
  */
  function get_candidate(index) {
    recursiveCalls++
    if (index >= puzzle_table.length) {
      return true;
    } else if (puzzle_table[index] != 0) {
      return get_candidate(index + 1);
    }

    for (var i = 1; i <= 9; i++) {
      if (check_candidate(i, Math.floor(index / 9), index % 9)) {
        puzzle_table[index] = i;
        if (get_candidate(index + 1)) {
          return true;
        }
      }
    }

    puzzle_table[index] = 0;
    return false;
  }
  /*
  * Split result of puzzle into chunks by 9.
  */
  function chunk_in_groups(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i += 9) {
      result.push(arr.slice(i, i + 9));
    }
    console.log(`This function was called: ${recursiveCalls}`)
    return result;
  }
  /*
  * Start solving the game for provided puzzle and options.
  */
  this.solve = function (puzzle, options) {
    options = options || {};
    var result = options.result || 'string';
    puzzle_table = puzzle.split('').map(function (v) { return isNaN(v) ? 0 : +v });

    if (puzzle.length !== 81) return 'Puzzle is not valid.'
    return !get_candidate(0)
            ? 'No solution found.'
            : result === 'chunks'
              ? chunk_in_groups(puzzle_table)
              : result === 'array'
                ? puzzle_table
                : puzzle_table.join('');
  }
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = SudokuSolver;
  }
  exports.SudokuSolver = SudokuSolver;
} else {
  window.SudokuSolver = SudokuSolver;
}

var solver = new SudokuSolver()

var puzzle = '200000035050019640000040700000002060040081590009750000900800000000020080005000003'
var puzzleFromFile = '400600123000002070001030906700928000916000382000361004508010600090800000124006007'

console.log(solver.solve(puzzleFromFile, { result: 'chunks' }))