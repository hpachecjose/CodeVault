function adicionarCarrinho(n, p, q) {
    class Carrinho {
        constructor(nome, preco, quantidade) {
            this.nome = nome;
            this.preco = preco;
            this.quantidade = quantidade;
        }
    }

    // Array para armazenar as instâncias do carrinho
    const carrinhos = [];
    
    // Adicionando instâncias ao array
    carrinhos.push(new Carrinho(n, p, q));
 
    // Você pode adicionar quantas instâncias quiser aqui

    function acrescentaItensNaLista() {
        let carrinho_lista = [];

        // Itera sobre o array de carrinhos e adiciona os valores
        carrinhos.forEach(item => {
            carrinho_lista.push(Object.values(item)); // Pega os valores automaticamente
        });

        return carrinho_lista;
    }

    // Executa e mostra o resultado
    const listaDeItens = acrescentaItensNaLista();
    console.log(listaDeItens);

    return listaDeItens; // Opcional: retorna para uso externo
}

// Função para ler dados do terminal
function lerDados() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Digite o nome do item: ', (nome) => {
        readline.question('Digite o preço do item: ', (preco) => {
            readline.question('Digite a quantidade do item: ', (quantidade) => {
                adicionarCarrinho(nome, parseFloat(preco), parseInt(quantidade));
                readline.close();
            });
        });
    });
}

// Chama a função para ler dados
lerDados();
