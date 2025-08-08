int BuscaEmLargura(Grafo *G, Fila *F, int raiz){
    int verticesMarcados[NumVertices];//vetor de vertices marcados
    int tamVerticesMarcados= 0;
    int vertice1;
    no_lista *p;

    verticesMarcados[0] = raiz;//marca raiz
    tamVerticesMarcados++;

    PoeVerticeNaFila(F , raiz); //poe raiz na fila

    while(!FilaVazia(F)){//enquanto a fila nao esta vazia
        vertice1 = F->ini->vertice;//vertice que esta no inicio da fila
         p = G->Ladj[vertice1-1].inicio;// Ladj = lista de adjacencia de vertice1

        while(p!=NULL){//enquanto a lista de adjacencia do vertice1 nao acaba
            if(!BuscaVertice(p->vertice, verticesMarcados, tamVerticesMarcados)){//busca p->vertice no vetor verticesMarcados
                verticesMarcados[tamVerticesMarcados++] = p->vertice;//marcou p->vertice
                PoeVerticeNaFila(F , p->vertice);//poe p->vertice na fila
                //arestas que compoem arvore geradora mínima, aresta (vertice1, p->vertice)
            }
            else
            if(WPertenceF(p->vertice, F)){//se p->vertice pertence a F
                //arestas (vertice1, p->vertice) que não compoem árvore geradora mínima
            }
            p = p->prox;
        }
        RetiraVerticeFila(F);
    }
    return 0;
}