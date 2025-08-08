import heapq
import random
import time
from collections import defaultdict
import matplotlib.pyplot as plt
import networkx as nx

class Enlace:
    def __init__(self, destino, largura_banda, latencia, taxa_perda):
        """
        Representa um enlace na rede
        
        Args:
            destino: Identificador do nó de destino
            largura_banda: Capacidade em Mbps
            latencia: Latência em ms
            taxa_perda: Probabilidade (0-1) de perda de pacotes
        """
        self.destino = destino
        self.largura_banda = largura_banda  # em Mbps
        self.latencia = latencia  # em ms
        self.taxa_perda = taxa_perda  # probabilidade 0-1
        self.carga_atual = 0  # quantidade atual de dados passando pelo enlace
        
    def calcular_metrica(self):
        """Calcula a métrica composta do enlace para o algoritmo de Dijkstra"""
        # Um enlace congestionado terá uma métrica maior
        fator_congestionamento = 1 + (self.carga_atual / self.largura_banda)
        # Combinando fatores: latência * congestionamento * confiabilidade
        return self.latencia * fator_congestionamento * (1 + self.taxa_perda * 10)
    
    def __str__(self):
        return f"→ {self.destino}: {self.largura_banda}Mbps, {self.latencia}ms, {self.taxa_perda*100:.1f}% perda"


class Roteador:
    def __init__(self, id):
        """
        Representa um roteador na rede
        
        Args:
            id: Identificador único do roteador
        """
        self.id = id
        self.enlaces = {}  # mapa para outros roteadores
        self.tabela_rotas = {}  # próximo salto para cada destino
        self.fila_pacotes = []  # pacotes aguardando processamento
        
    def adicionar_enlace(self, destino, largura_banda, latencia, taxa_perda):
        """Adiciona um enlace para outro roteador"""
        self.enlaces[destino] = Enlace(destino, largura_banda, latencia, taxa_perda)
        
    def __str__(self):
        resultado = f"Roteador {self.id}\n"
        resultado += "Enlaces:\n"
        for enlace in self.enlaces.values():
            resultado += f"  {enlace}\n"
        return resultado


class Pacote:
    id_contador = 0
    
    def __init__(self, origem, destino, tamanho, prioridade=0):
        """
        Representa um pacote de dados
        
        Args:
            origem: Identificador do roteador de origem
            destino: Identificador do roteador de destino
            tamanho: Tamanho em bytes
            prioridade: Prioridade do pacote (0-9)
        """
        Pacote.id_contador += 1
        self.id = Pacote.id_contador
        self.origem = origem
        self.destino = destino
        self.tamanho = tamanho  # em bytes
        self.prioridade = prioridade
        self.tempo_criacao = time.time()
        self.caminho_percorrido = [origem]
        self.tempo_entrega = None
        
    def entregar(self):
        """Marca o pacote como entregue"""
        self.tempo_entrega = time.time()
        
    def calcular_tempo_transito(self):
        """Calcula o tempo total que o pacote ficou em trânsito"""
        if self.tempo_entrega:
            return self.tempo_entrega - self.tempo_criacao
        return None
    
    def __str__(self):
        return f"Pacote {self.id}: {self.origem} → {self.destino} ({self.tamanho} bytes)"


