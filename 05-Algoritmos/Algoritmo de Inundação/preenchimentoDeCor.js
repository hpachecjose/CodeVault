/** Exemplo tirado do site
 * https://www.freecodecamp.org/portuguese/news/algoritmo-de-preenchimento-por-inundacao-explicado/
 * Continua a construção do algoritmo de preenchimento por inundação
 */




function preenchimentoDeCor(r,g,b){
    //Primeiro vamos criar uma classe para
    //criar uma cor substituta
    class CorSubstituta{
        constructor(r,g,b){
            this.r = r;
            this.g = g;
            this.b = b;
        }
    }

    const corSubstituta = new CorSubstituta(r,g,b);
    corSubstituta.r = Math.floor(Math.random()*255);
    corSubstituta.g = Math.floor(Math.random()*255);
    corSubstituta.b = Math.floor(Math.random()*255);

    //Criando um Array bidimensional para armazenar os pixels
    const pixels = [];
    const linhas = 10;
    const colunas = 10;
    for(let i=0;i<linhas;i++){
      pixels[i] = [];
      for(let j=0;i<colunas;j++){
        pixels[i][j] = {
          r: Math.floor(Math.random()*255),
          g: Math.floor(Math.random()*255),
          b: Math.floor(Math.random()*255)
        };
      }

    }

    return pixels

}

preenchimentoDeCor(255,0,0);
console.log(preenchimentoDeCor(255,0,0));