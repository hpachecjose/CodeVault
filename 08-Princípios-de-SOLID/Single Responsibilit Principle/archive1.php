

//Sem o Principio de Responsabilidade Única

<?php

class Order
{
    //Manipulação dos dados
    public function calculateTotalSum(){/*...*/}
    public function getItems(){/*...*/}
    public function getItemCount(){/*...*/}
    public function addItem($item){/*...*/} 
    public function deleteItem($item){/*...*/}

    //Exibição dos dados
    public function printOrder(){/*...*/}
    public function showOrder(){/*...*/}

    //Persistência dos dados
    public function load(){/*...*/}
    public function save(){/*...*/}
    public function update(){/*...*/}
    public function delete(){/*...*/}

}



