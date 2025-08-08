class PLog{
    constructor(name, size, unit){
        this.name = name;
        this.size = size;
        this.unit = unit;
        this.date = new Date();
    }
    setPLog(name, size){
        this.name = name;
        this.size = size;
        this.unit = this.unit;
    }
    getPLog(){
        return `Name: ${this.name}, Size: ${this.size}, Unit: ${this.unit}, Date: ${this.date}`;
    }
}
const pLog = new PLog("PLog Event", 10, "KB");
console.log(pLog.getPLog());

class PLogEvent extends PLog{
    constructor(name, size, unit, eventType){
        super(name, size, unit);
        this.eventType = eventType;
    }
    getPLogEvent(){
        return `Event Type: ${this.eventType}, Name: ${this.name}, Size: ${this.size}, Unit: ${this.unit}, Date: ${this.date}`;
    }

}




class Start{
    constructor(){}
    init(){
       try{
        if(this.input !== null){
            return "Sistema iniciado com sucesso!"
        }
       }catch(Error){
        return "Erro ao iniciar o sistema!";
        function reestart(){
            if(this.input !== null){
                return "Sistema reiniciado com sucesso!"
            }else{
                return "Contate o suporte!";
            }
        }
       }finally{
        console.log("Sistema iniciado!");
       }
    }
}

class StartMotor extends Start{
    constructor(inputMotor){
        this.inputMotor = inputMotor;
        super(inputMotor);
    }
    startMotor(){
        if(this.inputMotor !== null){
            return "Motor iniciado com sucesso!"
        }
    }
}

class StartMotorVentoinha extends StartMotor{
    constructor(inputMotorVentoinha){
        this.inputMotorVentoinha = inputMotorVentoinha;
        super(inputMotorVentoinha);
    }
    startMotorVentoinha(){
        if(this.inputMotorVentoinha !== null){
            return "Motor da ventoinha iniciado com sucesso!"
        }
    }
}