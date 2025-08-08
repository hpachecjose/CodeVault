let negativo = 0;

for (let i = 1; i <= 5; i++) {
    let valor = Number(prompt(`Digite o valor ${i}:`));
    if (valor < 0) {
        negativo++;
    }
}

console.log(`Quantidade de valores negativos: ${negativo}`);