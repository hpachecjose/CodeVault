function fQuadratica(a, b, c) {
    const fQ = (x) => (a * (x ** 2)) + (b * x) + c;
    let tipoFuncao = a > 0 ? 'Crescente' : (a < 0) ? 'Decrescente' : 'Constante';
    let verticesFunca = [];
    let Xv = -(b / (2 * a));
    let Yv = fQ(Xv);
    verticesFunca.push({ x: Xv, y: Yv });

    let X1, X2;
    let delta = (b ** 2) - (4 * a * c);
    if (delta >= 0) {
        X1 = (-b + Math.sqrt(delta)) / (2 * a);
        X2 = (-b - Math.sqrt(delta)) / (2 * a);
    } else {
        X1 = NaN;
        X2 = NaN;
    }

    let analiseDelta = '';
    if (delta > 0) {
        analiseDelta = `A função possui duas raízes reais distintas: X1 = ${X1.toFixed(2)} e X2 = ${X2.toFixed(2)}`;
    } else if (delta === 0) {
        analiseDelta = `A função possui uma raiz real dupla: X1 = X2 = ${X1.toFixed(2)}`;
    } else {
        analiseDelta = 'A função não possui raízes reais.';
    }

    // Gera o gráfico ASCII
    let grafico = [];
    let minY = Infinity, maxY = -Infinity;
    for (let x = -10; x <= 10; x += 1) {
        let y = fQ(x);
        grafico.push({ x, y });
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }

    // Normaliza o gráfico para caber em 20 linhas
    const altura = 20;
    let linhas = [];
    for (let i = 0; i < altura; i++) linhas.push(Array(grafico.length).fill(' '));
    grafico.forEach((point, idx) => {
        let yNorm = Math.round((point.y - minY) / (maxY - minY) * (altura - 1));
        linhas[altura - 1 - yNorm][idx] = '*';
    });

    let graficoStr = 'Gráfico aproximado:\n';
    linhas.forEach(linha => {
        graficoStr += linha.join('') + '\n';
    });

    return `Função quadrática: f(x) = ${a}x² + ${b}x + ${c} (${tipoFuncao})\n` +
        `Vértice da função: (${verticesFunca[0].x.toFixed(2)}, ${verticesFunca[0].y.toFixed(2)})\n` +
        `Raízes da função: X1 = ${isNaN(X1) ? 'Complexa' : X1.toFixed(2)}, X2 = ${isNaN(X2) ? 'Complexa' : X2.toFixed(2)}\n` +
        `${analiseDelta}\n\n` +
        graficoStr;
}

const resultado = fQuadratica(15, -3, 2);
console.log(resultado);
