#include <iostream>
#include <algorithm>
#include <cmath>
#include <string>
#include <random>

// =========================
// Classe do Objeto HX
// =========================
class ObjectHX {
public:
    int height;
    int width;
    int depth;

    long long volume;
    double density;
    double weight;
    double ratio;
    double energy;

    std::string classType;
    std::string state;

    ObjectHX(int h = randomUnit(), int w = randomUnit(), int d = randomUnit()) {
        height = clampInt(h, 1, 300);
        width  = clampInt(w, 1, 300);
        depth  = clampInt(d, 1, 300);

        volume = 0;
        density = 0.0;
        weight = 0.0;
        ratio = 0.0;
        energy = 0.0;
        classType = "";
        state = "";
    }

private:
    static int randomUnit() {
        static std::mt19937 rng(std::random_device{}());
        std::uniform_int_distribution<int> dist(1, 300);
        return dist(rng);
    }

    static int clampInt(int v, int min, int max) {
        return std::min(std::max(v, min), max);
    }
};

// =========================
// Regras da Máquina HX-01
// =========================
bool calculateVolume(ObjectHX& obj) {
    obj.volume = static_cast<long long>(obj.height) *
                 obj.width *
                 obj.depth;

    if (obj.volume > 10'000'000) {
        obj.state = "REJEITADO_POR_VOLUME";
        return false;
    }
    return true;
}

void calculateDensity(ObjectHX& obj) {
    if (obj.volume <= 1'000) obj.density = 0.8;
    else if (obj.volume <= 100'000) obj.density = 1.2;
    else if (obj.volume <= 1'000'000) obj.density = 1.6;
    else obj.density = 2.4;
}

void calculateWeight(ObjectHX& obj) {
    obj.weight = obj.volume * obj.density;

    if (obj.weight < 500) {
        obj.state = "INSTAVEL";
    } else if (obj.weight > 15'000'000) {
        obj.state = "COLAPSADO";
    }
}

void classifyObject(ObjectHX& obj) {
    if (obj.weight < 5'000) obj.classType = "LEVE";
    else if (obj.weight <= 500'000) obj.classType = "PADRAO";
    else if (obj.weight <= 5'000'000) obj.classType = "PESADO";
    else obj.classType = "CRITICO";
}

void calculateRatio(ObjectHX& obj) {
    int maxDim = std::max({obj.height, obj.width, obj.depth});
    int minDim = std::min({obj.height, obj.width, obj.depth});
    obj.ratio = static_cast<double>(maxDim) / minDim;
}

bool validateForm(ObjectHX& obj) {
    if (obj.classType == "CRITICO" && obj.ratio > 5.0) {
        obj.state = "REJEITADO_POR_FORMA";
        return false;
    }
    if (obj.classType == "PADRAO" && obj.ratio > 8.0) {
        obj.state = "REJEITADO_POR_FORMA";
        return false;
    }
    return true;
}

bool calculateEnergy(ObjectHX& obj) {
    obj.energy = obj.weight * (obj.ratio / 2.0);

    if (obj.energy > 2'000'000) {
        obj.state = "ENERGIA_INSUFICIENTE";
        return false;
    }
    return true;
}

// =========================
// Pipeline de Processamento
// =========================
void processObject(ObjectHX& obj) {

    if (!calculateVolume(obj)) return;

    calculateDensity(obj);
    calculateWeight(obj);
    classifyObject(obj);
    calculateRatio(obj);

    if (!obj.state.empty()) return;
    if (!validateForm(obj)) return;
    if (!calculateEnergy(obj)) return;

    obj.state = "VALIDO";
}

// =========================
// Execução
// =========================
int main() {

    ObjectHX obj;
    processObject(obj);

    std::cout << "Objeto HX\n";
    std::cout << "Dimensoes: "
              << obj.height << " x "
              << obj.width  << " x "
              << obj.depth  << "\n";

    std::cout << "Volume: " << obj.volume << "\n";
    std::cout << "Densidade: " << obj.density << "\n";
    std::cout << "Peso: " << obj.weight << "\n";
    std::cout << "Classe: " << obj.classType << "\n";
    std::cout << "Razao: " << obj.ratio << "\n";
    std::cout << "Energia: " << obj.energy << "\n";
    std::cout << "Estado final: " << obj.state << "\n";

    return 0;
}
