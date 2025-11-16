#include <stdlib.h>
#include <stdio.h>

typedef struct arv {
    char info;
    struct arv *esq;
    struct arv *dir;
} Arv;

Arv *arv_criavazia() {
    return NULL;
}

int arv_vazia(Arv *a) {
    return a == NULL;
}

Arv *arv_cria(char c, Arv *esq, Arv *dir) {
    Arv *p = (Arv *)malloc(sizeof(Arv));
    if (p == NULL) {
        return NULL;
    }
    p->info = c;
    p->esq = esq;
    p->dir = dir;
    return p;
}

void arv_libera(Arv *a) {
    if (!arv_vazia(a)) {
        arv_libera(a->esq);
        arv_libera(a->dir);
        free(a);
    }
}

void arv_imprime(Arv *a) {
    if (!arv_vazia(a)) {
        printf("%c ", a->info);  // Adicionei espaço para legibilidade
        arv_imprime(a->esq);
        arv_imprime(a->dir);
    }
}

int main() {
    Arv *a = arv_cria('a',
                      arv_cria('b',
                               arv_criavazia(),
                               arv_cria('d', arv_criavazia(), arv_criavazia())),
                      arv_cria('c',
                               arv_cria('e', arv_criavazia(), arv_criavazia()),
                               arv_cria('f', arv_criavazia(), arv_criavazia())));
    if (a == NULL) {
        printf("Erro ao criar árvore\n");
        return 1;
    }
    arv_imprime(a);  // Imprime a árvore
    printf("\n");    // Quebra de linha
    arv_libera(a);   // Libera memória
    return 0;
}
