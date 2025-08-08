class Handler{
    setNext(handler){
        this.next = handler;
        return handler;
    }
}

class BaseHandler extends Handler{
    constructor(next){
        this.next = next;
    }
    setNext(handler){
        this.next = handler;
        return handler;
    }
    handle(request){
        if(this.next != null){
            return this.next.handle(request)
        }
    }
}

class ConcreteHandlers extends Handler{
    handle(request){
        if(canHandle(request)){
            // ...
        }else{
           parent.handle(request)
        }
    }
}


class AbstractClassHandler{
    setNext(hanlder){
        this.next = handler;
        return handler;
    }
}


//Definindo uma subclasse - Guia Definitivo página 223, 224
class ConcreteClassHandler extends AbstractClassHandler{};
class ConcreteClassBase extends AbstractClassHandler{};
ConcreteClassBase.prototype = inherit(AbstractClassHandler.prototype);
ConcreteClassHandler.prototype = inherit(AbstractClassHandler.prototype);

function defineSubclass(superclass,
    constructor,
    methods,
    statics
){
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;

    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);

    return constructor;
}

Function.prototype.extend = function(constructor, methods, statics){
    return defineSubclass(this,constructor, methods, statics);
}