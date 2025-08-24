// Lançando temperaturas randômicas entre 27 a 36 graus
function randomTemp() {
    let arrTempRandomics = []; //Um array com valores de temperaturas randômicas

    // Gerar 10 temperaturas entre 27 e 36 graus
    for (let index = 0; index <= 10; index++) {
        let temperatura = Math.floor(Math.random() * (36 - 27 + 1)) + 27;
        arrTempRandomics.push(temperatura);
    }

    console.log("Temperaturas lançadas:", arrTempRandomics);
    return arrTempRandomics;
}

// Verifica se a temperatura está dentro dos limites aceitáveis
function verificarNivelTemperatura(temperatura) {
    if (temperatura < 27 || temperatura > 36) {
        return false; // Temperatura fora dos limites
    }
    return true; // Temperatura aceitável
}

// Emite alerta caso a temperatura esteja fora dos limites
function emissaoAlertGeral(temperatura) {
    console.log(`🚨 Alerta! Temperatura fora do limite: ${temperatura}°C`);
}

// Função principal de controle (main procedural)
function main() {
    const temperaturas = randomTemp();

    for (let i = 0; i < temperaturas.length; i++) {
        const temp = temperaturas[i];
        const status = verificarNivelTemperatura(temp);

        if (!status) {
            emissaoAlertGeral(temp);
        } else {
            console.log(`✅ Temperatura ${temp}°C dentro dos limites.`);
        }
    }
}

// Executar o programa
main();
