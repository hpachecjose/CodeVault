/**Fatorial de um número
 * é um tipo de algoritmo
 * recursivo, isto é,
 * um algoritmo que chama a si mesmo.
 */

function fatorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fatorial(n - 1);
  }
}

for (let i = 0; i <= 10; i++) {
  console.log(`Fatorial de ${i} é ${fatorial(i)}`);
}
