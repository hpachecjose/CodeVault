class ComponentWith{
    showHelp(){

    }
}

class Component extends ComponentWith{
    constructor(container, tooltipText){
        this.container = container;
        this.tooltipText = tooltipText;
        class Button extends Component{

        }
    }
    showHelp(){
        if(tooltipText != null){
            //Mostrar descrição
        }else{
            //ou pedir para o conteiner fazer isso.
            this.container.showHelp();
        }
    }
}

class Container extends ComponentWith{
    constructor(children){
        this.children = children;
    }
    add(child){
        children.add(child)
        child.container = this
    }
}

class Panel extends Container{
    constructor(modalHelpText){
        this.modalHelpText = modalHelpText;
    }
    showHelp(){
        if(modalHelpText != null){
            //Mostrar alguma janela modal com 
            //algum texto de ajuda
        }else{
            parent.showHelp()
        }
    }
}

class Dialog extends Container{
    constructor(wikiPageUrl){
        this.wikiPageUrl = wikiPageUrl;
    }
    showHelp(){
        if(this.wikiPageUrl != null){
            //Mostra uma página do Wiki
        }else{
            parent.showHelp()
        }
    }
}

class Application{
    createUI(){
        dialog = new Dialog("Budgets Reports");
        dialog.wikiPageUrl = "http://...";
        panel = new Panel(0,0,400,800);
        panel.modalHelpText = "This panel does...";
        ok = new Button(250, 760, 50, 20, "OK");
        ok.tooltipText = "This is an OK button that...";
        cancel = new Button(320, 760, 50, 20, "Cancel");

        panel.add(ok);
        panel.add(cancel);
        dialog.add(panel);
    }

    onF1KeyPress(){
        component = this.getComponentAtMouseCoords();
        component.showHelp();
    }
}