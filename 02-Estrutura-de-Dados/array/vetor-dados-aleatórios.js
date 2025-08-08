// Função geradora dos dados aleatórios para o vetor
function geradorAleatorio(tamanho = 10) {
    const vetor = [];
    const stringAleatoria = () => {
        const letras = 'abcdefghijklmnopqrstuvwxyz';
        let resultado = '';
        for (let i = 0; i < 5; i++) {
            resultado += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        return resultado;
    };

    for (let index = 0; index < tamanho; index++) {
        const numeroAleatorio = Math.floor(Math.random() * 100);
        vetor.push({
            nome: stringAleatoria(),
            valor: numeroAleatorio
        });
    }

    return vetor;
}

const vetorAleatorio = geradorAleatorio(10);

// Busca binária iterativa
function buscaBinaria(V, inicio, fim, e) {
    while (inicio <= fim) {
        const i = Math.floor((inicio + fim) / 2);
        if (V[i] === e) {
            return i;
        }
        if (V[i] < e) {
            inicio = i + 1;
        } else {
            fim = i - 1;
        }
    }
    return -1;
}

// Exemplo de uso:
const arrayOrdenado = vetorAleatorio
    .sort((a, b) => a.valor - b.valor)
    .map(item => item.valor);

const elementoProcurado = 12;

const resultado = buscaBinaria(arrayOrdenado, 0, arrayOrdenado.length - 1, elementoProcurado);

if (resultado !== -1) {
    console.log(`Elemento encontrado no índice ${resultado}`);
} else {
    console.log("Elemento não encontrado no array");
}
