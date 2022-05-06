const createSolution = () => {}

const cost = () => {}

const crossover = () => {}

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
    for(let i = 0; i < this.populationSize; i++) {
      population.add(createSolution())
    }

    const elitismNumber = this.elitism * this.populationSize

    for(let i = 0; i < this.generationNumbers; i++) {
      population.sort((a, b) => {
        return cost(a) - cost(b)
      })

      population = population.splice(0, elitismNumber);
      while(subList.length < this.populationSize) {
          const nextInt = Math.floor(Math.random() * elitismNumber)
          population.add(mutation(population[nextInt]))
        // if(new Math.random() < this.mutationProbability) {
        //   const nextInt = Math.floor(Math.random() * elitismNumber)
        //   population.add(mutation(population[nextInt]))
        // } else {
        //   const c1 = Math.floor(Math.random() * elitismNumber)
        //   const c2 = Math.floor(Math.random() * elitismNumber)
        //   population.add(crossover(population[c1], population[c2]))
        // }
      }
    }
    population.sort((a, b) => {
      return a - b
    })
    return population[0]
  }
}