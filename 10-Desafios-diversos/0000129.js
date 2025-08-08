function plotarFuncao(valorEntrada){
    let random = Math.floor(Math.random() * 10);
    return random + valorEntrada;
}

for(let index = 0; index < 100; index++){
    plotarFuncao(valorEntrada = index)
}