function criarMatriz(linhas, colunas) {
    const matriz = new Array(linhas)
        .fill(null)
        .map(() =>
            new Array(colunas)
                .fill(null)
                .map(() => Math.floor(Math.random() * 100)) // valor aleatório entre 0 e 99
        );
    return matriz;
}
const matriz = criarMatriz(3, 3);

function isIdentityMatrix(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (i === j && m[i][j] !== 1) return false;
            if (i !== j && m[i][j] !== 0) return false;
        }
    }
    return true;
}

console.log(matriz);

if (isIdentityMatrix(matriz)) {
    console.log("Matriz identidade");
} else {
    console.log("Não é matriz identidade");
}
