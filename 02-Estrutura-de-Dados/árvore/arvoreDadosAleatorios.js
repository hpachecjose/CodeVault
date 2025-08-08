class Nodo{
    constructor(valor){
        this.valor  = valor;
        this.left = null;
        this.right = null;
    }
}

class Arvore{
    constructor(){
        this.root = null;
    }

    inserirValor(valor){
        const novoNodo = new Nodo(valor);
        if(this.root === null){
            this.root = novoNodo;
        }else{
            this._inserirRecursivo(this.root, novoNodo);
        }
    }

    _inserirNovoNodo(nodo, novoNodo){
        if(novoNodo.valor < nodo.valor){
            if(nodo.left === null){
                nodo.left = novoNodo;
            }else{
                this._inserirNovoNodo(nodo.left, novoNodo);
            }
            if(novoNodo.valor > nodo.valor){
                if(nodo.right === null){
                    nodo.right = novoNodo;
                }else{
                    this._inserirNovoNodo(nodo.right, novoNodo);
                }
            }
        }
    }

    _buscarValor(nodo, valor){
        if(nodo === null){
            return false;
        }
        if(nodo.valor === valor){
            return true;
        }else if(valor < nodo.valor){
            return this._buscarValor(nodo.left, valor);
        }else{
            return this._buscarValor(nodo.right, valor);
        }

    }

    buscarValor(valor){
        return this._buscarValor(this.root, valor);
    }

    _inserirRecursivo(nodo, novoNodo){
        if(novoNodo.valor < nodo.valor){
            if(nodo.left === null){
                nodo.left = novoNodo;
            }else{
                this._inserirRecursivo(nodo.left, novoNodo);
            }
        }else{
            if(nodo.right === null){
                nodo.right = novoNodo;
            }else{
                this._inserirRecursivo(nodo.right, novoNodo);
            }
        }
    }

    _inOrder(nodo, resultado){
        if(nodo !== null){
            this._inOrder(nodo.left, resultado);
            resultado.push(nodo.valor);
            this._inOrder(nodo.right, resultado);
        }
    }

    inOrder(){
        const resultado = [];
        this._inOrder(this.root, resultado);
        return resultado;
    }

    _preOrder(nodo, resultado){
        if(nodo !== null){
            resultado.push(nodo.valor);
            this._preOrder(nodo.left, resultado);
            this._preOrder(nodo.right, resultado);
        }
    }

    preOrder(){
        const resultado = [];
        this._preOrder(this.root, resultado);
        return resultado;
    }

    _postOrder(nodo, resultado){
        if(nodo !== null){
            this._postOrder(nodo.left, resultado);
            this._postOrder(nodo.right, resultado);
            resultado.push(nodo.valor);
        }
    }

    postOrder(){
        const resultado = [];
        this._postOrder(this.root, resultado);
        return resultado;
    }

    _altura(nodo){
        if(nodo === null){
            return -1;
        }
        const alturaEsquerda = this._altura(nodo.left);
        const alturaDireita = this._altura(nodo.right);
        return Math.max(alturaEsquerda, alturaDireita) + 1;
    }

    altura(){
        return this._altura(this.root);
    }

    _nivel(nodo, valor, nivelAtual){
        if(nodo === null){
            return -1;
        }
        if(nodo.valor === valor){
            return nivelAtual;
        }
        const nivelEsquerdo = this._nivel(nodo.left, valor, nivelAtual + 1);
        if(nivelEsquerdo !== -1){
            return nivelEsquerdo;
        }
        return this._nivel(nodo.right, valor, nivelAtual + 1);
    }

    nivel(valor){
        return this._nivel(this.root, valor, 0);
    }

    _quantidadeNodos(nodo){
        if(nodo === null){
            return 0;
        }
        return 1 + this._quantidadeNodos(nodo.left) + this._quantidadeNodos(nodo.right);
    }

    quantidadeNodos(){
        return this._quantidadeNodos(this.root);
    }

    _quantidadeFolhas(nodo){
        if(nodo === null){
            return 0;
        }
        if(nodo.left === null && nodo.right === null){
            return 1;
        }
        return this._quantidadeFolhas(nodo.left) + this._quantidadeFolhas(nodo.right);
    }


    quantidadeFolhas(){
        return this._quantidadeFolhas(this.root);
    }

    _quantidadeNodosInternos(nodo){
        if(nodo === null || (nodo.left === null && nodo.right === null)){
            return 0;
        }
        return 1 + this._quantidadeNodosInternos(nodo.left) + this._quantidadeNodosInternos(nodo.right);
    }

    quantidadeNodosInternos(){
        return this._quantidadeNodosInternos(this.root);
    }


}


const arvore = new Arvore();
const valores = [10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 13, 16, 20];
valores.forEach(valor => arvore.inserirValor(valor));
console.log("InOrder:", arvore.inOrder());
console.log("PreOrder:", arvore.preOrder());
console.log("PostOrder:", arvore.postOrder());
console.log("Altura da árvore:", arvore.altura());
console.log("Nível do valor 7:", arvore.nivel(7));
console.log("Quantidade de nós:", arvore.quantidadeNodos());
console.log("Quantidade de folhas:", arvore.quantidadeFolhas());
console.log("Quantidade de nós internos:", arvore.quantidadeNodosInternos());
console.log("Buscar valor 12:", arvore.buscarValor(12));
console.log("Buscar valor 99:", arvore.buscarValor(99));



//Função que faz uma busca binária na árvore e retorna true se o valor existe, caso contrário retorna false
function buscarValorNaArvore(arvore, valor){
    return arvore.buscarValor(valor);
}





const buscaValor = function(nodo, valor) {
    if (nodo === null) {
        return false;
    }
    if (nodo.valor === valor) {
        return true;
    }
    if (valor < nodo.valor) {
        return buscaValor(nodo.left, valor);
    } else {
        return buscaValor(nodo.right, valor);
    }
};

var resultadoBusca = buscaValor(arvore.root, 7);
console.log("Resultado da busca por 7:", resultadoBusca);