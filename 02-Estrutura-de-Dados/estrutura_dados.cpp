/** Programa de conversão de temperatura    */

#include <stdio.h>

/**Função auxiliar */

float converte(float c)
{
    float f;
    f = 1.8 * c + 32;
    return f;
}

/** Função principal  */
int main(void)
{
    float t1;
    float t2;

    // Mostra a mensagem para o usuário
    printf("Digite a temperatura em Celsius: ");
    scanf("%f", &t1);
    t2 = converte(t1);
    printf("A temperatura em Fahrenheit é: %.2f\n", t2);
    return 0;
}