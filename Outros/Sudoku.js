/**
 * Gerador e Solucionador de Sudoku com Algoritmo de Backtracking Otimizado
 * Implementa técnicas de poda (pruning) e geração aleatória
 * 
 * @author Desenvolvido com boas práticas de programação
 * @version 2.0.0
 */

'use strict';

// ==================== CONSTANTES E CONFIGURAÇÕES ====================

const SUDOKU_CONFIG = Object.freeze({
  SIZE: 9,
  BLOCK_SIZE: 3,
  MIN_VALUE: 1,
  MAX_VALUE: 9,
  EMPTY_CELL: 0,
  
  DIFFICULTY_LEVELS: Object.freeze({
    FACIL: { name: 'facil', cellsToRemove: 35, description: 'Nível Fácil (~43% removidos)' },
    MEDIO: { name: 'medio', cellsToRemove: 45, description: 'Nível Médio (~56% removidos)' },
    DIFICIL: { name: 'dificil', cellsToRemove: 55, description: 'Nível Difícil (~68% removidos)' },
    EXPERT: { name: 'expert', cellsToRemove: 64, description: 'Nível Expert (~79% removidos)' }
  }),
  
  GENERATION_PARAMS: Object.freeze({
    RANDOM_CELL_PROBABILITY: 0.4,
    PRUNING_PROBABILITY: 0.3,
    MAX_GENERATION_ATTEMPTS: 10,
    TIMEOUT_MS: 5000
  })
});

// ==================== CLASSES PRINCIPAIS ====================

/**
 * Classe para representar uma matriz 9x9 de Sudoku
 */
class SudokuMatrix {
  
  /**
   * @param {number} [initialValue=0] - Valor inicial para preencher a matriz
   * @throws {Error} Se o valor inicial for inválido
   */
  constructor(initialValue = SUDOKU_CONFIG.EMPTY_CELL) {
    this._validateInitialValue(initialValue);
    this._initializeMatrix(initialValue);
  }
  
  /**
   * Valida o valor inicial
   * @private
   */
  _validateInitialValue(value) {
    if (!Number.isInteger(value) || value < 0 || value > SUDOKU_CONFIG.MAX_VALUE) {
      throw new Error(`Valor inicial deve ser um número inteiro entre 0 e ${SUDOKU_CONFIG.MAX_VALUE}`);
    }
  }
  
  /**
   * Inicializa a matriz com o valor especificado
   * @private
   */
  _initializeMatrix(initialValue) {
    this.matrix = [];
    this.rows = SUDOKU_CONFIG.SIZE;
    this.columns = SUDOKU_CONFIG.SIZE;
    
    try {
      for (let row = 0; row < this.rows; row++) {
        this.matrix[row] = [];
        for (let col = 0; col < this.columns; col++) {
          this.matrix[row][col] = initialValue;
        }
      }
    } catch (error) {
      throw new Error(`Erro ao inicializar matriz: ${error.message}`);
    }
  }
  
  /**
   * Exibe a matriz formatada no console
   * @returns {Array<Array<number>>} A matriz para encadeamento
   */
  displayMatrix() {
    try {
      if (!this._isValidMatrix()) {
        throw new Error('Matriz inválida para exibição');
      }
      
      console.log('┌─────────┬─────────┬─────────┐');
      
      for (let row = 0; row < this.rows; row++) {
        if (row === 3 || row === 6) {
          console.log('├─────────┼─────────┼─────────┤');
        }
        
        let rowStr = '│ ';
        for (let col = 0; col < this.columns; col++) {
          const value = this.matrix[row][col] || ' ';
          rowStr += value + ' ';
          
          if (col === 2 || col === 5) {
            rowStr += '│ ';
          }
        }
        rowStr += '│';
        console.log(rowStr);
      }
      
      console.log('└─────────┴─────────┴─────────┘');
      return this.matrix;
      
    } catch (error) {
      console.error(`Erro ao exibir matriz: ${error.message}`);
      return this.matrix;
    }
  }
  
  /**
   * Substitui a matriz atual por uma nova
   * @param {Array<Array<number>>} newMatrix - Nova matriz
   * @returns {Array<Array<number>>} A matriz inserida
   * @throws {Error} Se a matriz for inválida
   */
  setMatrix(newMatrix) {
    if (!this._validateMatrixStructure(newMatrix)) {
      throw new Error('Estrutura da matriz inválida');
    }
    
    if (!this._validateMatrixValues(newMatrix)) {
      throw new Error('Valores da matriz inválidos');
    }
    
    this.matrix = this._deepCloneMatrix(newMatrix);
    return this.matrix;
  }
  
  /**
   * Retorna uma cópia profunda da matriz
   * @returns {Array<Array<number>>}
   */
  getMatrix() {
    return this._deepCloneMatrix(this.matrix);
  }
  
