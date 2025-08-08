// /**
//  * Sistema de avaliação de filmes
//  * Com base na avaliação, sistema
//  * faz a classificação e indicação
//  * para o público certo.
//  *
//  * Autor: Henrique P. José
//  * Versão:1.0
//  */

// function SortingFunction(
//   title,
//   duration,
//   category,
//   criticsNotes,
//   releaseYears
// ) {
//   /**
//    * @param {number, string}
//    */
//   this.title = title; //Nome do filme
//   this.duration = duration; //Duração em minutos
//   this.category = category; //Gênero do filme
//   this.criticsNotes = criticsNotes; //Nota de 0 a 10
//   this.releaseYears = releaseYears; //Ano de lançamento
//   this.dataValidation = function () {
//     if (
//       Number.isInteger(Number(this.duration)) ||
//       Number.isInteger(Number(this.criticsNotes)) ||
//       Number.isInteger(Number(this.releaseYears)) ||
//       (typeof this.title && typeof this.category) !== "string"
//     ) {
//       return `Dados de entrada inválidos`;
//     }
//   };
//   this.classificationFilme = function () {
//     //Validador de entrada de dados
//     const classificationIsNumber =
//       typeof this.duration === "number" ? true : false;
//     if (classificationIsNumber && isNaN(this.duration)) {
//       try {
//         if (this.duration < 90) {
//           return "Classificação: Curta";
//         } else if (this.duration >= 90 && this.duration <= 120) {
//           return "Classificação: Média";
//         } else if (this.duration > 120) {
//           return "Classificação: Longa";
//         }
//       } catch (Error) {
//         console.log("O sistema tentou fazer a classificação da duração do filme.");
//         console.log(Error)
//         function converterToInteger() {
//           const durationInteger = Number(this.duration);
//         }
//       }
//     } else {
//     }
//   };
//   this.classificationCritics = function () {
//     if (this.criticsNotes < 4) {
//       return "ruim";
//     } else if (this.criticsNotes <= 4 && this.criticsNotes <= 7) {
//       return "bom";
//     } else if (this.criticsNotes > 7) {
//       return "excelente";
//     }
//   };
//   this.relevanceSortign = function () {
//     const currentDate = new Date().getFullYear();
//     const ageMovie = currentDate - this.releaseYears;
//     if (ageMovie <= 5 && this.criticsNotes > 7) {
//       return "Filme em alta";
//     } else if (ageMovie > 15 && this.criticsNotes > 8) {
//       return "Filme clássico";
//     }
//   };
// }






/** VERSÃO CLAUDE AI */
/**
 * Sistema de Classificação de Filmes
 * Avalia filmes com base em critérios como duração, crítica e ano de lançamento
 * para determinar classificações e recomendações para o público
 *
 * Autor: Desenvolvido como exemplo para aprendizado
 * Versão: 1.0
 */

class FilmeClassificador {
    /**
     * Inicializa um novo filme com suas características
     * @param {string} titulo - Nome do filme
     * @param {number} duracao - Duração em minutos
     * @param {string} categoria - Gênero do filme (ação, drama, comédia, etc.)
     * @param {number} notaCriticos - Nota de 0 a 10 dada pelos críticos
     * @param {number} anoLancamento - Ano em que o filme foi lançado
     */
    constructor(titulo, duracao, categoria, notaCriticos, anoLancamento) {
      this.titulo = titulo;
      this.duracao = duracao;
      this.categoria = categoria;
      this.notaCriticos = notaCriticos;
      this.anoLancamento = anoLancamento;
    }
  
    /**
     * Valida se os dados do filme são corretos
     * @returns {string|null} Mensagem de erro ou null se os dados forem válidos
     */
    validarDados() {
      // Validar tipos de dados
      if (typeof this.titulo !== 'string' || this.titulo.trim() === '') {
        return "Erro: Título deve ser uma string não vazia";
      }
      
      if (typeof this.duracao !== 'number' || isNaN(this.duracao) || this.duracao <= 0) {
        return "Erro: Duração deve ser um número positivo";
      }
      
      if (typeof this.categoria !== 'string' || this.categoria.trim() === '') {
        return "Erro: Categoria deve ser uma string não vazia";
      }
      
      if (typeof this.notaCriticos !== 'number' || isNaN(this.notaCriticos) || this.notaCriticos < 0 || this.notaCriticos > 10) {
        return "Erro: Nota dos críticos deve ser um número entre 0 e 10";
      }
      
      if (typeof this.anoLancamento !== 'number' || isNaN(this.anoLancamento) || !Number.isInteger(this.anoLancamento)) {
        return "Erro: Ano de lançamento deve ser um número inteiro";
      }
      
      const anoAtual = new Date().getFullYear();
      if (this.anoLancamento > anoAtual) {
        return `Erro: Ano de lançamento não pode ser posterior ao ano atual (${anoAtual})`;
      }
      
      return null; // Dados válidos
    }
  
    /**
     * Classifica o filme com base na duração
     * @returns {string} Classificação por duração
     */
    classificarPorDuracao() {
      if (this.duracao < 90) {
        return "Curta";
      } else if (this.duracao <= 120) {
        return "Média";
      } else {
        return "Longa";
      }
    }
  
    /**
     * Classifica o filme com base na nota dos críticos
     * @returns {string} Classificação por crítica
     */
    classificarPorCritica() {
      if (this.notaCriticos < 4) {
        return "Ruim";
      } else if (this.notaCriticos <= 7) {
        return "Bom";
      } else {
        return "Excelente";
      }
    }
  
