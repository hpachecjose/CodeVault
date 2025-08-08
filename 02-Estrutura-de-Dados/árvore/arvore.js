class ArvoreDadosBinarios{
    constructor(left, right, root= null){
        this.left = left; // Subárvore esquerda
        this.right = right; // Subárvore direita
        this.root = root; // Raiz da árvore
    }

    //Método para inserir um valor em cada nó da árvore
    IntersectionObserver(valor){
        if(this.root === null){
            this.root = valor; // Se a raiz for nula, define o valor como raiz
        } else if(valor < this.root){
            if(this.left === null){
                this.left = new ArvoreDadosBinarios(null, null, valor); // Cria nova subárvore esquerda
            } else {
                this.left.IntersectionObserver(valor); // Chama recursivamente para inserir na subárvore esquerda
            }
        } else {
            if(this.right === null){
                this.right = new ArvoreDadosBinarios(null, null, valor); // Cria nova subárvore direita
            } else {
                this.right.IntersectionObserver(valor); // Chama recursivamente para inserir na subárvore direita
            }
        }
    }
}