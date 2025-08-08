var fPG = function(a,b,x){
    let y = a * x + b;
    let tipoFuncao = (a>0)? 'Crescente' : (!a>0)? 'Decrescente' : 'Constante';
    return `Função do primeiro grau: y = ${a}x + ${b} (${tipoFuncao})\nPara x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`;
}

const result = fPG(2.45, 3, 10);
console.log(result);


function plothGraph(func, xMin, xMax, width = 60, height = 20) {
    const step = (xMax - xMin) / width;
    const points = [];
    for (let index = 0; index <= width; index++) {
        const x = xMin + index * step;
        const y = func(x);
        points.push({ x, y });
    }
    const yValues = points.map(p => p.y);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const graph = Array(height).fill().map(() => Array(width + 1).fill(' '));
    
    points.forEach((point, index) => {
        if (isFinite(point.y)) {
            const row = Math.round(height - 1 - ((point.y - yMin) / (yMax - yMin)) * (height - 1));
            if (row >= 0 && row < height) {
                graph[row][index] = '*';
            }
        }
    });
    
    let output = `Gráfico da função (x: ${xMin} a ${xMax}, y: ${yMin.toFixed(2)} a ${yMax.toFixed(2)})\n`;
    output += '─'.repeat(width + 3) + '\n';
    graph.forEach((row, i) => {
        const yValue = yMin + ((height - 1 - i) / (height - 1)) * (yMax - yMin);
        output += `${yValue.toFixed(1).padStart(6)} │${row.join('')}\n`;
    });
    output += '─'.repeat(width + 3) + '\n';
    output += `     ${xMin.toFixed(1)}${' '.repeat(width - 8)}${xMax.toFixed(1)}\n`;
    
    return output;
}

plothGraph(x => 2.45 * x + 3, 0, 100).split('\n').forEach(line => console.log(line));