function temperatura() {
    // Criação do array para armazenar as temperaturas da semana
    let temperaturaSemana = [];

    // Geração de temperaturas aleatórias para cada dia da semana
    for (let index = 0; index < 7; index++) {
        let temperatura = Math.floor(Math.random() * 40);
        temperaturaSemana.push(temperatura);
    }

    // Cálculo da maior e menor temperatura
    const maiorTemperatura = Math.max(...temperaturaSemana);
    const menorTemperatura = Math.min(...temperaturaSemana);

    // Cálculo da média das temperaturas
    const media = temperaturaSemana.reduce((acc, temp) => acc + temp, 0) / temperaturaSemana.length;

    // Exibição dos resultados
    return console.log(`Média de temperatura: ${media.toFixed(2)}. Temperatura mínima: ${menorTemperatura} e 
    Temperatura máxima: ${maiorTemperatura}`);
}

temperatura();
