class HeapMaximo{
    constructor(){
        this.valoresHeap = [];
    }

    inserindoValoresHeap(valor){
        this.valoresHeap.push(valor);
        this._subirValor();
    }

    _subirValor(){
        let idx = this.valoresHeap.length - 1;
        const idxMaxZero = idx > 0 ? true : false;
        while(idxMaxZero){
            let paiIdx = Math.floor((idx -1));
            if()
        }
    }
}