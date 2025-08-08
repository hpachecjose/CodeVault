#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <sstream>
#include <iomanip>

using namespace std;

// Classe BinaryDataProcessor
class BinaryDataProcessor {
private:
    // Array de 1 byte (8 bits)
    unsigned char byte_data;
    
    // ID no formato: ordem (1-10) + seção (A-Z) + subseção (a-z) + número (001-999)
    string id;
    
    // Estrutura de um nó da árvore binária  
    struct BinaryDataNode {
        int data;
        BinaryDataNode* left;
        BinaryDataNode* right;
        // Array de byte com 1 elemento
        unsigned char array_de_byte[1];
        
        // Construtor que recebe um vetor de 1 byte
        BinaryDataNode(const unsigned char byte_array[1], int value)
            : data(value), left(nullptr), right(nullptr)
        {
            array_de_byte[0] = byte_array[0];
        }
        
        // Função para inserir um valor (1 byte) em cada nodo da árvore binária
        void insert(int value) {
            if (value < data) {
                if (left == nullptr) {
                    left = new BinaryDataNode(array_de_byte, value);
                } else {
                    left->insert(value);
                }
            } else if (value > data) {
                if (right == nullptr) {
                    right = new BinaryDataNode(array_de_byte, value);
                } else {
                    right->insert(value);
                }
            }
        }
    };
    
    // Ponteiro para a raiz da árvore
    BinaryDataNode* root;

public:
    // Construtor padrão - gera byte aleatório e ID automático
    BinaryDataProcessor() : root(nullptr) {
        generateRandomByte();
        generateRandomID();
    }
    
    // Construtor com byte específico - gera ID automático
    BinaryDataProcessor(unsigned char specific_byte) : byte_data(specific_byte), root(nullptr) {
        generateRandomID();
    }
    
    // Construtor com byte e ID específicos
    BinaryDataProcessor(unsigned char specific_byte, const string& specific_id) 
        : byte_data(specific_byte), id(specific_id), root(nullptr) {
    }
    
    // Construtor apenas com ID específico - gera byte aleatório
    BinaryDataProcessor(const string& specific_id) : id(specific_id), root(nullptr) {
        generateRandomByte();
    }
    
    // Destrutor (será implementado posteriormente para limpar a árvore)
    ~BinaryDataProcessor() {
        // TODO: Implementar limpeza da árvore
    }
    
    // Getters
    unsigned char getByteData() const {
        return byte_data;
    }
    
    string getID() const {
        return id;
    }
    
    // Função para exibir o byte em formato binário
    string getByteAsBinary() const {
        string binary = "";
        unsigned char temp = byte_data;
        for (int i = 7; i >= 0; i--) {
            binary += ((temp >> i) & 1) ? '1' : '0';
        }
        return binary;
    }
    
    // Função para exibir o byte em formato hexadecimal
    string getByteAsHex() const {
        stringstream ss;
        ss << "0x" << hex << uppercase << setw(2) << setfill('0') << (int)byte_data;
        return ss.str();
    }

private:
    // Função para gerar um byte aleatório (8 bits)
    void generateRandomByte() {
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<int> dis(0, 255);
        byte_data = static_cast<unsigned char>(dis(gen));
    }
    
    // Função para gerar ID aleatório no formato especificado
    void generateRandomID() {
        random_device rd;
        mt19937 gen(rd());
        
        // Gerar ordem (1-10)
        uniform_int_distribution<int> ordem_dis(1, 10);
        int ordem = ordem_dis(gen);
        
        // Gerar seção (A-Z)
        uniform_int_distribution<int> secao_dis(0, 25);
        char secao = 'A' + secao_dis(gen);
        
        // Gerar subseção (a-z)
        uniform_int_distribution<int> subsecao_dis(0, 25);
        char subsecao = 'a' + subsecao_dis(gen);
        
        // Gerar número (1-999)
        uniform_int_distribution<int> numero_dis(1, 999);
        int numero = numero_dis(gen);
        
        // Construir o ID
        stringstream ss;
        ss << ordem << secao << subsecao << setw(3) << setfill('0') << numero;
        id = ss.str();
    }

public:
    // Função para inserir um Identificador na árvore binária
    void insertIdentifier(const unsigned char byte_array[1], int value) {
        if (root == nullptr) {
            root = new BinaryDataNode(byte_array, value);
        } else {
            root->insert(value);
        }
    }
    
    // Função para inserir usando o byte da instância atual
    void insertValue(int value) {
        unsigned char current_byte[1] = {byte_data};
        insertIdentifier(current_byte, value);
    }
    
    // Função para exibir informações da instância
    void displayInfo() const {
        cout << "ID: " << id << endl;
        cout << "Byte (decimal): " << (int)byte_data << endl;
        cout << "Byte (binário): " << getByteAsBinary() << endl;
        cout << "Byte (hexadecimal): " << getByteAsHex() << endl;
        cout << "------------------------" << endl;
    }
};

// Função de exemplo para demonstrar o uso
int main() {
    cout << "=== Demonstração da Classe BinaryDataProcessor ===" << endl << endl;
    
    // Criando diferentes instâncias
    BinaryDataProcessor obj1;                           // Byte e ID aleatórios
    BinaryDataProcessor obj2(0xAB);                     // Byte específico, ID aleatório
    BinaryDataProcessor obj3("5Kz456");                 // ID específico, byte aleatório
    BinaryDataProcessor obj4(0xFF, "10Zz999");          // Byte e ID específicos
    
    // Exibindo informações das instâncias
    cout << "Objeto 1 (tudo aleatório):" << endl;
    obj1.displayInfo();
    
    cout << "Objeto 2 (byte específico: 0xAB):" << endl;
    obj2.displayInfo();
    
    cout << "Objeto 3 (ID específico: 5Kz456):" << endl;
    obj3.displayInfo();
    
    cout << "Objeto 4 (byte: 0xFF, ID: 10Zz999):" << endl;
    obj4.displayInfo();
    
    // Exemplo de inserção na árvore
    cout << "Inserindo valores na árvore do objeto 1..." << endl;
    obj1.insertValue(50);
    obj1.insertValue(30);
    obj1.insertValue(70);
    cout << "Valores inseridos com sucesso!" << endl;
    
    return 0;
}