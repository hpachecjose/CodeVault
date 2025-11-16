import math
import matplotlib.pyplot as plt
import networkx as nx

# Classe Node (nó da árvore)
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


# Função recursiva de percurso em pré-ordem
def pre_order(root):
    if root:
        print(root.data, end=" ")
        pre_order(root.left)
        pre_order(root.right)


# Função que calcula h = log2(n)
def calc_log2(n):
    if n <= 0:
        raise ValueError("n deve ser maior que 0")
    return math.log2(n)


# Função que adiciona nós e conexões ao grafo
def add_edges(graph, node, pos=None, x=0, y=0, layer=1):
    if node is not None:
        graph.add_node(node.data, pos=(x, y))
        if node.left:
            graph.add_edge(node.data, node.left.data)
            add_edges(graph, node.left, x=x - 1 / layer, y=y - 1, layer=layer + 1)
        if node.right:
            graph.add_edge(node.data, node.right.data)
            add_edges(graph, node.right, x=x + 1 / layer, y=y - 1, layer=layer + 1)


# Função para desenhar a árvore binária
def draw_tree(root):
    graph = nx.DiGraph()
    add_edges(graph, root)
    pos = nx.get_node_attributes(graph, 'pos')
    nx.draw(graph, pos, with_labels=True, arrows=False, node_size=2000,
            node_color='lightblue', font_size=12, font_weight='bold')
    plt.title("Visualização da Árvore Binária 🌳")
    plt.show()


# Exemplo de uso
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

print("Percurso pré-ordem:")
pre_order(root)
print("\n")

# Cálculo de log2(n)
n = 16
h = calc_log2(n)
print(f"h = log2({n}) = {h}\n")

# Mostra a árvore graficamente
draw_tree(root)
