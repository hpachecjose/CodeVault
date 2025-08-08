#include <iostream>
#include <map>
#include <string>

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