class Dispositivo {
    constructor(nome) {
        this.nome = nome;
    }

    atualizar(dados) {
        console.log(`Dispositivo ${this.nome} recebeu dados: ${dados}`);
    }
}

class Hub {
    constructor(nome, maxPortas) {
        this.nome = nome;
        this.maxPortas = maxPortas;
        this.dispositivos = [];
    }

    conectarDispositivo(dispositivo) {
        if (this.dispositivos.length < this.maxPortas) {
            this.dispositivos.push(dispositivo);
            console.log(`${dispositivo.nome} conectado ao ${this.nome}`);
        } else {
            console.log("Limite de portas atingido!");
        }
    }

    desconectarDispositivo(dispositivo) {
        this.dispositivos = this.dispositivos.filter(d => d !== dispositivo);
        console.log(`${dispositivo.nome} desconectado do ${this.nome}`);
    }

    transmitirDados(dados, dispositivoDestino, dispositivoOrigem) {
        console.log(`Transmitindo dados de ${dispositivoOrigem.nome} para ${dispositivoDestino.nome}`);
        this.dispositivos.forEach(dispositivo => {
            if (dispositivo !== dispositivoOrigem) {
                dispositivo.atualizar(dados);
            }
        });
    }
}

// Exemplos de uso da classe Hub
let hub = new Hub("Hub Principal", 4);
let dispositivo1 = new Dispositivo("Dispositivo A");
let dispositivo2 = new Dispositivo("Dispositivo B");
hub.conectarDispositivo(dispositivo1);
hub.conectarDispositivo(dispositivo2);
hub.transmitirDados("Mensagem de teste", dispositivo2, dispositivo1);
