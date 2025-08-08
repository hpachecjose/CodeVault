llzz.c 
#include <vector>

int buscaBinaria(const std::vector<int>& vetor, int chave) {
    int esquerda = 0;
    int direita = vetor.size() - 1;

    while (esquerda <= direita) {
        int meio = esquerda + (direita - esquerda) / 2;

        // Verifica se a chave está presente no meio
        if (vetor[meio] == chave) {
            return meio; // Retorna o índice do elemento encontrado
        }

        // Se a chave for maior, ignora a metade esquerda
        if (vetor[meio] < chave) {
            esquerda = meio + 1;
        }
        // Se a chave for menor, ignora a metade direita
        else {
            direita = meio - 1;
        }
    }

    return -1; // Retorna -1 se a chave não for encontrada
}

int main() {
    std::vector<int> vetor = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int chave = 7;

    int resultado = buscaBinaria(vetor, chave);
    if (resultado != -1) {
        std::cout << "Elemento encontrado no índice: " << resultado << std::endl;
    } else {
        std::cout << "Elemento não encontrado." << std::endl;
    }

    return 0;
}
