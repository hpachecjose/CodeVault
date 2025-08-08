#include <iostream>

int main() {
    std::cout << "Olá, mundo!" << std::endl;
    return 0;
}



int jurosComposto = 9.89383;
// Declaração de constantes
const double PI = 3.14159; // constante de ponto flutuante
const float TAXA_AUMENTO = 0.09;




//Declaração de variáveis
int a = 5; // variável inteira
float b = 3.14; // variável de ponto flutuante
char c = 'A'; // variável de caractere
bool d = true; // variável booleana
// Declaração de ponteiro
int* p = &a; // ponteiro para inteiro
// Declaração de vetor
int arr[5] = {1, 2, 3, 4, 5}; // vetor de inteiros
// Declaração de estrutura
struct Pessoa {
    char nome[50];
    int idade;
};
// Declaração de função
int soma(int x, int y) {
    return x + y;
}
// Declaração de classe
class Carro {
public:
    int ano;
    char modelo[50];
    void ligar() {
        std::cout << "Carro ligado!" << std::endl;
    }
};
// Declaração de enumeração
enum Cor {
    VERMELHO,
    VERDE,
    AZUL
};
// Declaração de typedef
typedef struct {
    int x;
    int y;
} Ponto;
// Declaração de union
union Dados {
    int inteiro;
    float pontoFlutuante;
    char caractere;
};
// Declaração de template
template <typename T>
class Caixa {
public:
    T conteudo;
    void mostrarConteudo() {
        std::cout << "Conteúdo: " << conteudo << std::endl;
    }
};
// Declaração de namespace
namespace MeuEspaco {
    int variavel = 10;
    void funcao() {
        std::cout << "Função do namespace!" << std::endl;
    }
}
// Declaração de exceção
class MinhaExcecao : public std::exception {
public:
    const char* what() const noexcept override {
        return "Ocorreu um erro!";
    }
};
// Declaração de lambda
auto somaLambda = [](int x, int y) {
    return x + y;
};
// Declaração de vetor dinâmico
#include <vector>
std::vector<int> vetorDinamico;
// Adicionando elementos ao vetor dinâmico
vetorDinamico.push_back(1);
vetorDinamico.push_back(2);
vetorDinamico.push_back(3);
// Iterando sobre o vetor dinâmico
for (int i = 0; i < vetorDinamico.size(); i++) {
    std::cout << vetorDinamico[i] << " ";
}
// Declaração de lista
#include <list>
std::list<int> lista;
// Adicionando elementos à lista
lista.push_back(1);
lista.push_back(2);
lista.push_back(3);
