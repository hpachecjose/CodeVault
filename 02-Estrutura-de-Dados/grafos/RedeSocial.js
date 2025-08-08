class RedeSocial {
    constructor() {
        this.users = {}; // Vértices - Usuários da rede
        this.comments = {}; // Armazenamento de comentários
    }

    // Método para adicionar usuário
    addUser(userId, userData = {}) {
        if (!userId) throw new Error("ID do usuário é obrigatório");
        if (this.users[userId]) throw new Error("Usuário já existe");

        this.users[userId] = {
            friends: new Set(), // Conexões de amizade
            data: { // Dados do usuário
                name: userData.name || '',
                age: userData.age || null,
                email: userData.email || '',
                address: userData.address || '',
                ...userData
            }
        };
    }

    // Método para adicionar amizade
    addFriendship(user1, user2) {
        if (!this.users[user1] || !this.users[user2]) {
            throw new Error("Um ou ambos os usuários não existem");
        }

        this.users[user1].friends.add(user2);
        this.users[user2].friends.add(user1);
    }

    // Método para remover amizade
    removeFriendship(user1, user2) {
        if (!this.users[user1] || !this.users[user2]) {
            throw new Error("Um ou ambos os usuários não existem");
        }

        this.users[user1].friends.delete(user2);
        this.users[user2].friends.delete(user1);
    }

    // Método para remover usuário
    deleteAccount(userId) {
        if (!this.users[userId]) {
            throw new Error("Usuário não existe");
        }

        // Remove todas as amizades primeiro
        for (const friend of this.users[userId].friends) {
            this.removeFriendship(userId, friend);
        }

        // Remove comentários associados
        this.deleteAllUserComments(userId);

        // Remove o usuário
        delete this.users[userId];
    }

    // Método para verificar conexão
    hasConnection(user1, user2) {
        if (!this.users[user1] || !this.users[user2]) return false;
        return this.users[user1].friends.has(user2);
    }

    // Método para listar amigos
    listFriends(userId) {
        if (!this.users[userId]) throw new Error("Usuário não existe");
        return Array.from(this.users[userId].friends);
    }

    // Métodos para comentários
    createComment(userId, commentId, text) {
        if (!this.users[userId]) throw new Error("Usuário não existe");
        if (!this.comments[commentId]) {
            this.comments[commentId] = {
                author: userId,
                text: text,
                timestamp: new Date()
            };
        }
    }

    deleteComment(commentId) {
        if (this.comments[commentId]) {
            delete this.comments[commentId];
        }
    }

    deleteAllUserComments(userId) {
        for (const commentId in this.comments) {
            if (this.comments[commentId].author === userId) {
                this.deleteComment(commentId);
            }
        }
    }

    // Método para categorizar usuários
    categorizeUser(userId) {
        if (!this.users[userId]) throw new Error("Usuário não existe");
        
        const friendsCount = this.users[userId].friends.size;
        let category = '';

        if (friendsCount === 0) {
            category = 'Novato';
        } else if (friendsCount < 10) {
            category = 'Intermediário';
        } else if (friendsCount < 50) {
            category = 'Popular';
        } else {
            category = 'Influenciador';
        }

        this.users[userId].data.category = category;
        return category;
    }

    // Método para visualizar o grafo
    visualizeGraph() {
        console.log("\nRede Social - Relações de Amizade:");
        for (const userId in this.users) {
            const friends = this.listFriends(userId);
            console.log(`${userId} (${this.users[userId].data.name}) -> ${friends.join(', ') || 'Nenhum amigo'}`);
        }
    }
}

// Implementação do BFS corrigida
class SocialBFS {
    constructor(socialNetwork) {
        this.graph = socialNetwork;
    }

    bfs(startUserId, callback) {
        if (!this.graph.users[startUserId]) {
            throw new Error("Usuário inicial não existe");
        }

        const queue = [];
        const visited = {};
        const result = [];

        // Inicializa todos os usuários como não visitados
        for (const userId in this.graph.users) {
            visited[userId] = false;
        }

        queue.push(startUserId);
        visited[startUserId] = true;

        while (queue.length > 0) {
            const currentUser = queue.shift();
            result.push(currentUser);

            // Executa callback se fornecido
            if (callback) callback(currentUser);

            // Adiciona todos os amigos não visitados na fila
            for (const friend of this.graph.users[currentUser].friends) {
                if (!visited[friend]) {
                    visited[friend] = true;
                    queue.push(friend);
                }
            }
        }

        return result;
    }

    // Método para encontrar o caminho mais curto entre dois usuários
    shortestPath(user1, user2) {
        if (!this.graph.users[user1] || !this.graph.users[user2]) {
            throw new Error("Um ou ambos os usuários não existem");
        }

        const queue = [[user1]];
        const visited = new Set([user1]);

        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];

            if (node === user2) return path;

            for (const friend of this.graph.users[node].friends) {
                if (!visited.has(friend)) {
                    visited.add(friend);
                    const newPath = [...path, friend];
                    queue.push(newPath);
                }
            }
        }

        return null; // Não há caminho entre os usuários
    }
}

// ============ DEMONSTRAÇÃO DE USO ============

// Criando a rede social
const minhaRede = new RedeSocial();

// Adicionando usuários
minhaRede.addUser('user1', { name: 'Alice', age: 25 });
minhaRede.addUser('user2', { name: 'Bob', age: 30 });
minhaRede.addUser('user3', { name: 'Charlie', age: 22 });
minhaRede.addUser('user4', { name: 'Diana', age: 28 });

// Adicionando amizades
minhaRede.addFriendship('user1', 'user2');
minhaRede.addFriendship('user1', 'user3');
minhaRede.addFriendship('user2', 'user4');
minhaRede.addFriendship('user3', 'user4');

// Adicionando comentários
minhaRede.createComment('user1', 'comment1', 'Primeiro post!');
minhaRede.createComment('user2', 'comment2', 'Olá a todos!');

// Visualizando o grafo
minhaRede.visualizeGraph();

// Categorizando usuários
console.log('\nCategorias:');
for (const userId in minhaRede.users) {
    console.log(`${userId}: ${minhaRede.categorizeUser(userId)}`);
}

// Usando BFS
const bfs = new SocialBFS(minhaRede);
console.log('\nBusca em Largura a partir de user1:');
const bfsResult = bfs.bfs('user1', (user) => {
    console.log(`Visitando: ${user} (${minhaRede.users[user].data.name})`);
});

// Encontrando caminho mais curto
console.log('\nCaminho mais curto entre user1 e user4:');
console.log(bfs.shortestPath('user1', 'user4')); // ['user1', 'user2', 'user4'] ou ['user1', 'user3', 'user4']