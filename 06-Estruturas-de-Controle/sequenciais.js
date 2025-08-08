const intervalo = setTimeout(() => {
  // Um valor aleatório ímpar não nulo entre 1 e 50
  let valor = 0;
  while (valor % 2 === 0 || valor === 0) {
    valor = Math.floor(Math.random() * 50) + 1;
  }
  console.log("Valor inicial:", valor);

  function adicionaUm(valor) {
    return valor + 1;
  }
  const resultAdicionaUm = adicionaUm(valor);

  function multiplicaRandom(resultAdicionaUm) {
    return resultAdicionaUm * Math.floor(Math.random() * 10);
  }
  const resultMultiplicaRandom = multiplicaRandom(resultAdicionaUm);

  function subtraiRandomNumber(resultMultiplicaRandom) {
    const setValor = 10;
    return setValor - resultMultiplicaRandom;
  }

  const resultadoFinal = subtraiRandomNumber(resultMultiplicaRandom);
  console.log("Resultado final:", resultadoFinal);
}, 2000);

// Não é necessário usar clearInterval aqui, pois estamos usando setTimeout
