class Pasta {
  constructor(nome) {
    this.nome = nome;
    this.arquivos = [];
    this.subpastas = [];
  }

  // Adiciona um arquivo à pasta
  adicionarArquivo(nome, tamanho) {
    this.arquivos.push({ nome, tamanho });
    return this; // Para permitir method chaining
  }

  // Adiciona múltiplos arquivos de uma vez
  adicionarArquivos(...arquivos) {
    arquivos.forEach(arquivo => {
      if (typeof arquivo === 'object' && arquivo.nome && arquivo.tamanho) {
        this.arquivos.push(arquivo);
      }
    });
    return this;
  }

  // Cria e adiciona uma subpasta
  criarSubpasta(nome) {
    const subpasta = new Pasta(nome);
    this.subpastas.push(subpasta);
    return subpasta; // Retorna a subpasta para permitir configuração
  }

  // Adiciona uma subpasta já existente
  adicionarSubpasta(pasta) {
    if (pasta instanceof Pasta) {
      this.subpastas.push(pasta);
    }
    return this;
  }

  // Calcula o tamanho total da pasta (incluindo subpastas)
  calcularTamanhoTotal() {
    const tamanhoArquivos = this.arquivos.reduce((total, arquivo) => total + arquivo.tamanho, 0);
    const tamanhoSubpastas = this.subpastas.reduce((total, subpasta) => total + subpasta.calcularTamanhoTotal(), 0);
    return tamanhoArquivos + tamanhoSubpastas;
  }

  // Busca um arquivo por nome (recursivamente)
  buscarArquivo(nomeArquivo) {
    // Busca na pasta atual
    const arquivo = this.arquivos.find(arquivo => arquivo.nome === nomeArquivo);
    if (arquivo) return arquivo;

    // Busca nas subpastas
    for (const subpasta of this.subpastas) {
      const arquivoEncontrado = subpasta.buscarArquivo(nomeArquivo);
      if (arquivoEncontrado) return arquivoEncontrado;
    }

    return null;
  }

  // Exibe a estrutura da pasta
  exibirEstrutura(indentacao = 0) {
    const espacos = '  '.repeat(indentacao);
    console.log(`${espacos}📁 ${this.nome}/`);
    
    this.arquivos.forEach(arquivo => {
      console.log(`${espacos}  📄 ${arquivo.nome} (${arquivo.tamanho} bytes)`);
    });

    this.subpastas.forEach(subpasta => {
      subpasta.exibirEstrutura(indentacao + 1);
    });
  }

  // Converte para o formato do objeto original
  toObject() {
    return {
      nome: this.nome,
      arquivos: [...this.arquivos],
      subpastas: this.subpastas.map(subpasta => subpasta.toObject())
    };
  }
}

// Exemplo de uso - Criando a estrutura do seu objeto:
const pasta = new Pasta("Documentos")
  .adicionarArquivo("arquivo1.txt", 200)
  .adicionarArquivo("arquivo2.txt", 100);

// Criando subpasta Imagens
const imagens = pasta.criarSubpasta("Imagens")
  .adicionarArquivo("foto1.jpg", 500)
  .adicionarArquivo("foto2.jpg", 300);

// Criando subpasta Projetos
const projetos = pasta.criarSubpasta("Projetos");

// Criando Projeto1 dentro de Projetos
const projeto1 = projetos.criarSubpasta("Projeto1")
  .adicionarArquivo("relatorio.pdf", 400);

// Testando a classe
console.log("=== Estrutura da pasta ===");
pasta.exibirEstrutura();

console.log("\n=== Objeto gerado ===");
console.log(JSON.stringify(pasta.toObject(), null, 2));

console.log("\n=== Informações úteis ===");
console.log(`Tamanho total: ${pasta.calcularTamanhoTotal()} bytes`);
console.log(`Arquivo encontrado:`, pasta.buscarArquivo("foto1.jpg"));
console.log(`Arquivo não encontrado:`, pasta.buscarArquivo("inexistente.txt"));