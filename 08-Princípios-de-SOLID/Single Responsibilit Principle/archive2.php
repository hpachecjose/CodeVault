<!-- Com o Principio de Responsabilidade Única - incrementação da lógica  
 das classes pelo Copilot Github 

O princípio da responsabilidade única não se limita somente a classes, ele 
também pode ser aplicado em métodos e funções, ou seja, tudo que é responsável 
por executar uma ação, deve ser responsável por apenas aquilo que se propõe 
a fazer.


-->

<?php

class Order
{
    //Manipulação dos Dados
    private $items = [];

    public function calculateTotalSum(){/*...*/}
    public function getItems(){
        return $items;
    }
    public function getItemCount(){
        return count($this->items);
    }
    public function addItem($item){
        $this->items[] = $item;
    }
    public function deleteItem($item){
        if(($key = array_search($item, $this->items)) !== false) {
            unset($this->items[$key]);
        }
    }
}


class OrderRepository
{
    //Persistência dos Dados
    public function load($orderId){/*...*/}
    public function save(Order $order){/*...*/}
    public function update(Order $order){/*...*/}
    public function delete($orderId){/*...*/}
}


class OrderPrinter
{
    public function printOrder(Order $order){/*...*/}
    public function showOrder(Order $order){/*...*/}
}