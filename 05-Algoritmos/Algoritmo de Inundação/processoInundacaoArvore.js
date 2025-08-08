// //Função que cria a estrutura de dados em matriz para o algoritmo de inundação
// // e verifica se os valores inseridos são válidos

// function main(ocorrencias) {
//   for (let i = 1; i < ocorrencias; i++) {
//     const CreateGrid = (
//       line,
//       columm,
//       elementGrid = Math.floor(Math.random() * 2)
//     ) => {
//       // Verifica se os valores são válidos
//       if (
//         typeof line !== "number" ||
//         typeof columm !== "number" ||
//         line <= 0 ||
//         columm <= 0
//       ) {
//         throw new Error("Valores inválidos, tente novamente");
//       }

//       // Cria a matriz
//       const grid = Array.from({ length: line }, () =>
//         Array.from({ length: columm }, () => elementGrid)
//       );

//       return grid;
//     };
//     const grid1 = CreateGrid(5, 5);
//     console.log(grid1);

//    //Função que percorre a matriz
//    function percorreMatriz(grid) {
//       for (let i = 0; i < grid.length; i++) {
//         for (let j = 0; j < grid[i].length; j++) {
//           console.log(`Elemento na posição [${i}][${j}]: ${grid[i][j]}`);
//         }
//       }
//     }

//   }
// }

// main(4);







function Main(customElement = null) {
  class Grid {
    constructor(line, collum, elementGrid = null) {
      if (
        typeof line !== "number" ||
        typeof collum !== "number" ||
        line <= 0 ||
        collum <= 0
      ) {
        throw new Error("Valores inválidos, tente novamente!");
      }
      this.line = line;
      this.collum = collum;
      // Se customElement for fornecido, usa ele, senão usa aleatório 0 ou 1 (true/false)
      this.grid = Array.from({ length: line }, () =>
        Array.from({ length: collum }, () => {
          if (customElement !== null) {
            return customElement;
          }
          const val = Math.floor(Math.random() * 2);
          return val === 0 ? true : false;
        })
      );
    }

    percorreMatriz() {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          console.log(`Elemento na posição [${i}][${j}]: ${this.grid[i][j]}`);
        }
      }
    }
  }

  // Exemplo de uso:
  const gridObj = new Grid(5, 5, customElement);
  gridObj.percorreMatriz();

  return console.log(gridObj.grid);
}

// Para usar elementos personalizados, passe como argumento, por exemplo:
Main(7); // Todos os elementos serão 7
// Ou para manter aleatório, chame sem argumentos:
Main();
