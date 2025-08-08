var Esquema = class Grafo{
    constructor(numVertices, numArestas){
        this.numVertices = numVertices;
        this.numArestas = numArestas;
        this.adj = {};
    }

    //Método para adicionar um vértice
    adicionarVerticeNoGrafo(vertice){
        if(!this.adj[vertice]){
            this.adj[vertice] = [];
        }
    }

    //Adiciona uma aresta entre dois vértices
    adicionarArestasEntreVertice(vertex1,vertex2){
        if(!this.adj[vertex1]){
            this.adicionarVerticeNoGrafo(vertex1);
        }
        if(!this.adj[vertex2]){
            this.adicionarVerticeNoGrafo(vertex2);
        }
        this.adj[vertex1].push(vertex2);
        this.adj[vertex2].push(vertex1);
    }

    //Exibir o grafo
    exibirGrafo(){
        for(let vertice in this.adj){
            console.log(vertice + " -> " + this.adj[vertice].join(", "));
        }

    }



}


   //Exemplo de uso
    const grafo = new Esquema(5, 4);
    grafo.adicionarArestasEntreVertice("A", "B");
    grafo.adicionarArestasEntreVertice("A", "C");
    grafo.adicionarArestasEntreVertice("B", "D");
    grafo.adicionarArestasEntreVertice("C", "D");
    grafo.adicionarArestasEntreVertice("C", "E");
    grafo.adicionarArestasEntreVertice("D", "E");


    grafo.exibirGrafo();