var str = 'Terminal Root';

if(str.match(/Mars/)){
    console.log('Encontrou.')
}else{
    function cria(){
         let str2 = ' ';
        let random = Math.floor(Math.random() * 2);
        if(random === 0){str2 = 0}else if(random === 1){ str2 = 1}
       
        var response = str.match(/1/) ? true : false;
        if(response){return true}else{return false}
    }
   console.log( cria())
}