<?php

class A
{
    public function getNome(A){
        echo 'Meu nome é A';
    }
}

class B extends
{
    public function getNome(B){
        echo 'Meu nome é B';
    }
}

$objeto1 = new A();
$objeto2 = new B();


function imprimeNome(A $objeto){
    return $objeto->getNome();
}

imprimeNome($objeto1); //Meu nome é A
imprimeNome($objeto2); //Meu nome é B
?>