    /**
     * Determina a relevância do filme baseado no ano e nota
     * @returns {string|null} Classificação por relevância ou null se não aplicável
     */
    classificarPorRelevancia() {
      const anoAtual = new Date().getFullYear();
      const idadeFilme = anoAtual - this.anoLancamento;
      
      if (idadeFilme <= 5 && this.notaCriticos > 7) {
        return "Em alta";
      } else if (idadeFilme > 15 && this.notaCriticos > 8) {
        return "Clássico";
      }
      
      return null; // Não tem classificação especial de relevância
    }
  
    /**
     * Determina o público-alvo sugerido para o filme
     * @returns {string} Público-alvo recomendado
     */
    determinarPublicoAlvo() {
      // Lógica baseada no gênero e classificações
      const categoriaNormalizada = this.categoria.toLowerCase();
      const classificacaoCritica = this.classificarPorCritica();
      
      if (categoriaNormalizada === "terror" || categoriaNormalizada === "suspense") {
        return "Adultos e adolescentes acima de 16 anos";
      } else if (categoriaNormalizada === "animação" || categoriaNormalizada === "família") {
        return "Todas as idades";
      } else if (categoriaNormalizada === "drama" && classificacaoCritica === "Excelente") {
        return "Apreciadores de cinema e adultos";
      } else if (categoriaNormalizada === "ação" && this.duracao > 120) {
        return "Fãs de filmes de ação e adultos";
      } else if (categoriaNormalizada === "comédia") {
        return "Público em geral, ideal para momentos de descontração";
      }
      
      return "Público geral";
    }
  
    /**
     * Gera uma recomendação final baseada em todas as classificações
     * @returns {string} Recomendação final para o filme
     */
    gerarRecomendacaoFinal() {
      const classificacaoDuracao = this.classificarPorDuracao();
      const classificacaoCritica = this.classificarPorCritica();
      const classificacaoRelevancia = this.classificarPorRelevancia();
      
      // Combinações para gerar recomendações personalizadas
      if (classificacaoCritica === "Excelente" && classificacaoDuracao !== "Longa") {
        return "Altamente recomendado! Vale muito a pena.";
      } else if (classificacaoCritica === "Excelente" && classificacaoDuracao === "Longa") {
        return "Ótima opção para quem gosta de filmes longos e de qualidade.";
      } else if (classificacaoCritica === "Ruim") {
        return "Recomendamos procurar outras opções, a menos que seja fã do gênero.";
      } else if (classificacaoRelevancia === "Em alta") {
        return "Está bombando! Não perca a oportunidade de conferir.";
      } else if (classificacaoRelevancia === "Clássico") {
        return "Um clássico imperdível para quem aprecia bom cinema.";
      } else if (classificacaoCritica === "Bom" && classificacaoDuracao === "Média") {
        return "Boa opção para assistir em uma tarde ou noite comum.";
      } else if (classificacaoCritica === "Bom" && classificacaoDuracao === "Curta") {
        return "Ideal para quem tem pouco tempo e quer uma experiência satisfatória.";
      }
      
      return "Filme adequado para os fãs do gênero.";
    }
  
    /**
     * Gera o relatório completo do filme com todas as classificações
     * @returns {string} Relatório formatado do filme
     */
    gerarRelatorio() {
      // Primeiro, validamos os dados
      const erroValidacao = this.validarDados();
      if (erroValidacao) {
        return erroValidacao;
      }
      
      // Obtém todas as classificações
      const classificacaoDuracao = this.classificarPorDuracao();
      const classificacaoCritica = this.classificarPorCritica();
      const classificacaoRelevancia = this.classificarPorRelevancia();
      const publicoAlvo = this.determinarPublicoAlvo();
      const recomendacaoFinal = this.gerarRecomendacaoFinal();
      
      // Formata o relatório
      let relatorio = `
  === RELATÓRIO DO FILME ===
  Título: ${this.titulo}
  Categoria: ${this.categoria}
  Ano de lançamento: ${this.anoLancamento}
  Duração: ${this.duracao} minutos (${classificacaoDuracao})
  Nota dos críticos: ${this.notaCriticos}/10 (${classificacaoCritica})
  `;
  
      // Adiciona classificação de relevância se aplicável
      if (classificacaoRelevancia) {
        relatorio += `Status: ${classificacaoRelevancia}\n`;
      }
      
      // Adiciona público-alvo e recomendação final
      relatorio += `
  Público-alvo: ${publicoAlvo}
  Recomendação: ${recomendacaoFinal}
  `;
  
      return relatorio;
    }
  }
  
  // Função para testar o sistema com alguns exemplos
  function testarSistemaClassificacao() {
    // Filme recente com boa avaliação
    const filme1 = new FilmeClassificador(
      "Oppenheimer", 
      180, 
      "Drama histórico", 
      9.2, 
      2023
    );
    
    // Filme mediano
    const filme2 = new FilmeClassificador(
      "Comédia Qualquer", 
      95, 
      "Comédia", 
      6.5, 
      2022
    );
    
    // Filme clássico
    const filme3 = new FilmeClassificador(
      "Pulp Fiction", 
      154, 
      "Crime/Drama", 
      8.9, 
      1994
    );
    
    // Filme com avaliação ruim
    const filme4 = new FilmeClassificador(
      "Fracasso Total", 
      85, 
      "Ação", 
      2.3, 
      2021
    );
    
    // Filme com dados inválidos
    const filme5 = new FilmeClassificador(
      "", 
      -10, 
      "Ficção", 
      12, 
      2030
    );
    
    console.log(filme1.gerarRelatorio());
    console.log(filme2.gerarRelatorio());
    console.log(filme3.gerarRelatorio());
    console.log(filme4.gerarRelatorio());
    console.log(filme5.gerarRelatorio());
  }
  
  // Executa o teste
  testarSistemaClassificacao();