class Rede:
    def __init__(self):
        """Representa a rede completa com todos os roteadores"""
        self.roteadores = {}
        self.grafo = defaultdict(dict)  # estrutura para o algoritmo de Dijkstra
        self.pacotes_em_transito = []
        self.pacotes_entregues = []
        self.tempo_simulacao = 0
        self.log_eventos = []
        
    def adicionar_roteador(self, id):
        """Adiciona um novo roteador à rede"""
        if id not in self.roteadores:
            self.roteadores[id] = Roteador(id)
            self.grafo[id] = {}
        return self.roteadores[id]
    
    def adicionar_enlace_bidirecional(self, id1, id2, largura_banda, latencia, taxa_perda):
        """Adiciona um enlace bidirecional entre dois roteadores"""
        # Garante que ambos os roteadores existam
        if id1 not in self.roteadores:
            self.adicionar_roteador(id1)
        if id2 not in self.roteadores:
            self.adicionar_roteador(id2)
            
        # Adiciona o enlace em ambas as direções
        self.roteadores[id1].adicionar_enlace(id2, largura_banda, latencia, taxa_perda)
        self.roteadores[id2].adicionar_enlace(id1, largura_banda, latencia, taxa_perda)
        
        # Atualiza o grafo para o algoritmo de Dijkstra
        self.atualizar_grafo()
    
    def atualizar_grafo(self):
        """Atualiza o grafo com as métricas atuais dos enlaces"""
        for origem_id, roteador in self.roteadores.items():
            for destino_id, enlace in roteador.enlaces.items():
                metrica = enlace.calcular_metrica()
                self.grafo[origem_id][destino_id] = metrica
    
    def calcular_rotas_dijkstra(self):
        """Calcula as melhores rotas para todos os roteadores usando Dijkstra"""
        for origem_id in self.roteadores:
            # Calcula os caminhos mais curtos a partir deste roteador
            distancias, predecessores = self._dijkstra(origem_id)
            
            # Atualiza a tabela de roteamento do roteador de origem
            for destino_id in self.roteadores:
                if origem_id != destino_id:
                    # Encontra o primeiro salto para chegar ao destino
                    proximo = destino_id
                    while predecessores.get(proximo) != origem_id and predecessores.get(proximo) is not None:
                        proximo = predecessores[proximo]
                    
                    if proximo in self.roteadores[origem_id].enlaces:
                        self.roteadores[origem_id].tabela_rotas[destino_id] = proximo
    
    def _dijkstra(self, origem):
        """
        Implementação do algoritmo de Dijkstra
        
        Args:
            origem: ID do nó de origem
            
        Returns:
            (distancias, predecessores): Tupla com distâncias e predecessores
        """
        # Inicialização
        distancias = {no: float('infinity') for no in self.grafo}
        distancias[origem] = 0
        predecessores = {no: None for no in self.grafo}
        fila_prioridade = [(0, origem)]
        visitados = set()
        
        while fila_prioridade:
            # Pega o nó não visitado com menor distância
            distancia_atual, no_atual = heapq.heappop(fila_prioridade)
            
            if no_atual in visitados:
                continue
                
            visitados.add(no_atual)
            
            # Para cada vizinho do nó atual
            for vizinho, peso in self.grafo[no_atual].items():
                if vizinho in visitados:
                    continue
                    
                distancia = distancia_atual + peso
                
                # Atualiza se encontramos um caminho melhor
                if distancia < distancias[vizinho]:
                    distancias[vizinho] = distancia
                    predecessores[vizinho] = no_atual
                    heapq.heappush(fila_prioridade, (distancia, vizinho))
        
        return distancias, predecessores
    
    def criar_pacote(self, origem, destino, tamanho, prioridade=0):
        """Cria um novo pacote e o coloca na fila do roteador de origem"""
        if origem not in self.roteadores or destino not in self.roteadores:
            raise ValueError("Origem ou destino inválidos")
            
        pacote = Pacote(origem, destino, tamanho, prioridade)
        self.pacotes_em_transito.append(pacote)
        self.log_eventos.append(f"T={self.tempo_simulacao}: Criado {pacote}")
        return pacote
    
    def simular_passo(self):
        """Executa um passo da simulação"""
        self.tempo_simulacao += 1
        
        # Processa cada pacote em trânsito
        pacotes_para_remover = []
        
        for pacote in self.pacotes_em_transito:
            roteador_atual = pacote.caminho_percorrido[-1]
            
            # Se chegou ao destino
            if roteador_atual == pacote.destino:
                pacote.entregar()
                self.log_eventos.append(f"T={self.tempo_simulacao}: Entregue {pacote}")
                pacotes_para_remover.append(pacote)
                self.pacotes_entregues.append(pacote)
                continue
            
            # Encontra o próximo salto
            proximo_salto = self.roteadores[roteador_atual].tabela_rotas.get(pacote.destino)
            
            if proximo_salto is None:
                self.log_eventos.append(f"T={self.tempo_simulacao}: {pacote} descartado - rota desconhecida")
                pacotes_para_remover.append(pacote)
                continue
                
            # Simula a transmissão pelo enlace
            enlace = self.roteadores[roteador_atual].enlaces[proximo_salto]
            
            # Verifica se o pacote é perdido
            if random.random() < enlace.taxa_perda:
                self.log_eventos.append(f"T={self.tempo_simulacao}: {pacote} perdido no enlace {roteador_atual} → {proximo_salto}")
                pacotes_para_remover.append(pacote)
                continue
                
            # Atualiza a carga do enlace
            enlace.carga_atual += pacote.tamanho / 1000  # converte bytes para kilobytes
            
            # Adiciona o próximo salto ao caminho percorrido
            pacote.caminho_percorrido.append(proximo_salto)
            self.log_eventos.append(f"T={self.tempo_simulacao}: {pacote} movido para {proximo_salto}")
            
        # Remove os pacotes processados da lista de trânsito
        for pacote in pacotes_para_remover:
            self.pacotes_em_transito.remove(pacote)
            
        # Diminui a carga dos enlaces com o tempo
        for roteador in self.roteadores.values():
            for enlace in roteador.enlaces.values():
                enlace.carga_atual = max(0, enlace.carga_atual - enlace.largura_banda * 0.1)
                
        # Recalcula as métricas e as rotas
        self.atualizar_grafo()
        
        # Não recalculamos as rotas a cada passo para economizar processamento
        # Em uma implementação real, as rotas seriam recalculadas periodicamente
        if self.tempo_simulacao % 5 == 0:
            self.calcular_rotas_dijkstra()
            
    def simular(self, passos=10):
        """Executa vários passos da simulação"""
        for _ in range(passos):
            self.simular_passo()
            
    def mostrar_estatisticas(self):
        """Exibe estatísticas da simulação"""
        total_entregues = len(self.pacotes_entregues)
        total_criados = total_entregues + len(self.pacotes_em_transito)
        
        if total_criados == 0:
            print("Nenhum pacote foi criado ainda.")
            return
            
        taxa_entrega = total_entregues / total_criados * 100
        
        tempos_transito = [p.calcular_tempo_transito() for p in self.pacotes_entregues if p.calcular_tempo_transito() is not None]
        
        if tempos_transito:
            latencia_media = sum(tempos_transito) / len(tempos_transito)
        else:
            latencia_media = 0
            
        print(f"\n===== ESTATÍSTICAS DA SIMULAÇÃO =====")
        print(f"Tempo de simulação: {self.tempo_simulacao}")
        print(f"Pacotes criados: {total_criados}")
        print(f"Pacotes entregues: {total_entregues} ({taxa_entrega:.1f}%)")
        print(f"Pacotes em trânsito: {len(self.pacotes_em_transito)}")
        print(f"Latência média: {latencia_media:.4f}s")
        
    def visualizar_rede(self):
        """Visualiza a rede usando NetworkX e Matplotlib"""
        G = nx.Graph()
        
        # Adiciona os nós e arestas
        for origem, roteador in self.roteadores.items():
            G.add_node(origem)
            for destino in roteador.enlaces:
                if not G.has_edge(origem, destino):  # evita adicionar duplicatas
                    metrica = roteador.enlaces[destino].calcular_metrica()
                    G.add_edge(origem, destino, weight=metrica)
        
        # Posição dos nós
        pos = nx.spring_layout(G)
        
        # Desenha os nós
        nx.draw_networkx_nodes(G, pos, node_size=700, node_color='skyblue')
        
        # Desenha as arestas com espessura proporcional à largura de banda
        edge_width = []
        edge_labels = {}
        
        for u, v, data in G.edges(data=True):
            enlace1 = self.roteadores[u].enlaces.get(v)
            enlace2 = self.roteadores[v].enlaces.get(u)
            
            if enlace1:
                largura = enlace1.largura_banda / 10  # normaliza para visualização
                edge_width.append(largura)
                edge_labels[(u, v)] = f"{enlace1.latencia}ms"
            elif enlace2:
                largura = enlace2.largura_banda / 10
                edge_width.append(largura)
                edge_labels[(u, v)] = f"{enlace2.latencia}ms"
            else:
                edge_width.append(1.0)
                edge_labels[(u, v)] = "?"
                
        nx.draw_networkx_edges(G, pos, width=edge_width, alpha=0.7)
        
        # Desenha os rótulos dos nós
        nx.draw_networkx_labels(G, pos, font_size=12, font_family='sans-serif')
        
        # Desenha os rótulos das arestas
        nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=10)
        
        plt.axis('off')
        plt.tight_layout()
        plt.show()
        
    def mostrar_log(self, ultimos=10):
        """Mostra os últimos eventos do log"""
        print("\n===== LOG DE EVENTOS =====")
        for evento in self.log_eventos[-ultimos:]:
            print(evento)


