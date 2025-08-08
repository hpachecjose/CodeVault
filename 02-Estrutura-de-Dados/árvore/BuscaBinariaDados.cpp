#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <sstream>
#include <iomanip>
#include <memory>
#include <stdexcept>
#include <regex>
#include <algorithm>

using namespace std;

// Classe BinaryDataProcessor melhorada
class BinaryDataProcessor {
private:
    // Array de 1 byte (8 bits)
    unsigned char byte_data;
    
    // ID no formato: ordem (1-10) + seção (A-Z) + subseção (a-z) + número (001-999)
    string id;
    
    // Estrutura de um nó da árvore binária usando smart pointers
    struct BinaryDataNode {
        int data;
        unique_ptr<BinaryDataNode> left;
        unique_ptr<BinaryDataNode> right;
        // Array de byte com 1 elemento
        unsigned char array_de_byte[1];
        
        // Construtor que recebe um vetor de 1 byte
        BinaryDataNode(const unsigned char byte_array[1], int value)
            : data(value), left(nullptr), right(nullptr)
        {
            if (byte_array == nullptr) {
                throw invalid_argument("byte_array não pode ser nullptr");
            }
            array_de_byte[0] = byte_array[0];
        }
        
        // Função para inserir um valor (1 byte) em cada nodo da árvore binária
        void insert(int value, const unsigned char byte_array[1]) {
            if (byte_array == nullptr) {
                throw invalid_argument("byte_array não pode ser nullptr");
            }
            
            if (value < data) {
                if (left == nullptr) {
                    left = make_unique<BinaryDataNode>(byte_array, value);
                } else {
                    left->insert(value, byte_array);
                }
            } else if (value > data) {
                if (right == nullptr) {
                    right = make_unique<BinaryDataNode>(byte_array, value);
                } else {
                    right->insert(value, byte_array);
                }
            }
            // Se value == data, não insere (evita duplicatas)
        }
        
        // Função para buscar um valor na árvore
        bool search(int value) const {
            if (value == data) {
                return true;
            } else if (value < data && left != nullptr) {
                return left->search(value);
            } else if (value > data && right != nullptr) {
                return right->search(value);
            }
            return false;
        }
        
        // Percurso em ordem (in-order traversal)
        void inOrderTraversal(vector<int>& result) const {
            if (left != nullptr) {
                left->inOrderTraversal(result);
            }
            result.push_back(data);
            if (right != nullptr) {
                right->inOrderTraversal(result);
            }
        }
    };
    
    // Ponteiro inteligente para a raiz da árvore
    unique_ptr<BinaryDataNode> root;
    
    // Gerador de números aleatórios (thread-safe)
    mutable mt19937 generator;

public:
    // Construtor padrão - gera byte aleatório e ID automático
    BinaryDataProcessor() : root(nullptr), generator(random_device{}()) {
        generateRandomByte();
        generateRandomID();
    }
    
    // Construtor com byte específico - gera ID automático
    explicit BinaryDataProcessor(unsigned char specific_byte) 
        : byte_data(specific_byte), root(nullptr), generator(random_device{}()) {
        generateRandomID();
    }
    
    // Construtor com byte e ID específicos
    BinaryDataProcessor(unsigned char specific_byte, const string& specific_id) 
        : byte_data(specific_byte), root(nullptr), generator(random_device{}()) {
        validateAndSetID(specific_id);
    }
    
    // Construtor apenas com ID específico - gera byte aleatório
    explicit BinaryDataProcessor(const string& specific_id) 
        : root(nullptr), generator(random_device{}()) {
        generateRandomByte();
        validateAndSetID(specific_id);
    }
    
    // Construtor de cópia
    BinaryDataProcessor(const BinaryDataProcessor& other) 
        : byte_data(other.byte_data), id(other.id), root(nullptr), generator(random_device{}()) {
        if (other.root != nullptr) {
            copyTree(other.root.get());
        }
    }
    