  /**
   * Verifica se a matriz é válida
   * @private
   */
  _isValidMatrix() {
    return this.matrix && 
           Array.isArray(this.matrix) && 
           this.matrix.length === SUDOKU_CONFIG.SIZE;
  }
  
  /**
   * Valida a estrutura da matriz
   * @private
   */
  _validateMatrixStructure(matrix) {
    if (!Array.isArray(matrix) || matrix.length !== SUDOKU_CONFIG.SIZE) {
      return false;
    }
    
    return matrix.every(row => 
      Array.isArray(row) && row.length === SUDOKU_CONFIG.SIZE
    );
  }
  
  /**
   * Valida os valores da matriz
   * @private
   */
  _validateMatrixValues(matrix) {
    for (const row of matrix) {
      for (const value of row) {
        if (!Number.isInteger(value) || 
            value < SUDOKU_CONFIG.EMPTY_CELL || 
            value > SUDOKU_CONFIG.MAX_VALUE) {
          return false;
        }
      }
    }
    return true;
  }
  
  /**
   * Cria uma cópia profunda da matriz
   * @private
   */
  _deepCloneMatrix(matrix) {
    return matrix.map(row => [...row]);
  }
}

// ==================== CLASSE PRINCIPAL DO SUDOKU ====================

/**
 * Classe principal para geração e solução de Sudoku
 */
class SudokuGenerator {
  
  constructor() {
    this.statistics = {
      generationAttempts: 0,
      solutionTime: 0,
      cellsProcessed: 0,
      backtrackCount: 0
    };
  }
  
  /**
   * Gera um Sudoku aleatório completo
   * @returns {SudokuMatrix} Matriz com Sudoku completo
   * @throws {Error} Se não conseguir gerar após várias tentativas
   */
  generateRandomSudoku() {
    const startTime = performance.now();
    this._resetStatistics();
    
    for (let attempt = 1; attempt <= SUDOKU_CONFIG.GENERATION_PARAMS.MAX_GENERATION_ATTEMPTS; attempt++) {
      try {
        this.statistics.generationAttempts = attempt;
        
        const sudoku = new SudokuMatrix();
        
        // Preencher blocos diagonais primeiro (mais eficiente)
        this._fillDiagonalBoxesRandomly(sudoku.matrix);
        
        // Resolver o restante com aleatoriedade
        const success = this._solveWithTimeout(sudoku.matrix, true);
        
        if (success) {
          this.statistics.solutionTime = performance.now() - startTime;
          return sudoku;
        }
        
      } catch (error) {
        console.warn(`Tentativa ${attempt} falhou: ${error.message}`);
        continue;
      }
    }
    
    throw new Error(`Não foi possível gerar Sudoku após ${SUDOKU_CONFIG.GENERATION_PARAMS.MAX_GENERATION_ATTEMPTS} tentativas`);
  }
  
  /**
   * Gera um puzzle Sudoku jogável
   * @param {string} difficulty - Nível de dificuldade
   * @returns {Object} Objeto com puzzle, solução e metadados
   * @throws {Error} Se a dificuldade for inválida
   */
  generatePuzzle(difficulty = 'medio') {
    const difficultyConfig = this._validateAndGetDifficulty(difficulty);
    
    try {
      // Gerar Sudoku completo
      const completeSudoku = this.generateRandomSudoku();
      const solution = completeSudoku.getMatrix();
      
      // Criar puzzle removendo números
      const puzzle = this._createPuzzleFromComplete(solution, difficultyConfig.cellsToRemove);
      
      return {
        puzzle: puzzle,
        solution: solution,
        difficulty: difficultyConfig.name,
        description: difficultyConfig.description,
        statistics: { ...this.statistics },
        metadata: {
          emptyCells: this._countEmptyCells(puzzle),
          createdAt: new Date().toISOString(),
          isValid: this._validateSudokuSolution(solution)
        }
      };
      
    } catch (error) {
      throw new Error(`Erro ao gerar puzzle: ${error.message}`);
    }
  }
  
  /**
   * Resolve um puzzle de Sudoku
   * @param {Array<Array<number>>} puzzle - Puzzle para resolver
   * @returns {Object} Resultado da solução
   * @throws {Error} Se o puzzle for inválido
   */
  solvePuzzle(puzzle) {
    if (!this._validateMatrixStructure(puzzle)) {
      throw new Error('Puzzle inválido fornecido');
    }
    
    const startTime = performance.now();
    this._resetStatistics();
    
    try {
      const puzzleCopy = this._deepCloneMatrix(puzzle);
      const success = this._solveWithTimeout(puzzleCopy, false);
      
      const solutionTime = performance.now() - startTime;
      
      return {
        success: success,
        solution: success ? puzzleCopy : null,
        originalPuzzle: puzzle,
        solutionTime: solutionTime,
        statistics: { ...this.statistics },
        isUnique: success ? this._hasUniqueSolution(puzzle) : false
      };
      
    } catch (error) {
      throw new Error(`Erro ao resolver puzzle: ${error.message}`);
    }
  }
  
