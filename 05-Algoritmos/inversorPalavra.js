class Temperatura{
    constructor(temeperatura){
        this.temperatura = temeperatura;
        this.calculaTemperatura = function(){
            if(this.temperatura > 30){
                console
            }else{
                console.log("Temperatura normal");
            }
        }
    }

    getTemperatura(){
        return this.temperatura;
    }
    setTemperatura(temperatura){
        this.temperatura = temperatura;
    }
}


class Umidade{
    constructor(valor){
        this.valor = valor;
        this.calculaUmidade = function(){
            if(this.valor > 70){
                console.log("Umidade alta");
            }else{
                console.log("Umidade normal");
            }
        }
    }
    getUmidade(){
        return this.valor;
    }
    setUmidade(valor){
        if(this.valor > 100){
            console.log("Valor inválido");
    }
}
}



class TaxaUmidadeAtual{
    constructor(taxaUmidadeAtual){
        this.taxaUmidadeAtual = taxaUmidadeAtual;
        this.calculaTaxaUmidadeAtual = function(){
            if(this.taxaUmidadeAtual > 70){
                console.log("Taxa de umidade alta");
            }else{
                console.log("Taxa de umidade normal");
            }
        }
    }
}