    // Operador de atribuição
    BinaryDataProcessor& operator=(const BinaryDataProcessor& other) {
        if (this != &other) {
            byte_data = other.byte_data;
            id = other.id;
            root.reset(); // Limpa a árvore atual
            generator.seed(random_device{}());
            
            if (other.root != nullptr) {
                copyTree(other.root.get());
            }
        }
        return *this;
    }
    
    // Construtor de movimento
    BinaryDataProcessor(BinaryDataProcessor&& other) noexcept
        : byte_data(other.byte_data), id(move(other.id)), 
          root(move(other.root)), generator(move(other.generator)) {
    }
    
    // Operador de atribuição de movimento
    BinaryDataProcessor& operator=(BinaryDataProcessor&& other) noexcept {
        if (this != &other) {
            byte_data = other.byte_data;
            id = move(other.id);
            root = move(other.root);
            generator = move(other.generator);
        }
        return *this;
    }
    
    // Destrutor (RAII - smart pointers fazem a limpeza automaticamente)
    ~BinaryDataProcessor() = default;
    
    // Getters (const-correct)
    unsigned char getByteData() const noexcept {
        return byte_data;
    }
    
    const string& getID() const noexcept {
        return id;
    }
    
    // Função para exibir o byte em formato binário
    string getByteAsBinary() const {
        string binary;
        binary.reserve(8); // Pre-aloca espaço
        unsigned char temp = byte_data;
        for (int i = 7; i >= 0; i--) {
            binary += ((temp >> i) & 1) ? '1' : '0';
        }
        return binary;
    }
    
    // Função para exibir o byte em formato hexadecimal
    string getByteAsHex() const {
        stringstream ss;
        ss << "0x" << hex << uppercase << setw(2) << setfill('0') << static_cast<int>(byte_data);
        return ss.str();
    }
    
    // Setter para byte com validação
    void setByteData(unsigned char new_byte) noexcept {
        byte_data = new_byte;
    }
    
    // Setter para ID com validação
    void setID(const string& new_id) {
        validateAndSetID(new_id);
    }

private:
    // Função para gerar um byte aleatório (8 bits)
    void generateRandomByte() {
        uniform_int_distribution<int> dis(0, 255);
        byte_data = static_cast<unsigned char>(dis(generator));
    }
    
    // Função para gerar ID aleatório no formato especificado
    void generateRandomID() {
        // Gerar ordem (1-10)
        uniform_int_distribution<int> ordem_dis(1, 10);
        int ordem = ordem_dis(generator);
        
        // Gerar seção (A-Z)
        uniform_int_distribution<int> secao_dis(0, 25);
        char secao = static_cast<char>('A' + secao_dis(generator));
        
        // Gerar subseção (a-z)
        uniform_int_distribution<int> subsecao_dis(0, 25);
        char subsecao = static_cast<char>('a' + subsecao_dis(generator));
        
        // Gerar número (1-999)
        uniform_int_distribution<int> numero_dis(1, 999);
        int numero = numero_dis(generator);
        
        // Construir o ID
        stringstream ss;
        ss << ordem << secao << subsecao << setw(3) << setfill('0') << numero;
        id = ss.str();
    }
    
    // Função para validar e definir ID
    void validateAndSetID(const string& new_id) {
        if (!isValidID(new_id)) {
            throw invalid_argument("ID inválido. Formato esperado: [1-10][A-Z][a-z][001-999]");
        }
        id = new_id;
    }
    
    // Função para validar formato do ID
    bool isValidID(const string& id_to_validate) const {
        if (id_to_validate.empty()) {
            return false;
        }
        
        // Regex para validar o formato: ordem (1-10) + seção (A-Z) + subseção (a-z) + número (001-999)
        regex id_pattern(R"(^(10|[1-9])[A-Z][a-z](0[0-9]{2}|[1-9][0-9]{2})$)");
        return regex_match(id_to_validate, id_pattern);
    }
    