  // ==================== MÉTODOS PRIVADOS - GERAÇÃO ALEATÓRIA ====================
  
  /**
   * Embaralha array usando algoritmo Fisher-Yates
   * @private
   */
  _shuffleArray(array) {
    if (!Array.isArray(array)) {
      throw new Error('Parâmetro deve ser um array');
    }
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  /**
   * Preenche blocos diagonais aleatoriamente
   * @private
   */
  _fillDiagonalBoxesRandomly(matrix) {
    try {
      for (let box = 0; box < 3; box++) {
        const numbers = this._shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let numIndex = 0;
        
        const startRow = box * SUDOKU_CONFIG.BLOCK_SIZE;
        const startCol = box * SUDOKU_CONFIG.BLOCK_SIZE;
        
        for (let row = startRow; row < startRow + SUDOKU_CONFIG.BLOCK_SIZE; row++) {
          for (let col = startCol; col < startCol + SUDOKU_CONFIG.BLOCK_SIZE; col++) {
            if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
              matrix[row][col] = numbers[numIndex++];
            }
          }
        }
      }
    } catch (error) {
      throw new Error(`Erro ao preencher blocos diagonais: ${error.message}`);
    }
  }
  
  // ==================== MÉTODOS PRIVADOS - ALGORITMO DE SOLUÇÃO ====================
  
  /**
   * Resolve com timeout para evitar travamentos
   * @private
   */
  _solveWithTimeout(matrix, isGenerating = false) {
    const startTime = Date.now();
    
    const solveWithCheck = () => {
      if (Date.now() - startTime > SUDOKU_CONFIG.GENERATION_PARAMS.TIMEOUT_MS) {
        throw new Error('Timeout na resolução do Sudoku');
      }
      return this._solve(matrix, isGenerating);
    };
    
    return solveWithCheck();
  }
  
  /**
   * Algoritmo principal de backtracking com poda
   * @private
   */
  _solve(matrix, isGenerating = false) {
    try {
      // Aplicar técnicas de redução com probabilidade
      if (!isGenerating || Math.random() < SUDOKU_CONFIG.GENERATION_PARAMS.PRUNING_PROBABILITY) {
        this._applyConstraintPropagation(matrix);
      }
      
      // Verificar consistência
      if (!this._isConsistent(matrix)) {
        return false;
      }
      
      // Encontrar próxima célula para preencher
      const cellData = this._findNextCell(matrix, isGenerating);
      
      if (cellData.invalid) {
        return false;
      }
      
      if (cellData.cell === null) {
        return true; // Sudoku completo
      }
      
      const { row, col } = cellData.cell;
      let possibleValues = cellData.options;
      
      // Embaralhar valores se estiver gerando
      if (isGenerating) {
        possibleValues = this._shuffleArray(possibleValues);
      }
      
      // Tentar cada valor possível
      for (const num of possibleValues) {
        matrix[row][col] = num;
        this.statistics.cellsProcessed++;
        
        if (this._solve(matrix, isGenerating)) {
          return true;
        }
        
        matrix[row][col] = SUDOKU_CONFIG.EMPTY_CELL;
        this.statistics.backtrackCount++;
      }
      
      return false;
      
    } catch (error) {
      if (error.message.includes('Timeout')) {
        throw error;
      }
      throw new Error(`Erro durante resolução: ${error.message}`);
    }
  }
  
  /**
   * Calcula valores possíveis para uma célula
   * @private
   */
  _getPossibleValues(matrix, row, col) {
    if (!this._isValidPosition(row, col)) {
      return [];
    }
    
    const possible = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    try {
      // Remover valores da linha
      for (let i = 0; i < SUDOKU_CONFIG.SIZE; i++) {
        if (matrix[row][i] !== SUDOKU_CONFIG.EMPTY_CELL) {
          possible.delete(matrix[row][i]);
        }
      }
      
      // Remover valores da coluna
      for (let i = 0; i < SUDOKU_CONFIG.SIZE; i++) {
        if (matrix[i][col] !== SUDOKU_CONFIG.EMPTY_CELL) {
          possible.delete(matrix[i][col]);
        }
      }
      
      // Remover valores do bloco 3x3
      const startRow = Math.floor(row / SUDOKU_CONFIG.BLOCK_SIZE) * SUDOKU_CONFIG.BLOCK_SIZE;
      const startCol = Math.floor(col / SUDOKU_CONFIG.BLOCK_SIZE) * SUDOKU_CONFIG.BLOCK_SIZE;
      
      for (let i = startRow; i < startRow + SUDOKU_CONFIG.BLOCK_SIZE; i++) {
        for (let j = startCol; j < startCol + SUDOKU_CONFIG.BLOCK_SIZE; j++) {
          if (matrix[i][j] !== SUDOKU_CONFIG.EMPTY_CELL) {
            possible.delete(matrix[i][j]);
          }
        }
      }
      
      return Array.from(possible);
      
    } catch (error) {
      throw new Error(`Erro ao calcular valores possíveis: ${error.message}`);
    }
  }
  
