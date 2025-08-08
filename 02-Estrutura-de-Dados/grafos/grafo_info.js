class GraphMatrix {
    constructor(V) {
      this.V = V;           // Número de vértices
      this.A = 0;           // Número de arcos (arestas direcionadas)
      // Inicializa matriz VxV com zeros
      this.adj = Array.from({ length: V }, () => Array(V).fill(0));
    }
  
    insertArc(v, w) {
      if (v >= 0 && v < this.V && w >= 0 && w < this.V) {
        if (this.adj[v][w] === 0) {
          this.adj[v][w] = 1;
          this.A++;
        }
      } else {
        throw new Error("Vértices fora do intervalo válido");
      }
    }
  
    removeArc(v, w) {
      if (v >= 0 && v < this.V && w >= 0 && w < this.V) {
        if (this.adj[v][w] === 1) {
          this.adj[v][w] = 0;
          this.A--;
        }
      } else {
        throw new Error("Vértices fora do intervalo válido");
      }
    }
  
    show() {
      for (let v = 0; v < this.V; v++) {
        let neighbors = [];
        for (let w = 0; w < this.V; w++) {
          if (this.adj[v][w] === 1) neighbors.push(w);
        }
        console.log(`${v}: ${neighbors.join(' ')}`);
      }
    }
  }
  
  // Exemplo de uso:
  const Gm = new GraphMatrix(6);
  Gm.insertArc(0, 1);
  Gm.insertArc(0, 5);
  Gm.insertArc(1, 0);
  Gm.insertArc(1, 5);
  Gm.insertArc(2, 4);
  Gm.insertArc(3, 1);
  Gm.insertArc(5, 3);
  
  Gm.show();
  // Saída esperada:
  // 0: 1 5
  // 1: 0 5
  // 2: 4
  // 3: 1
  // 4:
  // 5: 3
  