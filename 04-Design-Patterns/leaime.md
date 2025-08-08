

# O que é bom:
- Você não precisa reinventar a roda
- Padrões universais facilitam o entendimento do seu projeto
- Evita refatoração desnecessária
- Ajuda na reutilização de código(conceito DRY - Don't repeat yourself)
- Abstrai e nomeia partes particulares do projeto
- Ajuda na aplicação dos princípios do design orientadoa a objetos(SOLID)
- Facilita a criação de testes unitários
# O que é ruim
- Alguns padrões podem ser complexos até que você os compreenda
- Muito código para atingir um objetivo simples
- Podem trazer otimizações prematuras para o seu código(YAGNI-You Ain't Gonna Need It)
- Se usados incorretament, podem atrapalhar ao invés de ajudar

# Como funciona o Factory Method

## Partes do código Conceito em Java Script

Vamos usar como exemplo, um sistema de notificação em que utiliza-se três tipos de notificações: SMS, Email e Push.

- Sistema de Notificação

/
  
    
    
    //Interface para os produtos(Notificações) classe abstrata
    
    class Notification{
      constructor(){
        if(new.target === Notification){
            throw new Error("Esta é uma classe abstrata e não pode ser instanciada diretamente!")
        }
    }
    
    send(message) {
      throw new Error("Este método deve ser sobrescrito!");
    }
    }

    //Implementações concretas dos produtos - classes concretas
    class EmailNotification extends Notification{
        send(message){
            console.log(`Notificação via Email. Mensagem:${message}`)
        }
    }
    class SMSNotification extends Notification{
        send(message){
            console.log(`Notificação via SMS. Mensagem: ${message}`)
        }
    }
    class PushNotification extends Notification{
        send(message){
            console.log(`Notifcação via Push. Mensagem: ${message}`)
        }
    }
    //Método Factory
    class NotificationFactory{
        static createNotification(type){
            if(typeof type === "string" && type !== null){
                switch(type.toLowerCase()){
                    case 'email':
                    return new EmailNotification()
                    case 'sms':
                    return new SMSNotification()
                    case 'push':
                    return new PushNotification()
                    default:
                    throw new Error(`Tipo de notificação desconhecido.`)
                }
            }else{
                throw new Error("Tipo inválido de notificação.")
            }
        }
    }
    //Cliente que usa a fábrica de notificações
    class NotificationService{
        constructor(factory){
            this.factory = factory
        }
        sendNotification(type,message){
            const notification = this.factory.createNotification(type)
            notification.send(message)
        }
    }
    //Uso do Factory Method em um contexto maix complexo
    const notificationService = new NotificationService(NotificationFactory)

    notificationService.sendNotication('email', 'Mensagem de email')
    no
    notifcationService.sendNotification('sms', 'Mensagem de SMS')
    notificationService.sendNotification('push', 'Mensagem Push.')
  
  
 
 
    
  