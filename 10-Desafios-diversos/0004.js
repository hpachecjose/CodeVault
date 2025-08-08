const ProgramaEstoque = (() => {
    // Objeto com os produtos, códigos e preços
    const estoque = {
        AP10L:   { nome: "Extintor AP 10L", precoVista: 100.90, precoPrazo: 200.78 },
        CO26KG:  { nome: "Extintor CO2 6KG", precoVista: 123.90, precoPrazo: 800.90 },
        PQS8KG:  { nome: "Extintor PQS 8KG", precoVista: 234.90, precoPrazo: 345.80 },
        PQS6KG:  { nome: "Extintor PQS 6KG", precoVista: 210.50, precoPrazo: 320.00 },
        PQS4KG:  { nome: "Extintor PQS 4KG", precoVista: 180.00, precoPrazo: 250.00 }
    };

    function consultarEstoque(codigo) {
        const produto = estoque[codigo];
        if (produto) {
            return `Produto: ${produto.nome}\nCódigo: ${codigo}\nPreço à vista: R$ ${produto.precoVista}\nPreço a prazo: R$ ${produto.precoPrazo}`;
        } else {
            return `Produto com código "${codigo}" não encontrado.`;
        }
    }

    // Exemplo de uso:
    console.log(consultarEstoque("PQS8KG"));
    // Para testar código inexistente:
    // console.log(consultarEstoque("34"));
})();



function domain_IAPQ(){
    let mp = new Map();
    mp.set(ClipboardItes, "aks")
}