    // Função auxiliar para copiar árvore (para construtor de cópia)
    void copyTree(const BinaryDataNode* source) {
        if (source == nullptr) {
            return;
        }
        
        // Copia os valores da árvore usando percurso em ordem
        vector<int> values;
        source->inOrderTraversal(values);
        
        for (int value : values) {
            insertValue(value);
        }
    }

public:
    // Função para inserir um Identificador na árvore binária
    void insertIdentifier(const unsigned char byte_array[1], int value) {
        if (byte_array == nullptr) {
            throw invalid_argument("byte_array não pode ser nullptr");
        }
        
        try {
            if (root == nullptr) {
                root = make_unique<BinaryDataNode>(byte_array, value);
            } else {
                root->insert(value, byte_array);
            }
        } catch (const exception& e) {
            throw runtime_error("Erro ao inserir valor na árvore: " + string(e.what()));
        }
    }
    
    // Função para inserir usando o byte da instância atual
    void insertValue(int value) {
        unsigned char current_byte[1] = {byte_data};
        insertIdentifier(current_byte, value);
    }
    
    // Função para buscar um valor na árvore
    bool searchValue(int value) const {
        if (root == nullptr) {
            return false;
        }
        return root->search(value);
    }
    
    // Função para obter todos os valores da árvore em ordem
    vector<int> getTreeValues() const {
        vector<int> result;
        if (root != nullptr) {
            root->inOrderTraversal(result);
        }
        return result;
    }
    
    // Função para verificar se a árvore está vazia
    bool isTreeEmpty() const noexcept {
        return root == nullptr;
    }
    
    // Função para limpar a árvore
    void clearTree() noexcept {
        root.reset();
    }
    
    // Função para exibir informações da instância
    void displayInfo() const {
        cout << "ID: " << id << endl;
        cout << "Byte (decimal): " << static_cast<int>(byte_data) << endl;
        cout << "Byte (binário): " << getByteAsBinary() << endl;
        cout << "Byte (hexadecimal): " << getByteAsHex() << endl;
        
        // Exibir conteúdo da árvore
        if (!isTreeEmpty()) {
            vector<int> tree_values = getTreeValues();
            cout << "Valores na árvore: ";
            for (size_t i = 0; i < tree_values.size(); ++i) {
                cout << tree_values[i];
                if (i < tree_values.size() - 1) {
                    cout << ", ";
                }
            }
            cout << endl;
        } else {
            cout << "Árvore vazia" << endl;
        }
        cout << "------------------------" << endl;
    }
    
    // Operador de comparação para igualdade
    bool operator==(const BinaryDataProcessor& other) const {
        return byte_data == other.byte_data && id == other.id;
    }
    
    // Operador de comparação para desigualdade
    bool operator!=(const BinaryDataProcessor& other) const {
        return !(*this == other);
    }
};

// Função de exemplo para demonstrar o uso com tratamento de erros
int main() {
    try {
        cout << "=== Demonstração da Classe BinaryDataProcessor Melhorada ===" << endl << endl;
        
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
        
        // Exemplo de inserção na árvore com tratamento de erros
        cout << "Inserindo valores na árvore do objeto 1..." << endl;
        obj1.insertValue(50);
        obj1.insertValue(30);
        obj1.insertValue(70);
        obj1.insertValue(20);
        obj1.insertValue(60);
        obj1.insertValue(80);
        
        cout << "Valores inseridos com sucesso!" << endl;
        obj1.displayInfo();
        
        // Teste de busca
        cout << "Testando busca na árvore:" << endl;
        cout << "Valor 50 encontrado: " << (obj1.searchValue(50) ? "Sim" : "Não") << endl;
        cout << "Valor 25 encontrado: " << (obj1.searchValue(25) ? "Sim" : "Não") << endl;
        
        // Teste de construtor de cópia
        cout << "\nTestando construtor de cópia:" << endl;
        BinaryDataProcessor obj5 = obj1;
        cout << "Objeto copiado:" << endl;
        obj5.displayInfo();
        
        // Teste de validação de ID inválido
        cout << "\nTestando validação de ID inválido:" << endl;
        try {
            BinaryDataProcessor obj_invalid("InvalidID");
        } catch (const invalid_argument& e) {
            cout << "Erro capturado: " << e.what() << endl;
        }
        
    } catch (const exception& e) {
        cerr << "Erro na execução: " << e.what() << endl;
        return 1;
    }
    
    return 0;
}