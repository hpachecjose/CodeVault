/**Vamos criar um mecanismo chamado de Handler que gerencia eventos no código
 * O eventos serão uma entidade, um objeto por exemplo que fará três tipos de 
 * ação para que o código retorne uma mensagem de sucesso:
 *   - Verifica se na porta do sistema foi recebido o dado
 *   - Verifca   verifica o tipo de dado
 *   - Verifica  faz a manipulação do dado de entrada
 */


//Função construtora que gera tipos de dados aleatórios
function createData(value){
    return{
        value: value,
        add: function(){
         async function fetchData(){
            try{
                const response = await fetch("Olá mundo")
                if(!response) throw new Error("Falha na autenticação")
                    const data = await response.json()
            }catch(Error){
                console.log("Erro:", Error.message)
            }finally{

            }
         }
        }
    }
}

var dataValue = createData(123)

const result = dataValue
console.log(result)

function System(data){

}