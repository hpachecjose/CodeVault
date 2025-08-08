class JFrame{
    constrctor(length, width){
        this.length = length;
        this.width = width;
    }
    getArea(){
        if(this.length !== null && this.width !== null){
           const area = this.length * this.width;
           return area;
        }
    }
}


class Computer extends JFrame{
    constructor(length, width, brand, model){
        super(length, width);
        this.brand = brand;
        this.model = model;
    }
    getInfo(){
        return `Brand: ${this.brand}, Model: ${this.model}`;
    }
}