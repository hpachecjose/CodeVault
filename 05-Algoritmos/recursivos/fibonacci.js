function fibonacci(n){
    //Verifica se o número é 0 ou 1, que são os casos base
    const isOneOrZero = n === 0 || n ===1? true : false;
    if(isOneOrZero){
        return n;
   }else{
        ///Caso recursivo para calcular o n-ésimo número de Finobanacci
        return fibonacci(n-1) + fibonacci(n-2);
   }
}

//Exemplos de uso
const n = 10; //Número de termos
console.log(`Fibonacci de ${n} é ${fibonacci(n)}`); //Saída: Fibonacci de 10 é 55