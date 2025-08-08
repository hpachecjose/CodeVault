// import {lista} from './lista.js'; 
 
 
//     //Classica nome
//     classficaNome = function(){
//         //Primeira letra do nome tem que ser string e maiúscula
//         if(typeof this.nome[0] === "string" && typeof this.nome[0].toLocaleUpperCase === this.nome[0]){
//             //O primeiro nome deve ter inicial entre A e D
//             if(this.nome[0]>= 'A' && this.nome[0] <= 'D'){
//                 //A idade deve ser maior de 18 anos
//                   function classificaIdade(){
//                     if(this.idade > 18){

//                         //Uma função que exporta este dado para outro módulo

//                     }
//                   }
//             }
//         }else{
//             return 'Nome inválido';
//         }
//     }





import { lista } from './lista.js'; 

class Classifica {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    classificaNome() {
        // Primeira letra do nome deve ser string e maiúscula
        if (typeof this.nome[0] === "string" && this.nome[0] === this.nome[0].toUpperCase()) {
            // O primeiro nome deve ter inicial entre A e D
            if (this.nome[0] >= 'A' && this.nome[0] <= 'D') {
                return this.classificaIdade();
            }
        } else {
            return 'Nome inválido';
        }
    }

    classificaIdade() {
        if (this.idade > 18) {
            return { nome: this.nome, idade: this.idade }; // Retorna os dados
        }
        return 'Idade abaixo de 18 anos';
    }}

    // Exemplo para usar o código
    const pessoa = new Classifica('Ana', 25);
    const resultado = pessoa.classificaNome();
    console.log(resultado); // Exibe os dados ou uma mensagem de erro