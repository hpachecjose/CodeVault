// Classe base para todos os handlers
class Handler {
  //Método para configurar o próximo handler
    setNext(handler) {
      this.next = handler;
      return handler;
    }
  

    //Método para lida com o pedido
    handle(request) {
      if (this.next) {
        return this.next.handle(request);
      }
      return true;
    }
  }
  
  // Verificação de autenticação
  class AuthHandler extends Handler {
    handle(request) {
      if (!request.isAuthenticated) {
        console.log("Falha na autenticação. Acesso negado.");
        return false;
      }
      console.log("Usuário autenticado.");
      return super.handle(request);
    }
  }
  
  // Verificação de permissões administrativas
  class AdminPermissionHandler extends Handler {
    handle(request) {
      if (!request.isAdmin) {
        console.log("Permissão negada: Apenas administradores podem acessar.");
        return false;
      }
      console.log("Permissões administrativas confirmadas.");
      return super.handle(request);
    }
  }
  
  // Verificação de dados limpos
  class DataValidationHandler extends Handler {
    handle(request) {
      if (!request.data || typeof request.data !== "string") {
        console.log("Dados inválidos no pedido.");
        return false;
      }
      console.log("Dados limpos e validados.");
      return super.handle(request);
    }
  }
  
  // Verificação de falhas repetidas por IP
  class BruteForceProtectionHandler extends Handler {
    handle(request) {
      if (request.failedAttempts > 5) {
        console.log("Bloqueio por tentativa de força bruta.");
        return false;
      }
      console.log("Sem tentativa de força bruta detectada.");
      return super.handle(request);
    }
  }
  
  // Simulação de pedidos
  const pedido1 = { isAuthenticated: true, isAdmin: false, data: "pedido123", failedAttempts: 1 };
  const pedido2 = { isAuthenticated: false, isAdmin: false, data: "pedido123", failedAttempts: 1 };
  const pedido3 = { isAuthenticated: true, isAdmin: true, data: "pedido123", failedAttempts: 6 };
  
  // Configuração da cadeia de responsabilidade
  const authHandler = new AuthHandler();
  const adminHandler = new AdminPermissionHandler();
  const dataValidationHandler = new DataValidationHandler();
  const bruteForceHandler = new BruteForceProtectionHandler();
  
  authHandler
    .setNext(adminHandler)
    .setNext(dataValidationHandler)
    .setNext(bruteForceHandler);
  
  // Testando pedidos
  console.log("Processando pedido 1:");
  authHandler.handle(pedido1);
  
  console.log("\nProcessando pedido 2:");
  authHandler.handle(pedido2);
  
  console.log("\nProcessando pedido 3:");
  authHandler.handle(pedido3);
  