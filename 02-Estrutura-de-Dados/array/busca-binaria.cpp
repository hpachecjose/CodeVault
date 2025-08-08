int PesquisaBinaria(int vet[], int chaveN, int tam) {
    int inicio = 0;
    int fim = tam - 1;
    int meio;
    while (inicio <= fim) {
        meio = (inicio + fim) / 2;
        if (chaveN == vet[meio]) {
            return meio;
        }
        if (chaveN < vet[meio]) {
            fim = meio - 1;
        } else {
            inicio = meio + 1;
        }
    }
    return -1; // Não encontrado
}

// Implementação recursiva
int PesquisaBinariaRec(int x, int vet[], int e, int d) {
    if (e > d) {
        return -1;
    }
    int meio = (e + d) / 2;
    if (vet[meio] == x) {
        return meio;
    }
    if (vet[meio] < x) {
        return PesquisaBinariaRec(x, vet, meio + 1, d);
    } else {
        return PesquisaBinariaRec(x, vet, e, meio - 1);
    }
}
