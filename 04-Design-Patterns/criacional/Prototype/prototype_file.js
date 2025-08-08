class CadastroPrototipo {
    constructor(nomeCliente, enderecoCliente, emailCliente) {
        this.nomeCliente = nomeCliente;
        this.enderecoCliente = enderecoCliente;
        this.emailCliente = emailCliente;
    }

    cadastroCompleto() {
        return `Condomínio: ${this.nomeCliente} \n
                Endereço: ${JSON.stringify(this.enderecoCliente)} \n
                Email: ${this.emailCliente}`;
    }
}

const cadastro1 = new CadastroPrototipo(
    "Condomínio do Edifício Mar Vermelho",
    { Rua: "Jerusalém", Numero: 777, Bairro: "Israel", CEP: "292234-444" },
    "marvermelho@gmail.com"
);

console.log(cadastro1.cadastroCompleto());


const anotherObject = Object.create(cadastro1)
console.log(anotherObject.nomeCliente + "eee")