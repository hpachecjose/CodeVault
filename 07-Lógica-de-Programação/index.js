function IMC(peso, altura) {
    var imc = peso / (altura ** 2);
    var resultado;

    if (imc < 18.5) {
        resultado = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 25.0) {
        resultado = 'Normal';
    } else if (imc > 25.0 && imc <= 29.0) {
        resultado = 'Sobrepeso';
    } else if (imc >= 30) {
        resultado = 'Obesidade';
    }

    return resultado; // agora retorna o valor
}

console.log(IMC(70, 1.79));
