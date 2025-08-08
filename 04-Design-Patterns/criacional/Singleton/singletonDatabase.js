class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.connection = this.connect();
        Database.instance = this;

        return this;
    }

    connect() {
        // Simulação de uma conexão de banco de dados
        console.log('Conectado ao banco de dados');
        return { /* objeto de conexão */ };
    }

    query(sql) {
        // Simulação de uma consulta ao banco de dados
        console.log(`Executando query: ${sql}`);
        return { /* resultado da consulta */ };
    }

    disconnect() {
        // Simulação de desconexão do banco de dados
        console.log('Desconectado do banco de dados');
        this.connection = null;
    }
}

// Como usar o Singleton do banco de dados
const db1 = new Database();
db1.query('SELECT * FROM users');

const db2 = new Database();
db2.query('SELECT * FROM products');

console.log(db1 === db2); // Output: true