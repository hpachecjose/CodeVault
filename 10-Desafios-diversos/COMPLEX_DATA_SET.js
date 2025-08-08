/**
 *     Dentro deste código, são gerados dados complexos
 *    que podem ser utilizados para testes ou simulações.
 * 
 *     Os dados, por sua vez, são estruturados em um objeto
 *    que contém informações como nome, idade e cidade.
 * 
 *    É possível salvar esses dados em formato JSON, 
 *    tanto no navegador quanto no Node.js.
 */



class Dados {
    constructor(nome, idade, cidade) {
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
    }
}

Dados.prototype.converteParaJSON = function() {
    return JSON.stringify(this, null, 2);
};

Dados.prototype.salvaNoDataSet = function(nomeArquivo){
    const fs = require('fs');

    let dadosArray = [];

    //Tenta ler o arquivo

    try{
        if(fs.existsSync(nomeArquivo)){
            const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
            if(conteudo.trim() !== ""){
                dadosArray = JSON.parse(conteudo);//Realiza a leitura do arquivo
                //Se não for array, faz um array
                if(!Array.isArray(dadosArray)){
                    dadosArray = [dadosArray];
                }
            }
        }
    }
    catch(error){
        console.error(`Erro ao ler o arquivo: ${error.message}`);
        //Se erro, começa com array vazio
        dadosArray = [];
    }

    //Adiciona um novo registro
    dadosArray.push(this);

    //Escreve de volta 
    fs.writeFile(nomeArquivo, JSON.stringify(dadosArray, null, 2), (err) =>{
        if(err){
            console.error(`Erro ao escrever no arquivo: ${err.message}`);
        }else{
            console.log(`Arquivo ${nomeArquivo} atualizado com sucesso!`);
        }
    });
};

//Coleta de dados do usuário utilizando o recurso process.stdin
process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', function(data) {
    const entradas = data.trim().split(/\s+/);
    const nome = entradas[0];
    const idade = parseInt(entradas[1], 10);
    const cidade = entradas[2];

    const dadosUsuario = new Dados(nome, idade, cidade);

    // Salvar no Node.js
    dadosUsuario.salvaNoDataSet("DATA_SET.json");

    process.exit();
});