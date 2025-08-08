import numpy as np

def grid(input_size, element_grid):
    # Cria uma matriz bidimensional com o tamanho input_size X input_size
    # onde cada elemento é preenchido com element_grid
    grid = [[element_grid for _ in range(input_size)] for _ in range(input_size)]
    return grid

# Exemplo de uso
matriz_3x3 = grid(3, 0)
print(matriz_3x3)  # Saída: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

matriz_2x2 = grid(2, "x")
print(matriz_2x2)  # Saída: [["x", "x"], ["x", "x"]]
