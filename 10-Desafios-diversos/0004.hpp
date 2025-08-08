#include <iostream>
#include <string>
#include <unordered_map>
#include <iomanip>

struct Produto {
    std::string nome;
    double precoVista;
    double precoPrazo;
};

class ProgramaEstoque {
private:
    std::unordered_map<std::string, Produto> estoque;

public:
    ProgramaEstoque() {
        estoque["AP10L"]  = {"Extintor AP 10L", 100.90, 200.78};
        estoque["CO26KG"] = {"Extintor CO2 6KG", 123.90, 800.90};
        estoque["PQS8KG"] = {"Extintor PQS 8KG", 234.90, 345.80};
        estoque["PQS6KG"] = {"Extintor PQS 6KG", 210.50, 320.00};
        estoque["PQS4KG"] = {"Extintor PQS 4KG", 180.00, 250.00};
    }

    void consultarEstoque(const std::string& codigo) const {
        auto it = estoque.find(codigo);
        if (it != estoque.end()) {
            const Produto& produto = it->second;
            std::cout << "Produto: " << produto.nome << "\n"
                      << "Código: " << codigo << "\n"
                      << std::fixed << std::setprecision(2)
                      << "Preço à vista: R$ " << produto.precoVista << "\n"
                      << "Preço a prazo: R$ " << produto.precoPrazo << std::endl;
        } else {
            std::cout << "Produto com código \"" << codigo << "\" não encontrado." << std::endl;
        }
    }
};

// Exemplo de uso:
int main() {
    ProgramaEstoque estoque;
    estoque.consultarEstoque("PQS8KG");
    // Para testar código inexistente:
    // estoque.consultarEstoque("34");
    return 0;
}





class DeviceNETWORK {};
class DeviceSOHO : public DeviceNETWORK {};

int main() {
    DeviceSOHO deviceNetworkingInnerInterprise;
    // Verifica se deviceNetworkingInnerInterprise é um DeviceNETWORK
    if (dynamic_cast<DeviceNETWORK*>(&deviceNetworkingInnerInterprise)) {
        auto initSystemProtoco = []() {
            std::map<std::string, std::string> mapNetIP;
            mapNetIP["192.168.9.0"] = "255.255.255.0";
            mapNetIP[""] = "";
            // Use mapNetIP conforme necessário
        };
        initSystemProtoco();
    }
    return 0;
}