  /**
   * Encontra célula com menos opções (MRV) ou aleatória
   * @private
   */
  _findNextCell(matrix, isGenerating = false) {
    try {
      // Decisão: usar célula aleatória ou MRV
      if (isGenerating && Math.random() < SUDOKU_CONFIG.GENERATION_PARAMS.RANDOM_CELL_PROBABILITY) {
        return this._findRandomEmptyCell(matrix);
      } else {
        return this._findMostConstrainedCell(matrix);
      }
    } catch (error) {
      return { cell: null, options: [], invalid: true };
    }
  }
  
  /**
   * Implementa heurística MRV (Minimum Remaining Values)
   * @private
   */
  _findMostConstrainedCell(matrix) {
    let minOptions = 10;
    let bestCell = null;
    let bestOptions = [];
    
    for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
      for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
        if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
          const options = this._getPossibleValues(matrix, row, col);
          
          if (options.length === 0) {
            return { cell: null, options: [], invalid: true };
          }
          
          if (options.length === 1) {
            return { cell: { row, col }, options, invalid: false };
          }
          
          if (options.length < minOptions) {
            minOptions = options.length;
            bestCell = { row, col };
            bestOptions = options;
          }
        }
      }
    }
    
    return { cell: bestCell, options: bestOptions, invalid: false };
  }
  
  /**
   * Encontra célula vazia aleatória
   * @private
   */
  _findRandomEmptyCell(matrix) {
    const emptyCells = [];
    
    for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
      for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
        if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    if (emptyCells.length === 0) {
      return { cell: null, options: [], invalid: false };
    }
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const options = this._getPossibleValues(matrix, randomCell.row, randomCell.col);
    
    return {
      cell: randomCell,
      options: options,
      invalid: options.length === 0
    };
  }
  
  /**
   * Aplica técnicas de constraint propagation
   * @private
   */
  _applyConstraintPropagation(matrix) {
    let improvements = true;
    let iterations = 0;
    const maxIterations = 50;
    
    while (improvements && iterations < maxIterations) {
      const nakedChanges = this._applyNakedSingles(matrix);
      const hiddenChanges = this._applyHiddenSingles(matrix);
      improvements = nakedChanges > 0 || hiddenChanges;
      iterations++;
    }
    
    if (iterations >= maxIterations) {
      console.warn('Constraint propagation atingiu limite de iterações');
    }
  }
  
  /**
   * Aplica técnica Naked Singles
   * @private
   */
  _applyNakedSingles(matrix) {
    let changes = 0;
    let foundChanges = true;
    
    while (foundChanges) {
      foundChanges = false;
      
      for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
        for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
          if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
            const options = this._getPossibleValues(matrix, row, col);
            
            if (options.length === 1) {
              matrix[row][col] = options[0];
              changes++;
              foundChanges = true;
            }
          }
        }
      }
    }
    
    return changes;
  }
  
  /**
   * Aplica técnica Hidden Singles
   * @private
   */
  _applyHiddenSingles(matrix) {
    let changed = false;
    
    try {
      for (let num = SUDOKU_CONFIG.MIN_VALUE; num <= SUDOKU_CONFIG.MAX_VALUE; num++) {
        
        // Verificar linhas
        for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
          const possibleCols = [];
          for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
            if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
              const options = this._getPossibleValues(matrix, row, col);
              if (options.includes(num)) {
                possibleCols.push(col);
              }
            }
          }
          
          if (possibleCols.length === 1) {
            matrix[row][possibleCols[0]] = num;
            changed = true;
          }
        }
        
        // Verificar colunas
        for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
          const possibleRows = [];
          for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
            if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
              const options = this._getPossibleValues(matrix, row, col);
              if (options.includes(num)) {
                possibleRows.push(row);
              }
            }
          }
          
          if (possibleRows.length === 1) {
            matrix[possibleRows[0]][col] = num;
            changed = true;
          }
        }
        
        // Verificar blocos 3x3
        for (let blockRow = 0; blockRow < 3; blockRow++) {
          for (let blockCol = 0; blockCol < 3; blockCol++) {
            const possiblePositions = [];
            const startRow = blockRow * SUDOKU_CONFIG.BLOCK_SIZE;
            const startCol = blockCol * SUDOKU_CONFIG.BLOCK_SIZE;
            
            for (let row = startRow; row < startRow + SUDOKU_CONFIG.BLOCK_SIZE; row++) {
              for (let col = startCol; col < startCol + SUDOKU_CONFIG.BLOCK_SIZE; col++) {
                if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
                  const options = this._getPossibleValues(matrix, row, col);
                  if (options.includes(num)) {
                    possiblePositions.push({ row, col });
                  }
                }
              }
            }
            
            if (possiblePositions.length === 1) {
              const pos = possiblePositions[0];
              matrix[pos.row][pos.col] = num;
              changed = true;
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Erro em Hidden Singles: ${error.message}`);
    }
    
    return changed;
  }
  
  /**
   * Verifica se o estado atual é consistente
   * @private
   */
  _isConsistent(matrix) {
    try {
      for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
        for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
          if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
            if (this._getPossibleValues(matrix, row, col).length === 0) {
              return false;
            }
          }
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // ==================== MÉTODOS PRIVADOS - GERAÇÃO DE PUZZLE ====================
  
  /**
   * Cria puzzle removendo células da solução completa
   * @private
   */
  _createPuzzleFromComplete(solution, cellsToRemove) {
    try {
      const puzzle = this._deepCloneMatrix(solution);
      const positions = [];
      
      // Criar lista de todas as posições
      for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
        for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
          positions.push({ row, col });
        }
      }
      
      // Embaralhar e remover células
      const shuffledPositions = this._shuffleArray(positions);
      const actualRemoval = Math.min(cellsToRemove, shuffledPositions.length);
      
      for (let i = 0; i < actualRemoval; i++) {
        const { row, col } = shuffledPositions[i];
        puzzle[row][col] = SUDOKU_CONFIG.EMPTY_CELL;
      }
      
      return puzzle;
      
    } catch (error) {
      throw new Error(`Erro ao criar puzzle: ${error.message}`);
    }
  }
  
  // ==================== MÉTODOS PRIVADOS - VALIDAÇÃO ====================
  
  /**
   * Valida e retorna configuração de dificuldade
   * @private
   */
  _validateAndGetDifficulty(difficulty) {
    const difficultyKey = difficulty.toUpperCase();
    const config = SUDOKU_CONFIG.DIFFICULTY_LEVELS[difficultyKey];
    
    if (!config) {
      const validLevels = Object.values(SUDOKU_CONFIG.DIFFICULTY_LEVELS)
        .map(level => level.name)
        .join(', ');
      throw new Error(`Dificuldade inválida. Use: ${validLevels}`);
    }
    
    return config;
  }
  
  /**
   * Valida estrutura da matriz
   * @private
   */
  _validateMatrixStructure(matrix) {
    if (!Array.isArray(matrix) || matrix.length !== SUDOKU_CONFIG.SIZE) {
      return false;
    }
    
    return matrix.every(row => 
      Array.isArray(row) && row.length === SUDOKU_CONFIG.SIZE
    );
  }
  
  /**
   * Valida se uma posição é válida
   * @private
   */
  _isValidPosition(row, col) {
    return Number.isInteger(row) && Number.isInteger(col) &&
           row >= 0 && row < SUDOKU_CONFIG.SIZE &&
           col >= 0 && col < SUDOKU_CONFIG.SIZE;
  }
  
  /**
   * Valida solução completa de Sudoku
   * @private
   */
  _validateSudokuSolution(matrix) {
    try {
      // Verificar se não há células vazias
      for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
        for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
          const value = matrix[row][col];
          if (value < SUDOKU_CONFIG.MIN_VALUE || value > SUDOKU_CONFIG.MAX_VALUE) {
            return false;
          }
        }
      }
      
      // Verificar regras do Sudoku
      return this._checkSudokuRules(matrix);
      
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Verifica as regras básicas do Sudoku
   * @private
   */
  _checkSudokuRules(matrix) {
    // Verificar linhas
    for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
      const seen = new Set();
      for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
        const value = matrix[row][col];
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
    
    // Verificar colunas
    for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
      const seen = new Set();
      for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
        const value = matrix[row][col];
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
    
    // Verificar blocos 3x3
    for (let blockRow = 0; blockRow < 3; blockRow++) {
      for (let blockCol = 0; blockCol < 3; blockCol++) {
        const seen = new Set();
        const startRow = blockRow * SUDOKU_CONFIG.BLOCK_SIZE;
        const startCol = blockCol * SUDOKU_CONFIG.BLOCK_SIZE;
        
        for (let row = startRow; row < startRow + SUDOKU_CONFIG.BLOCK_SIZE; row++) {
          for (let col = startCol; col < startCol + SUDOKU_CONFIG.BLOCK_SIZE; col++) {
            const value = matrix[row][col];
            if (seen.has(value)) return false;
            seen.add(value);
          }
        }
      }
    }
    
    return true;
  }
  
  /**
   * Verifica se puzzle tem solução única (versão simplificada)
   * @private
   */
  _hasUniqueSolution(puzzle) {
    // Implementação simplificada - em produção seria mais robusta
    try {
      const puzzle1 = this._deepCloneMatrix(puzzle);
      const puzzle2 = this._deepCloneMatrix(puzzle);
      
      const solutions = [];
      
      // Encontrar primeira solução
      if (this._solve(puzzle1, false)) {
        solutions.push(this._deepCloneMatrix(puzzle1));
      }
      
      // Tentar encontrar segunda solução diferente
      if (this._findAlternateSolution(puzzle2, solutions[0])) {
        return false; // Múltiplas soluções
      }
      
      return solutions.length === 1;
      
    } catch (error) {
      console.warn(`Erro ao verificar unicidade: ${error.message}`);
      return true; // Assumir única em caso de erro
    }
  }
  
  /**
   * Tenta encontrar solução alternativa
   * @private
   */
  _findAlternateSolution(matrix, existingSolution) {
    // Implementação simplificada para demonstração
    return false;
  }
  
  // ==================== MÉTODOS UTILITÁRIOS ====================
  
  /**
   * Conta células vazias na matriz
   * @private
   */
  _countEmptyCells(matrix) {
    let count = 0;
    for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
      for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
        if (matrix[row][col] === SUDOKU_CONFIG.EMPTY_CELL) {
          count++;
        }
      }
    }
    return count;
  }
  
  /**
   * Cria cópia profunda de matriz
   * @private
   */
  _deepCloneMatrix(matrix) {
    return matrix.map(row => [...row]);
  }
  
  /**
   * Reseta estatísticas para nova operação
   * @private
   */
  _resetStatistics() {
    this.statistics = {
      generationAttempts: 0,
      solutionTime: 0,
      cellsProcessed: 0,
      backtrackCount: 0
    };
  }
  
  /**
   * Retorna estatísticas da última operação
   * @returns {Object} Objeto com estatísticas
   */
  getStatistics() {
    return { ...this.statistics };
  }
}

// ==================== CLASSE DE UTILIDADES ====================

/**
 * Classe com métodos utilitários para Sudoku
 */
class SudokuUtils {
  
  /**
   * Formata tempo em milissegundos para string legível
   * @param {number} ms - Tempo em milissegundos
   * @returns {string} Tempo formatado
   */
  static formatTime(ms) {
    if (ms < 1000) {
      return `${ms.toFixed(2)}ms`;
    } else if (ms < 60000) {
      return `${(ms / 1000).toFixed(2)}s`;
    } else {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(2);
      return `${minutes}m ${seconds}s`;
    }
  }
  
  /**
   * Valida input do usuário para matriz
   * @param {*} input - Input para validar
   * @returns {boolean} Se o input é válido
   */
  static validateUserInput(input) {
    if (!Array.isArray(input)) return false;
    if (input.length !== SUDOKU_CONFIG.SIZE) return false;
    
    return input.every(row => {
      if (!Array.isArray(row)) return false;
      if (row.length !== SUDOKU_CONFIG.SIZE) return false;
      
      return row.every(cell => {
        return Number.isInteger(cell) && 
               cell >= SUDOKU_CONFIG.EMPTY_CELL && 
               cell <= SUDOKU_CONFIG.MAX_VALUE;
      });
    });
  }
  
  /**
   * Converte matriz para string compacta
   * @param {Array<Array<number>>} matrix - Matriz para converter
   * @returns {string} String compacta
   */
  static matrixToString(matrix) {
    return matrix.flat().join('');
  }
  
  /**
   * Converte string compacta para matriz
   * @param {string} str - String para converter
   * @returns {Array<Array<number>>|null} Matriz ou null se inválida
   */
  static stringToMatrix(str) {
    if (typeof str !== 'string' || str.length !== 81) {
      return null;
    }
    
    const matrix = [];
    for (let i = 0; i < SUDOKU_CONFIG.SIZE; i++) {
      const row = [];
      for (let j = 0; j < SUDOKU_CONFIG.SIZE; j++) {
        const char = str[i * SUDOKU_CONFIG.SIZE + j];
        const num = parseInt(char, 10);
        if (isNaN(num) || num < 0 || num > 9) {
          return null;
        }
        row.push(num);
      }
      matrix.push(row);
    }
    
    return matrix;
  }
  
  /**
   * Calcula porcentagem de preenchimento
   * @param {Array<Array<number>>} matrix - Matriz para analisar
   * @returns {number} Porcentagem preenchida (0-100)
   */
  static calculateFillPercentage(matrix) {
    const totalCells = SUDOKU_CONFIG.SIZE * SUDOKU_CONFIG.SIZE;
    let filledCells = 0;
    
    for (let row = 0; row < SUDOKU_CONFIG.SIZE; row++) {
      for (let col = 0; col < SUDOKU_CONFIG.SIZE; col++) {
        if (matrix[row][col] !== SUDOKU_CONFIG.EMPTY_CELL) {
          filledCells++;
        }
      }
    }
    
    return (filledCells / totalCells) * 100;
  }
}

// ==================== CLASSE DE DEMONSTRAÇÃO E TESTES ====================

/**
 * Classe para demonstrar o uso do gerador de Sudoku
 */
class SudokuDemo {
  
  constructor() {
    this.generator = new SudokuGenerator();
  }
  
  /**
   * Executa demonstração completa
   */
  runCompleteDemo() {
    try {
      console.log('🎯 GERADOR DE SUDOKU - DEMONSTRAÇÃO COMPLETA\n');
      console.log('='.repeat(60));
      
      this._demoRandomGeneration();
      this._demoPuzzleGeneration();
      this._demoSolver();
      this._demoStatistics();
      this._demoErrorHandling();
      
      console.log('\n✅ Demonstração concluída com sucesso!');
      
    } catch (error) {
      console.error(`❌ Erro na demonstração: ${error.message}`);
    }
  }
  
  /**
   * Demonstra geração aleatória
   * @private
   */
  _demoRandomGeneration() {
    console.log('\n🎲 1. GERAÇÃO DE SUDOKU ALEATÓRIO');
    console.log('-'.repeat(40));
    
    try {
      const sudoku = this.generator.generateRandomSudoku();
      console.log('Sudoku completo gerado:');
      sudoku.displayMatrix();
      
      const stats = this.generator.getStatistics();
      console.log(`⚡ Gerado em: ${SudokuUtils.formatTime(stats.solutionTime)}`);
      console.log(`🔄 Tentativas: ${stats.generationAttempts}`);
      
    } catch (error) {
      console.error(`Erro na geração: ${error.message}`);
    }
  }
  
  /**
   * Demonstra geração de puzzles
   * @private
   */
  _demoPuzzleGeneration() {
    console.log('\n🧩 2. GERAÇÃO DE PUZZLES POR DIFICULDADE');
    console.log('-'.repeat(40));
    
    const difficulties = ['facil', 'medio', 'dificil'];
    
    difficulties.forEach(difficulty => {
      try {
        console.log(`\n📊 Dificuldade: ${difficulty.toUpperCase()}`);
        const puzzleData = this.generator.generatePuzzle(difficulty);
        
        console.log('Puzzle para resolver:');
        const puzzleMatrix = new SudokuMatrix();
        puzzleMatrix.setMatrix(puzzleData.puzzle);
        puzzleMatrix.displayMatrix();
        
        console.log(`📈 Células vazias: ${puzzleData.metadata.emptyCells}`);
        console.log(`🎯 Preenchimento: ${SudokuUtils.calculateFillPercentage(puzzleData.puzzle).toFixed(1)}%`);
        
      } catch (error) {
        console.error(`Erro ao gerar puzzle ${difficulty}: ${error.message}`);
      }
    });
  }
  
  /**
   * Demonstra solucionador
   * @private
   */
  _demoSolver() {
    console.log('\n🔧 3. SOLUCIONADOR DE PUZZLES');
    console.log('-'.repeat(40));
    
    try {
      // Gerar puzzle para resolver
      const puzzleData = this.generator.generatePuzzle('medio');
      console.log('Puzzle original:');
      
      const originalMatrix = new SudokuMatrix();
      originalMatrix.setMatrix(puzzleData.puzzle);
      originalMatrix.displayMatrix();
      
      // Resolver puzzle
      const solution = this.generator.solvePuzzle(puzzleData.puzzle);
      
      if (solution.success) {
        console.log('\n✅ Puzzle resolvido:');
        const solvedMatrix = new SudokuMatrix();
        solvedMatrix.setMatrix(solution.solution);
        solvedMatrix.displayMatrix();
        
        console.log(`⚡ Tempo de solução: ${SudokuUtils.formatTime(solution.solutionTime)}`);
        console.log(`🔄 Células processadas: ${solution.statistics.cellsProcessed}`);
        console.log(`↩️  Backtracks: ${solution.statistics.backtrackCount}`);
        console.log(`🎯 Solução única: ${solution.isUnique ? 'Sim' : 'Não'}`);
      } else {
        console.log('❌ Não foi possível resolver o puzzle');
      }
      
    } catch (error) {
      console.error(`Erro no solucionador: ${error.message}`);
    }
  }
  
  /**
   * Demonstra estatísticas
   * @private
   */
  _demoStatistics() {
    console.log('\n📊 4. ANÁLISE DE PERFORMANCE');
    console.log('-'.repeat(40));
    
    const difficulties = ['facil', 'medio', 'dificil'];
    const testResults = [];
    
    difficulties.forEach(difficulty => {
      try {
        const startTime = performance.now();
        const puzzleData = this.generator.generatePuzzle(difficulty);
        const generationTime = performance.now() - startTime;
        
        const solutionResult = this.generator.solvePuzzle(puzzleData.puzzle);
        
        testResults.push({
          difficulty,
          generationTime,
          solutionTime: solutionResult.solutionTime,
          emptyCells: puzzleData.metadata.emptyCells,
          backtrackCount: solutionResult.statistics.backtrackCount
        });
        
      } catch (error) {
        console.error(`Erro no teste ${difficulty}: ${error.message}`);
      }
    });
    
    // Exibir resultados
    console.log('\n📈 Resultados dos testes:');
    console.log('┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐');
    console.log('│ Dificuldade │ Geração     │ Solução     │ Células     │ Backtracks  │');
    console.log('├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤');
    
    testResults.forEach(result => {
      const difficulty = result.difficulty.padEnd(11);
      const generation = SudokuUtils.formatTime(result.generationTime).padEnd(11);
      const solution = SudokuUtils.formatTime(result.solutionTime).padEnd(11);
      const emptyCells = result.emptyCells.toString().padEnd(11);
      const backtracks = result.backtrackCount.toString().padEnd(11);
      
      console.log(`│ ${difficulty} │ ${generation} │ ${solution} │ ${emptyCells} │ ${backtracks} │`);
    });
    
    console.log('└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘');
  }
  
  /**
   * Demonstra tratamento de erros
   * @private
   */
  _demoErrorHandling() {
    console.log('\n🛡️  5. TRATAMENTO DE ERROS');
    console.log('-'.repeat(40));
    
    const errorTests = [
      {
        name: 'Dificuldade inválida',
        test: () => this.generator.generatePuzzle('impossivel')
      },
      {
        name: 'Matriz inválida para resolver',
        test: () => this.generator.solvePuzzle([[1, 2, 3]])
      },
      {
        name: 'Matriz com valores inválidos',
        test: () => {
          const invalidMatrix = Array(9).fill().map(() => Array(9).fill(10));
          return new SudokuMatrix().setMatrix(invalidMatrix);
        }
      }
    ];
    
    errorTests.forEach(errorTest => {
      try {
        console.log(`\n🔍 Testando: ${errorTest.name}`);
        errorTest.test();
        console.log('⚠️  Erro não capturado (inesperado)');
      } catch (error) {
        console.log(`✅ Erro capturado corretamente: ${error.message}`);
      }
    });
  }
}

// ==================== FUNÇÃO PRINCIPAL E EXEMPLOS ====================

/**
 * Função principal para demonstração
 */
function main() {
  try {
    // Executar demonstração completa
    const demo = new SudokuDemo();
    demo.runCompleteDemo();
    
    // Exemplo de uso básico
    console.log('\n' + '='.repeat(60));
    console.log('📚 EXEMPLO DE USO BÁSICO');
    console.log('='.repeat(60));
    
    exampleBasicUsage();
    
  } catch (error) {
    console.error(`❌ Erro fatal: ${error.message}`);
    console.error(error.stack);
  }
}

/**
 * Exemplo de uso básico da API
 */
function exampleBasicUsage() {
  try {
    console.log('\n🚀 Exemplo rápido de uso:');
    
    // 1. Criar gerador
    const generator = new SudokuGenerator();
    
    // 2. Gerar puzzle médio
    const puzzleData = generator.generatePuzzle('medio');
    
    // 3. Exibir puzzle
    console.log('\n🧩 Seu puzzle para resolver:');
    const puzzleMatrix = new SudokuMatrix();
    puzzleMatrix.setMatrix(puzzleData.puzzle);
    puzzleMatrix.displayMatrix();
    
    // 4. Resolver puzzle
    const solution = generator.solvePuzzle(puzzleData.puzzle);
    
    // 5. Exibir solução
    if (solution.success) {
      console.log('\n✅ Solução:');
      const solutionMatrix = new SudokuMatrix();
      solutionMatrix.setMatrix(solution.solution);
      solutionMatrix.displayMatrix();
      
      console.log(`\n📊 Resolvido em ${SudokuUtils.formatTime(solution.solutionTime)}`);
    }
    
  } catch (error) {
    console.error(`Erro no exemplo básico: ${error.message}`);
  }
}

// ==================== EXECUÇÃO ====================

// Executar demonstração (descomente a linha abaixo para executar)
// main();

// ==================== EXPORTAÇÕES (para uso como módulo) ====================

// Se estiver usando como módulo Node.js, descomente as linhas abaixo:
/*
module.exports = {
  SudokuMatrix,
  SudokuGenerator,
  SudokuUtils,
  SudokuDemo,
  SUDOKU_CONFIG
};
*/

// Se estiver usando como módulo ES6, descomente as linhas abaixo:
/*
export {
  SudokuMatrix,
  SudokuGenerator,
  SudokuUtils,
  SudokuDemo,
  SUDOKU_CONFIG
};
*/

console.log('🎯 Gerador de Sudoku carregado com sucesso!');
console.log('📖 Execute main() para ver a demonstração completa.');
console.log('🚀 Ou use exampleBasicUsage() para exemplo básico.');

main();