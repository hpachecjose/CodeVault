const fs = require('fs');

const jsonString = '{"nome": "Maria", "idade": 25, "cidade": "Recife"}';

const objeto = JSON.parse(jsonString);

console.log(objeto.nome); // Maria
console.log(objeto.idade); // 25

//Lendo um arquivo JSON externo no Node.js
function lerArquivoJSONExterno() {
    fs.readFile('DATA_SET.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }
        const jsonData = JSON.parse(data);
        console.log(jsonData); // Exibe todos os dados do arquivo
    });
}

lerArquivoJSONExterno();