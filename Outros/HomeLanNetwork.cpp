#include <iostream>
#include "string"


class HomeLanNetwork LAN{
    private:
         char* netWorkName;
         int networkSSID;
         bool isConnectedLan;

    public:
         HomeLanNetwork(char*nameHomeLanNetwork, int ssid, bool isConnected){
            netWorkName = nameHomeLanNetwork;
            networkSSID = ssid;
            isConnectedLan = isConnected;
         } 
         
         //Método que gera um IP provisório para a rede
         std::string generateTemporaryIP(){
            std::string ip = "192.168.1." + std::to_string(rand() % 255);
            return ip;
         }

         //Método que acessa o nome da rede
         std::string getNetworName(){
            return std::string(netWorkName);
         }

         //Método que gera um novo SSID para rede se 
         //um aspecto do IP da rede for de uma determinada forma
         void generateNewSSIDIfNeeded(){
            std::string ip = generateTemporaryIP();
            if (ip.substr(0, 11) == "192.168.1.") {
                networkSSID = rand() % 10000; // Gera um novo SSID aleatório
                std::cout << "Novo SSID gerado: " << networkSSID << std::endl;
            } else {
                std::cout << "O IP não atende aos critérios para gerar um novo SSID." << std::endl;
            }
         }
       
}