# Exemplo de uso da simulação
if __name__ == "__main__":
    # Cria uma rede com a topologia sugerida
    rede = Rede()
    
    # Adiciona os roteadores
    for id in ["A", "B", "C", "D", "E", "F"]:
        rede.adicionar_roteador(id)
    
    # Adiciona os enlaces (bidirecional, largura_banda, latencia, taxa_perda)
    rede.adicionar_enlace_bidirecional("A", "B", 10, 5, 0.01)  # 10Mbps, 5ms, 1% perda
    rede.adicionar_enlace_bidirecional("A", "C", 5, 10, 0.02)  # 5Mbps, 10ms, 2% perda
    rede.adicionar_enlace_bidirecional("B", "C", 8, 7, 0.01)   # 8Mbps, 7ms, 1% perda
    rede.adicionar_enlace_bidirecional("B", "D", 12, 6, 0.01)  # 12Mbps, 6ms, 1% perda
    rede.adicionar_enlace_bidirecional("C", "E", 7, 8, 0.02)   # 7Mbps, 8ms, 2% perda
    rede.adicionar_enlace_bidirecional("D", "E", 10, 5, 0.01)  # 10Mbps, 5ms, 1% perda
    rede.adicionar_enlace_bidirecional("D", "F", 6, 9, 0.02)   # 6Mbps, 9ms, 2% perda
    rede.adicionar_enlace_bidirecional("E", "F", 8, 7, 0.01)   # 8Mbps, 7ms, 1% perda
    
    # Calcula as rotas iniciais
    rede.calcular_rotas_dijkstra()
    
    # Exibe informações sobre a rede
    print("=== TOPOLOGIA DA REDE ===")
    for roteador in rede.roteadores.values():
        print(roteador)
    
    # Visualiza a rede
    print("\nVisualizando a topologia da rede...")
    rede.visualizar_rede()
    
    # Cria alguns pacotes para simular
    print("\nCriando pacotes de teste...")
    rede.criar_pacote("A", "F", 1500)  # 1500 bytes
    rede.criar_pacote("C", "D", 2000)  # 2000 bytes 
    rede.criar_pacote("E", "A", 1000)  # 1000 bytes
    
    # Executa a simulação por alguns passos
    print("\nIniciando simulação...")
    rede.simular(passos=15)
    
    # Exibe estatísticas e log
    rede.mostrar_estatisticas()
    rede.mostrar_log()
    
    # Exemplo de falha em um enlace
    print("\n=== SIMULANDO FALHA NO ENLACE B-D ===")
    # Remove os enlaces entre B e D
    del rede.roteadores["B"].enlaces["D"]
    del rede.roteadores["D"].enlaces["B"]
    rede.atualizar_grafo()
    rede.calcular_rotas_dijkstra()
    
    # Cria mais alguns pacotes após a falha
    rede.criar_pacote("A", "F", 1500)  # Agora terá que encontrar um caminho alternativo
    rede.criar_pacote("B", "D", 800)   # Este terá que usar um caminho indireto
    
    # Continua a simulação
    rede.simular(passos=15)
    
    # Exibe estatísticas finais
    rede.mostrar_estatisticas()
    rede.mostrar_log(ultimos=20)
    
    # Visualiza a rede após a falha
    print("\nVisualizando a topologia da rede após a falha...")
    rede.visualizar_rede()