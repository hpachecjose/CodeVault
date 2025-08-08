// Vamos criar um algoritmo de busca de DNA onde se terá 
// uma estrutura que gere DNAs humanos randomicamente.
// E após isso, uma outra estrutura que fará a análise 
// do DNA criado. Baseado em regras arbitrárias, este algoritmo
// de busca fará uma busca de informações nesse DNA e após, lançará
// a resposta numa interface visível para o usuário.

//Estrutura em código C++ que gera um DNA humano aleatório

//Função que possui uma classe que gera instâncias de DNA humano aleatório


#include <iostream>
#include <string>
#include <random>
#include <map>
#include <algorithm>
#include <stdexcept>


class DNAHumano {
    //Atributos privados da instância de DNA humano que somente os 
    //médicos podem acessar 
private:
    std::string sequencia;
    std::string id;
    int tamanho;
    int idade;

    static const std::string bases; // A, T, C, G  

    //Gerador de números aleatórios
    static std::random_device rd;
    static std::mt19937 gen;
    static std::uniform_int_distribution<> dis;

    //Gera uma sequência aleatória de DNA humano
    std::string gerarSequenciaDNAHumano(int tamanhoSequencia) {
        std::string sequencia;
        sequencia.reserve(tamanhoSequencia);    
        //Um laço for para gerar a sequência de DNA
        for (int index = 0; index < tamanhoSequencia; ++index) {
            //Seleciona uma base aleatória da sequência de bases nucleotídicas
            sequencia += bases[dis(gen)];
        }
        //Retorna a sequência de DNA gerada
        return sequencia;
    }

