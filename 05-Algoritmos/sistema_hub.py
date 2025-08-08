# Simulação de um Hub em Python

class Hub:
    def __init__(self, nome, max_portas):
        self.nome = nome
        self.max_portas = max_portas
        self.dispositivos = []

    def conectar_dispositivo(self, dispositivo):
        if len(self.dispositivos) < self.max_portas:
            self.dispositivos.append(dispositivo)
            print(f"{dispositivo} conectado ao {self.nome}")
        else:
            print("Limite de portas atingido!")

    def desconectar_dispositivo(self, dispositivo):
        if dispositivo in self.dispositivos:
            self.dispositivos.remove(dispositivo)
            print(f"{dispositivo} desconectado do {self.nome}")

    def transmitir_dados(self, dados, dispositivo_destino, dispositivo_origem):
        print(f"Transmitindo dados de {dispositivo_origem} para todos os dispositivos conectados (exceto origem)")
        for dispositivo in self.dispositivos:
            if dispositivo != dispositivo_origem:
                if dispositivo == dispositivo_destino:
                    print(f"Dados recebidos na porta de {dispositivo}: {dados}")
                else:
                    print(f"Replicando dados para {dispositivo}")

    def dispositivos_conectados(self):
        return self.dispositivos

# Exemplos de uso
hub = Hub("Hub Principal", 4)
dispositivo1 = "Dispositivo A"
dispositivo2 = "Dispositivo B"
hub.conectar_dispositivo(dispositivo1)
hub.conectar_dispositivo(dispositivo2)
hub.transmitir_dados("Mensagem de teste", dispositivo2, dispositivo1)