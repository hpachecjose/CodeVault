//Um exemplo de handle em React, para leitura de eventos 
//feito por usuários  clique em botão, etc

function ButtonComponent(){
    const handleClick = () =>{
        console.log("Botão de clique no React!")
    };

    return <button onClick={handleClick}>Clique aqui</button>
}


function ClickButton(){
    const hanleButtonClick = () =>{
        var init = () =>{
            var message = "Olá mundo"
            function View(){ return message}
        }
    }
}

function OnSubmitData(){
    const handleOnSubmitData = () =>{
        //Código aqui
    }
}

function OnChange(){
    const handleOnChange = () =>{
        //Código aqui
    }
}




const EventHandlerOnclickMouse = () =>{
    const onclickButtonMouse = true
    onclickButtonMouse === true? true : false
    if(onclickButtonMouse){ return console.log("Sucess")}else{
        try{
            onclickButtonMouse = true
            return true
        }catch(ErrorEventClick){
            //Tratando o erro
        }
    }
}