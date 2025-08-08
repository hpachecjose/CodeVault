/**
 * Sistema de Avaliação de Empréstimo
 * Este programa avalia se um cliente pode receber um empréstimo baseado em
 * sua pontuação de crédito, renda mensal e valor solicitado.
 */

const main = function() {
    /**
     * Classe Cliente representa um cliente que solicita empréstimo
     */
    class Cliente {
        /**
         * Inicializa um novo cliente com suas informações financeiras
         * @param {number} pontuacao - Pontuação de crédito (0-1000)
         * @param {number} rendaMensal - Renda mensal do cliente
         * @param {number} valorEmprestimo - Valor do empréstimo solicitado
         */
        constructor(pontuacao, rendaMensal, valorEmprestimo) {
            // Atribuição correta dos parâmetros às propriedades da classe
            this.pontuacao = pontuacao;
            this.rendaMensal = rendaMensal;
            this.valorEmprestimo = valorEmprestimo;
        }

        /**
         * Valida se os dados do cliente são válidos para análise
         * @returns {string|null} Mensagem de erro ou null se válido
         */
        validarDados() {
            // Verifica se os valores são números
            if (isNaN(this.pontuacao) || isNaN(this.rendaMensal) || isNaN(this.valorEmprestimo)) {
                return "Dados inválidos! Todos os valores devem ser números.";
            }
            
            // Verifica se a pontuação está no intervalo válido (0-1000)
            if (this.pontuacao < 0 || this.pontuacao > 1000) {
                return "Pontuação de crédito inválida! Deve estar entre 0 e 1000.";
            }
            
            // Verifica se a renda e o valor do empréstimo são positivos
            if (this.rendaMensal <= 0) {
                return "Renda mensal inválida! Deve ser um valor positivo.";
            }
            
            if (this.valorEmprestimo <= 0) {
                return "Valor do empréstimo inválido! Deve ser um valor positivo.";
            }
            
            return null; // Dados válidos
        }

        /**
         * Analisa a solicitação de empréstimo com base nas regras definidas
         * @returns {string} Resultado da análise (aprovado ou negado)
         */
        regraAnalise() {
            // Primeiro validamos os dados do cliente
            const erroValidacao = this.validarDados();
            if (erroValidacao) {
                return erroValidacao;
            }
            
            // Se a pontuação for menor que 300, empréstimo é automaticamente negado
            if (this.pontuacao < 300) {
                return "Empréstimo NEGADO! Motivo: Pontuação de crédito insuficiente.";
            }
            
            let taxaJuros, limiteEmprestimo;
            
            // Definindo taxa de juros e limite de empréstimo com base na pontuação
            if (this.pontuacao >= 300 && this.pontuacao <= 600) {
                taxaJuros = 20;
                limiteEmprestimo = this.rendaMensal * 3;
            } else if (this.pontuacao >= 601 && this.pontuacao <= 800) {
                taxaJuros = 15;
                limiteEmprestimo = this.rendaMensal * 6;
            } else { // pontuação > 800
                taxaJuros = 10;
                limiteEmprestimo = this.rendaMensal * 10;
            }
            
            // Verifica se o valor solicitado está dentro do limite permitido
            if (this.valorEmprestimo > limiteEmprestimo) {
                return `Empréstimo NEGADO! Motivo: Valor solicitado (R$ ${this.valorEmprestimo.toFixed(2)}) excede o limite permitido (R$ ${limiteEmprestimo.toFixed(2)}) para sua faixa de crédito.`;
            }
            
            // Calcula o valor total a ser pago (principal + juros)
            const valorTotal = this.valorEmprestimo * (1 + taxaJuros / 100);
            
            // Formata a mensagem de aprovação com os valores calculados
            return `Empréstimo APROVADO! Valor: R$ ${this.valorEmprestimo.toFixed(2)}, Taxa de juros: ${taxaJuros}%, Valor total a pagar: R$ ${valorTotal.toFixed(2)}`;
        }
    }

    // Exemplos de uso
    console.log("\n=== EXEMPLOS DE ANÁLISE DE EMPRÉSTIMO ===");
    
    // Cliente com baixa pontuação - deve ser negado
    const cliente1 = new Cliente(100, 1000, 5000);
    console.log("Cliente 1:", cliente1.regraAnalise());
    
    // Cliente com pontuação média mas pedindo valor alto demais
    const cliente2 = new Cliente(500, 2000, 7000);
    console.log("Cliente 2:", cliente2.regraAnalise());
    
    // Cliente com pontuação média e valor dentro do limite
    const cliente3 = new Cliente(500, 2000, 5000);
    console.log("Cliente 3:", cliente3.regraAnalise());
    
    // Cliente com boa pontuação
    const cliente4 = new Cliente(850, 3000, 25000);
    console.log("Cliente 4:", cliente4.regraAnalise());
    
    // Cliente com dados inválidos
    const cliente5 = new Cliente(-50, 1000, 3000);
    console.log("Cliente 5:", cliente5.regraAnalise());
};

// Executa a função principal
main();