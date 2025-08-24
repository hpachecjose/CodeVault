const EventEmitter = require('events');
// Cria uma nova instância de EventEmitter
const meuEmissor = new EventEmitter();
// Define um ouvinte para o evento 'saudacao'
meuEmissor.on('saudacao', (nome) => {
console.log(`Olá, ${nome}! Bem-vindo ao sistema.`);
});
// Define um ouvinte para o evento 'despedida'
meuEmissor.on('despedida', () => {
console.log('Até logo!');
});
// Emite o evento 'saudacao'
console.log('Emitindo evento de saudação...');
meuEmissor.emit('saudacao', 'Alice');
// Emite o evento 'despedida'
console.log('Emitindo evento de despedida...');
meuEmissor.emit('despedida');

// Exemplo de evento com múltiplos argumentos
meuEmissor.on('notificacao', (tipo, mensagem) => {
console.log(`[$`{tipo.toUpperCase()}]: `${mensagem}`);
});
meuEmissor.emit('notificacao', 'info', 'Nova mensagem recebida.');
meuEmissor.emit('notificacao', 'erro', 'Falha na conexão com o servidor.');