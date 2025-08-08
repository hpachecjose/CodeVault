/**
 * Definição para lista ligada simples.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Soma dois números representados por listas ligadas.
 * @param {ListNode} l1 - Primeiro número (lista ligada)
 * @param {ListNode} l2 - Segundo número (lista ligada)
 * @return {ListNode} - Lista ligada com o resultado da soma
 */
var addTwoNumbers = function(l1, l2) {
    // Nó fictício para facilitar a construção da lista de resultado
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0; // Variável para armazenar o "vai um"

    // Percorre as listas enquanto houver nós ou carry
    while (l1 !== null || l2 !== null || carry > 0) {
        // Pega o valor do nó atual ou 0 se for nulo
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;

        // Soma os valores e o carry
        let sum = val1 + val2 + carry;

        // Atualiza o carry para a próxima iteração
        carry = Math.floor(sum / 10);

        // Cria um novo nó com o dígito da unidade da soma
        current.next = new ListNode(sum % 10);

        // Avança para o próximo nó
        current = current.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    // Retorna a lista ligada resultante (ignorando o nó fictício)
    return dummy.next;
};