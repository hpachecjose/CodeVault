// O padrão de design Singleton é um dos padrões de criação mais conhecidos. 
// Ele garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a essa instância.

// Vamos criar uma classe Singleton em JavaScript.

class Singleton {
    constructor() {
      // Verifica se já existe uma instância da classe
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      // Se não existir, cria a instância e armazena em uma propriedade estática
      Singleton.instance = this;
  
      // Propriedades e métodos da classe Singleton
      this.data = "Dados da instância única";
    }
  
    // Método para obter dados
    getData() {
      return this.data;
    }
  
    // Método para definir dados
    setData(newData) {
      this.data = newData;
    }
  }
  
  // Testando o padrão Singleton
  const instance1 = new Singleton();
  console.log(instance1.getData()); // Saída: Dados da instância única
  
  const instance2 = new Singleton();
  console.log(instance2.getData()); // Saída: Dados da instância única
  
  // Modificando os dados através de instance2
  instance2.setData("Novos dados da instância única");
  
  // Ambos instance1 e instance2 compartilham a mesma instância
  console.log(instance1.getData()); // Saída: Novos dados da instância única
  console.log(instance1 === instance2); // Saída: true
  
  // Note que instance1 e instance2 são a mesma instância