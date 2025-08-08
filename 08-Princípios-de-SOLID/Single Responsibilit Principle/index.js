// class Order {
//   constructor() {}
//   calculaTotalItem() {}
//   calculaTotalPedido() {}
//   adicionaItem() {}
//   removeItem() {}
//   aplicaDesconto() {}
//   adicionaFrete() {}
//   aplicaImposto() {}
// }



// //Forma correta utilizando o conceito de Single Responsibility Principle
// class Order {
//     constructor() {
//         this.items = [];
//         this.total = 0;
//         this.discount = 0;
//         this.shipping = 0;
//         this.tax = 0;
//     }

//     addItem(item) {
//         this.items.push(item);
//     }

//     removeItem(item) {
//         const index = this.items.indexOf(item);
//         if (index > -1) {
//             this.items.splice(index, 1);
//         }
//     }

//     getTotal() {
//         return this.total;
//     }

//     getItems() {
//         return this.items;
//     }
// }




// class OrderCalculator {
//     static calculateTotalItem(item) {
//         return item.price * item.quantity;
//     }

//     static calculateTotalOrder(order) {
//         let total = 0;
//         for (const item of order.getItems()) {
//             total += this.calculateTotalItem(item);
//         }
//         return total;
//     }
// }



// class OrderDiscount {
//     static applyDiscount(order, discount) {
//         order.total -= discount;
//     }
// }


// class OrderTax {
//     static applyTax(order, taxRate) {
//         order.total += order.total * taxRate;
//     }
// }

// class OrderShipping {
//     static addShipping(order, shipping) {
//         order.total += shipping;
//     }
// }



class Expressao {
    #valorInicial = 0;
    #valorFinal = 100;
    #valorAlterador = 1.009;
  
    constructor(input, taxaVariacao) {
      this.input = input;
      this.taxaVariacao = taxaVariacao;
    }
  
    #intervaloTaxa() {
      if (this.input >= this.#valorInicial && this.input <= this.#valorFinal) {
        return this.taxaVariacao * this.#valorAlterador;
      } else {
        throw new Error("Input fora do intervalo permitido.");
      }
    }
  
    calcularTaxa() {
      return this.#intervaloTaxa();
    }
  }
  
  // Exemplo de uso
  const expressao = new Expressao(12, 54);
  console.log(expressao.calcularTaxa());







