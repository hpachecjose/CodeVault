process.stdin.setEncoding('utf8');
process.stdin.resume();

let valorEntradaUsuario = [];
const quantidadeValores = 5;

console.log(`Digite ${quantidadeValores} valores:`);

process.stdin.on('data', function(data){
   let entradas = data.trim().split(/\s+/);


    valorEntradaUsuario = data.trim();

    function main(){
        let negativo = 0;
        for(let index = 1; index <=5; index++){
            if(valorEntradaUsuario < 0){
                negativo++;
            }
        }
    }
})