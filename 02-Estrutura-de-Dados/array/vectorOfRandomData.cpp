#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>
#include <variant>

using namespace std;

// Definindo um tipo que pode ser int, string ou um objeto personalizado
struct RandomObject {
    string nome;
    int idade;
};

using VariantType = std::variant<int, std::string, RandomObject>;

// Função para gerar um objeto aleatório
RandomObject objetoAleatorio() {
    RandomObject obj;
    obj.nome = "Objeto Aleatório";
    obj.idade = rand() % 100;
    return obj;
}

// Função para gerar um número aleatório
int numeroAleatorio() {
    return rand() % 100;
}

// Função para gerar uma string aleatória
string stringAleatoria() {
    const string letras = "abcdefghijklmnopqrstuvwxyz";
    string resultado;
    for (int i = 0; i < 5; i++) {
        resultado += letras[rand() % letras.length()];
    }
    return resultado;
}

// Função para montar o vetor
vector<VariantType> montaVetor(int quantidade) {
    vector<VariantType> vetor;
    for (int i = 0; i < quantidade; i++) {
        int tipo = rand() % 3; // sorteia entre 0,1,2
        if (tipo == 0) {
            vetor.push_back(objetoAleatorio());
        } else if (tipo == 1) {
            vetor.push_back(numeroAleatorio());
        } else {
            vetor.push_back(stringAleatoria());
        }
    }
    return vetor;
}

// Função para imprimir o vetor
void imprimeVetor(const vector<VariantType>& vetor) {
    for (const auto& elemento : vetor) {
        if (std::holds_alternative<int>(elemento)) {
            std::cout << "Número: " << std::get<int>(elemento) << std::endl;
        } else if (std::holds_alternative<std::string>(elemento)) {
            std::cout << "String: " << std::get<std::string>(elemento) << std::endl;
        } else if (std::holds_alternative<RandomObject>(elemento)) {
            auto obj = std::get<RandomObject>(elemento);
            std::cout << "Objeto: { nome: " << obj.nome << ", idade: " << obj.idade << " }" << std::endl;
        }
    }
}

// Função para verificar se um número está presente no vetor
bool contemNumero(const vector<VariantType>& vetor, int numero) {
    for (const auto& elemento : vetor) {
        if (std::holds_alternative<int>(elemento) && std::get<int>(elemento) == numero) {
            return true;
        }
    }
    return false;
}

int main() {
    // Inicializa o gerador de números aleatórios
    srand(time(nullptr));

    // Monta e imprime o vetor
    vector<VariantType> resultado = montaVetor(10);
    imprimeVetor(resultado);

    // Exemplo de busca de número
    int numeroProcurado = 42;
    if (contemNumero(resultado, numeroProcurado)) {
        cout << "O número " << numeroProcurado << " está presente no vetor." << endl;
    } else {
        cout << "O número " << numeroProcurado << " não foi encontrado no vetor." << endl;
    }

    return 0;
}
