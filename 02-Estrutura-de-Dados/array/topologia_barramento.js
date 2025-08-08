var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.trim().split('\n');

function pointToId(p) {
  // p no formato "A1", "C2", etc.
  // Mapear para um id único, ex: A=0,...E=4; X=1..5
  const row = p.charCodeAt(0) - 'A'.charCodeAt(0);
  const col = parseInt(p.slice(1)) - 1;
  return row * 5 + col;
}

function bfs(start, graph, n) {
  let dist = Array(n).fill(-1);
  let queue = [];
  dist[start] = 0;
  queue.push(start);
  while(queue.length > 0) {
    let u = queue.shift();
    for(let v of graph[u]) {
      if(dist[v] === -1) {
        dist[v] = dist[u] + 1;
        queue.push(v);
      }
    }
  }
  return dist;
}

function isConnected(graph, vertices) {
  // Verifica se o subgrafo induzido pelos vertices está conectado
  // vertices: array de ids que aparecem no grafo
  if(vertices.length === 0) return true;
  let visited = new Set();
  let stack = [vertices[0]];
  while(stack.length > 0) {
    let u = stack.pop();
    if(!visited.has(u)) {
      visited.add(u);
      for(let v of graph[u]) {
        if(vertices.includes(v) && !visited.has(v)) {
          stack.push(v);
        }
      }
    }
  }
  return visited.size === vertices.length;
}

let T = parseInt(lines[0]);
let lineIndex = 1;

for(let t=1; t<=T; t++) {
  let N = parseInt(lines[lineIndex++]);
  let edges = [];
  let graph = Array(25).fill(0).map(() => []);
  let degree = Array(25).fill(0);
  let usedVerticesSet = new Set();

  for(let i=0; i<N; i++) {
    let [p1, p2] = lines[lineIndex++].trim().split(' ');
    let u = pointToId(p1);
    let v = pointToId(p2);
    edges.push([u,v]);
    graph[u].push(v);
    graph[v].push(u);
    degree[u]++;
    degree[v]++;
    usedVerticesSet.add(u);
    usedVerticesSet.add(v);
  }

  let usedVertices = Array.from(usedVerticesSet);

  // Verificar conectividade do grafo induzido pelos vértices usados
  if(!isConnected(graph, usedVertices)) {
    console.log(`Case ${t}: ~x(`);
    continue;
  }

  // Contar vértices de grau ímpar
  let oddVertices = usedVertices.filter(v => degree[v] % 2 !== 0);

  if(oddVertices.length !== 0 && oddVertices.length !== 2) {
    // Não tem caminho euleriano nem circuito
    console.log(`Case ${t}: ~x(`);
    continue;
  }

  // Soma das distâncias dos segmentos (cada segmento tem distância 1)
  let totalDistance = N * 1;

  if(oddVertices.length === 2) {
    // Precisamos conectar os dois vértices de grau ímpar para fechar o caminho
    // Procurar menor caminho entre eles usando BFS
    let dist = bfs(oddVertices[0], graph, 25);
    let extra = dist[oddVertices[1]];
    if(extra === -1) {
      // Não é possível conectar os vértices ímpares
      console.log(`Case ${t}: ~x(`);
      continue;
    }
    totalDistance += extra;
  }

  // Imprimir resultado com 2 casas decimais
  console.log(`Case ${t}: ${totalDistance.toFixed(2)}`);
}
