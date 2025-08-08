class Node {
    constructor(value) {
        this.value = value; //Valor armazenado no nó
        this.next = null; //Referência para o próximo nó
    }
}

function hasCycle(head) {
    let torto = head; //Avança um nó por vez
    let rapido = head; //Avança dois nós por vez

    while (rapido !== null && rapido.next !== null) {
        torto = torto.next;          // Move torto um passo
        rapido = rapido.next.next;   // Move rapido dois passos

        if (torto === rapido) {
            console.log("Ciclo detectado!");
            return true;            // Ciclo detectado
        }
    } console.log("Sem ciclos.");
    return false;                  // Sem ciclos
}

// Exemplo de uso
const nodo1 = new Node(1);
const nodo2 = new Node(2);
const nodo3 = new Node(3);
const nodo4 = new Node(4);

// Conectando os nós
nodo1.next = nodo2;
nodo2.next = nodo3;
nodo3.next = nodo4;
// Criando um ciclo
nodo4.next = nodo2; // O nó 4 aponta de volta para o nó 2

// Testando a função
hasCycle(nodo1); // Saída esperada: "Ciclo detectado!"