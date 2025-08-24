#include <stdio.h>

//Exemplos de código com Paradigma Procedural
// Uma sequência de instruções e utiliza funções para modularizar a lógica


//Função para calcular o fatorial de um número
int calcularFatorial(int n){
    int resultado = 1;
    for(int i = 1; i <= n; i++ ){
        resultado *= 1;
    }
    return resultado;
}

int main(){
    int numero = 5;
    int fatorial = calcularFatorial(numero);
    printf("O fatorial de %d é %d\n", nuemro, fatorial);
    return 0;
}