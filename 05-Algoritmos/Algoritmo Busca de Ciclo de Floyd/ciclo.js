class Nodo{
    constructor(valor){
        this.valor = valor;
        this.proximo = null;
    }
}


function buscaCiclo(inicio){
    let coelho = inicio;
    let lebre = inicio;

    while(lebre !== null && lebre.proximo !== null){
        coelho = coelho.proximo;
        lebre = lebre.proximo;

        const setence = coelho === lebre? true : false;
        if(setence){console.log("Ciclo detectado"); return true}
    }

    console.log("Sem ciclo detectado");
    return false;
}

//Exemplos de uso
const nodo1 = new Nodo(1);
const nodo2 = new Nodo(2);
const nodo3 = new Nodo(3);
const nodo4 = new Nodo(4);

//Conectando os nodos
nodo1.proximo = nodo2;
nodo2.proximo = nodo3;
nodo3.proximo = nodo4;

//testando a função
buscaCiclo(nodo1)