    //Gera uma ID única para cada sequência de DNA humano gerada aleatoriamente
    std::string gerarIDHumano() {
        std::uniform_int_distribution<> disID(100000, 999999); 
        return "DNA_" + std::to_string(disID(gen));
    }

public:
    //Construtor padrão da classe DNAHumano que gera DNA Aleatório
    DNAHumano(int tamanhoSequencia = 100, int idadeEstruturaCorporal = 0)
        : tamanho(tamanhoSequencia), idade(idadeEstruturaCorporal) {
    DNAHumano(int tamanhoSequencia = 100, int idadeEstruturaCorporal = 0)
        : sequencia(gerarSequenciaDNAHumano(tamanhoSequencia)),
          id(gerarIDHumano()),
          tamanho(tamanhoSequencia),
          idade(idadeEstruturaCorporal) {}

    // Construtor com sequência específica
    DNAHumano(const std::string& seq)
        : sequencia(seq), id(gerarIDHumano()), tamanho(seq.length()), idade(0) {
        // Converte para maiúscula
        std::transform(sequencia.begin(), sequencia.end(), sequencia.begin(), ::toupper);

        // Valida a sequência
        if (!validarSequencia()) {
            throw std::invalid_argument("Sequência de DNA inválida. Use apenas A, T, G, C.");
        }
    }
    ~DNAHumano() = default;

    // Construtor de cópia
    DNAHumano(const DNAHumano& other)
        : sequencia(other.sequencia), id(other.id), tamanho(other.tamanho), idade(other.idade) {}

    // Operador de atribuição
    DNAHumano& operator=(const DNAHumano& other) {
        if (this != &other) {
            sequencia = other.sequencia;
            id = other.id;
            tamanho = other.tamanho;
            idade = other.idade;
        }
        return *this;
    }

    // Getters
    std::string getSequencia() const { return sequencia; }
    std::string getId() const { return id; }
    int getTamanho() const { return tamanho; }
    int getIdade() const { return idade; }

    // Obtém a fita complementar do DNA
    std::string obterComplementar() const {
        std::string complementar;
        complementar.reserve(tamanho);

        for (char base : sequencia) {
            switch (base) {
                case 'A': complementar += 'T'; break;
                case 'T': complementar += 'A'; break;
                case 'G': complementar += 'C'; break;
                case 'C': complementar += 'G'; break;
                default: complementar += base; break;
            }
        }
        return complementar;
    }

    // Conta a frequência de cada base
    std::map<char, int> contarBases() const {
        std::map<char, int> contagem;
        contagem['A'] = contagem['T'] = contagem['G'] = contagem['C'] = 0;

        for (char base : sequencia) {
            contagem[base]++;
        }

        return contagem;
    }

    // Calcula o conteúdo GC (%)
    double calcularGCContent() const {
        int gcCount = 0;
        for (char base : sequencia) {
            if (base == 'G' || base == 'C') {
                gcCount++;
            }
        }
        return (static_cast<double>(gcCount) / tamanho) * 100.0;
    }

    // Transcreve DNA para RNA (T -> U)
    std::string transcreverParaRNA() const {
        std::string rna = sequencia;
        std::replace(rna.begin(), rna.end(), 'T', 'U');
        return rna;
    }

    // Valida se a sequência contém apenas bases válidas
    bool validarSequencia() const {
        return std::all_of(sequencia.begin(), sequencia.end(),
            [](char c) { return c == 'A' || c == 'T' || c == 'G' || c == 'C'; });
    }

    // Operador de saída para cout
    friend std::ostream& operator<<(std::ostream& os, const DNAHumano& dna) {
        std::string preview = dna.sequencia.length() > 20 ?
            dna.sequencia.substr(0, 20) + "..." :
            dna.sequencia;

        os << "DNAHumano(ID: " << dna.id
            << ", Tamanho: " << dna.tamanho
            << ", Sequência: " << preview << ")";
        return os;
    }
};

// Definição dos membros estáticos
const std::string DNAHumano::bases = "ATGC";
std::random_device DNAHumano::rd;
std::mt19937 DNAHumano::gen(DNAHumano::rd());
std::uniform_int_distribution<> DNAHumano::dis(0, 3);

// Função para criar uma nova instância de DNA Humano
DNAHumano* criarDNAHumano() {
    return new DNAHumano();
}

// Função para criar DNA com tamanho específico
DNAHumano* criarDNAHumano(int tamanho) {
    return new DNAHumano(tamanho);
}

// Função para criar DNA com sequência específica
DNAHumano* criarDNAHumano(const std::string& sequencia) {
    return new DNAHumano(sequencia);
}

// Exemplo de uso
int main() {
    std::cout << "=== Criando instâncias de DNA Humano ===\n\n";
    
    try {
        // Criar DNA aleatório padrão (100 bases)
        DNAHumano* dna1 = criarDNAHumano();
        std::cout << "DNA 1: " << *dna1 << std::endl;
        std::cout << "Conteúdo GC: " << dna1->calcularGCContent() << "%" << std::endl;
        
        auto contagem1 = dna1->contarBases();
        std::cout << "Contagem de bases: A=" << contagem1['A'] 
                  << " T=" << contagem1['T'] 
                  << " G=" << contagem1['G'] 
                  << " C=" << contagem1['C'] << std::endl << std::endl;
        
        // Criar DNA com sequência específica
        std::string sequenciaEspecifica = "ATGCGATCGTAGCTAGCTAG";
        DNAHumano* dna2 = criarDNAHumano(sequenciaEspecifica);
        std::cout << "DNA 2: " << *dna2 << std::endl;
        std::cout << "Fita complementar: " << dna2->obterComplementar() << std::endl;
        std::cout << "RNA transcrito: " << dna2->transcreverParaRNA() << std::endl << std::endl;
        
        // Criar DNA maior (200 bases)
        DNAHumano* dna3 = criarDNAHumano(200);
        std::cout << "DNA 3: " << *dna3 << std::endl;
        std::cout << "Válido: " << (dna3->validarSequencia() ? "Sim" : "Não") << std::endl << std::endl;
        
        // Criar DNA usando construtor direto (sem ponteiro)
        DNAHumano dna4("AAATTTGGGCCC");
        std::cout << "DNA 4: " << dna4 << std::endl;
        std::cout << "Conteúdo GC: " << dna4.calcularGCContent() << "%" << std::endl;
        
        std::cout << "\n=== Instâncias criadas com sucesso! ===\n";
        
        // Limpeza da memória
        delete dna1;
        delete dna2;
        delete dna3;
        
    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
    }
    
    return 0;
}
