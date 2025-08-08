//Criando objetos usando classes
class Redes{
    constructor(nomeRede, tipoRede,velocidade){
        this.nomeRede = nomeRede;
        this.tipoRede = tipoRede;
        this.velocidade = velocidade;
    }
    setNomeRede(nomeRede){
        return this.nomeRede = nomeRede;
    }
    getNomeRede(){
        if(this.nomeRede == null){
            return "Rede não informada!";
        }
        return this.nomeRede;
    }
}

//Criando objetos usando função construtora
function Redes(nomeRede, tipoRede,velocidade){
    this.nomeRede = nomeRede;
    this.tipoRede = tipoRede;
    this.velocidade = velocidade;
    this.setNomeRede = function(nomeRede){
        return this.nomeRede = nomeRede;
    }
    this.getNomeRede = function(){
        if(this.nomeRede == null){
            return "Rede não informada!";
        }
        return this.nomeRede;
    }
}
//Criando objetos usando função construtora com prototype
function Redes(nomeRede, tipoRede,velocidade){
    this.nomeRede = nomeRede;
    this.tipoRede = tipoRede;
    this.velocidade = velocidade;
}
Redes.prototype.setNomeRede = function(nomeRede){
    return this.nomeRede = nomeRede;
}
Redes.prototype.getNomeRede = function(){
    if(this.nomeRede == null){
        return "Rede não informada!";
    }
    return this.nomeRede;
}
//Criando objetos usando Object.create
function Redes(nomeRede, tipoRede,velocidade){
    this.nomeRede = nomeRede;
    this.tipoRede = tipoRede;
    this.velocidade = velocidade;
}
Redes.prototype.setNomeRede = function(nomeRede){
    return this.nomeRede = nomeRede;
}
Redes.prototype.getNomeRede = function(){
    if(this.nomeRede == null){
        return "Rede não informada!";
    }
    return this.nomeRede;
}
var rede1 = Object.create(Redes.prototype);
rede1.nomeRede = "Rede 1";
rede1.tipoRede = "Rede 1";
rede1.velocidade = "Rede 1";
rede1.setNomeRede("Rede 1");
rede1.getNomeRede(); // Rede 1


//Criando objetos usando função fábrica
function criarRede(nomeRede, tipoRede,velocidade){
    return {
        nomeRede: nomeRede,
        tipoRede: tipoRede,
        velocidade: velocidade,
        setNomeRede: function(nomeRede){
            return this.nomeRede = nomeRede;
        },
        getNomeRede: function(){
            if(this.nomeRede == null){
                return "Rede não informada!";
            }
            return this.nomeRede;
        }
    }
}