// Número inteiro e decimal
let idade = 30;           // int
let temperatura = 22.5;   // float

// Booleano
let ligado = true;

// Caractere? Em JS, usamos string mesmo
let letra = 'A';

// String
let saudacao = "Olá, Henrique!";

// Null e Undefined
let valorNulo = null;
let indefinido; // undefined por padrão

// Symbol (tipo único e imutável)
let simboloUnico = Symbol("id");

// BigInt (para números inteiros MUITO grandes)
let numeroGrande = 1234567890123456789012345678901234567890n;

// Array
let frutas = ["maçã", "banana", "laranja"];

// Objeto (semelhante a struct ou dicionário)
let pessoa = {
  nome: "Henrique",
  idade: 25,
  ativo: true
};

// Função (que também é um tipo de dado em JS!)
function saudacao() {
  return "Bom dia!";
}

// Tupla não existe oficialmente, mas você pode usar arrays com posições fixas
let tuplaFake = ["texto", 42];

// Map (estrutura chave-valor)
let mapa = new Map();
mapa.set("cor", "azul");

// Set (coleção de valores únicos)
let conjunto = new Set([1, 2, 3, 3]); // apenas 1, 2, 3 serão mantidos


// Enum? Em JS usamos objetos ou constantes
const Status = {
  ATIVO: "ativo",
  INATIVO: "inativo",
  PENDENTE: "pendente"
};

// Tipos customizados com classes
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  emitirSom() {
    console.log("Som genérico");
  }
}

let cachorro = new Animal("Tobby");





//Tipos compostos
// Array
let frutas1 = ["maçã", "banana", "laranja"];

// Objeto (semelhante a struct ou dicionário)
let pessoa1 = {
  nome: "Henrique",
  idade: 25,
  ativo: true
};

// Função (que também é um tipo de dado em JS!)
function saudacao() {
  return "Bom dia!";
}

// Tupla não existe oficialmente, mas você pode usar arrays com posições fixas
let tuplaFake1 = ["texto", 42];

// Map (estrutura chave-valor)
let mapa1 = new Map();
mapa.set("cor", "azul");

// Set (coleção de valores únicos)
let conjunto1 = new Set([1, 2, 3, 3]); // apenas 1, 2, 3 serão mantidos





//Tipos avançados e abstratos

// Enum? Em JS usamos objetos ou constantes
const Statusw = {
  ATIVO: "ativo",
  INATIVO: "inativo",
  PENDENTE: "pendente"
};

// Tipos customizados com classes
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  emitirSom() {
    console.log("Som genérico");
  }
}

let cachorrow = new Animal("Tobby");


