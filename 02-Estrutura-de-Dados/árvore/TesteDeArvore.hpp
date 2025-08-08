#include <iostream>
using namespace std;

// Estrutura de um nó da árvore binária
struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value) : data(value), left(nullptr), right(nullptr) {}
};

// Função para inserir um valor na árvore binária
Node* insert(Node* root, int value) {
    if (root == nullptr) {
        return new Node(value); // Cria um novo nó se a árvore estiver vazia
    }

    if (value < root->data) {
        root->left = insert(root->left, value); // Insere no lado esquerdo
    } else {
        root->right = insert(root->right, value); // Insere no lado direito
    }

    return root;
}

// Função para percorrer a árvore em ordem (in-order traversal)
void inOrderTraversal(Node* root) {
    if (root != nullptr) {
        inOrderTraversal(root->left); // Percorre o lado esquerdo
        cout << root->data << " ";   // Imprime o valor do nó
        inOrderTraversal(root->right); // Percorre o lado direito
    }
}

int main() {
    Node* root = nullptr;

    // Inserindo valores na árvore
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 60);
    root = insert(root, 80);

    // Percorrendo a árvore em ordem
    cout << "Percurso em ordem (in-order): ";
    inOrderTraversal(root);
    cout << endl;

    return 0;
}
