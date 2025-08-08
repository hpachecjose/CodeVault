//  1º montar a classe que constrói o grafo

class $GrafoInformacaoCidade {
  constructor(nomeCidade, tamanhoCidade, popCidade) {
    this.nomeCidade = nomeCidade;
    this.tamanhoCidade = tamanhoCidade;
    this.popCidade = popCidade;
    //Propriedade única para cada instância de  objeto
    //Ou seja cada instância terá seu próprio método
    this.coordCidade = function () {
    
        
    };
  }


  //Escopo interno da classe $GrafoInformacaoCidade


  //Método de análise de dados
  analiseValoresInseridos(){
    if(this.nomeCidade == null || this.tamanhoCidade == null || this.popCidade == null){
        console.log("Valores inválidos");}else
        if(this.nomeCidade == "" || this.tamanhoCidade == "" || this.popCidade == ""){
            console.log("Valores inválidos");}else
            if(this.tamanhoCidade < 0 || this.popCidade < 0){
                console.log("Valores inválidos");}else
                if(this.tamanhoCidade > 1000000 || this.popCidade > 1000000){
                    console.log("Valores inválidos");}else{
                        console.log("Valores válidos");
                    }
}
   tratamentoDeValoresDeDados(){
        
   }





}
