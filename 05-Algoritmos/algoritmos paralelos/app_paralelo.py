import time
import random
import multiprocessing
import matplotlib.pyplot as plt
import numpy as np
from multiprocessing import Pool

# =========================================================
# Implementação Serial do Merge Sort
# =========================================================

def merge_sort_serial(arr):
    """Implementação serial do algoritmo Merge Sort."""
    if len(arr) <= 1:
        return arr
    
    # Divide o array ao meio
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Ordena recursivamente cada metade
    left = merge_sort_serial(left)
    right = merge_sort_serial(right)
    
    # Combina as duas metades ordenadas
    return merge(left, right)

def merge(left, right):
    """Combina dois arrays ordenados em um único array ordenado."""
    result = []
    i = j = 0
    
    # Compara e mescla os arrays
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Adiciona os elementos restantes
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# =========================================================
# Implementação Paralela do Merge Sort
# =========================================================

def merge_sort_parallel(arr, processes=None):
    """Implementação paralela do algoritmo Merge Sort."""
    # Definir o número de processos se não especificado
    if processes is None:
        processes = multiprocessing.cpu_count()
    
    # Caso base: arrays pequenos são ordenados serialmente
    if len(arr) <= 1000 or processes <= 1:
        return merge_sort_serial(arr)
    
    # Divide o array em chunks para processamento paralelo
    mid = len(arr) // 2
    
    # Cria um pool com o número especificado de processos
    with Pool(processes=2) as pool:
        # Aplica merge_sort_parallel recursivamente em paralelo
        left, right = pool.starmap(
            merge_sort_parallel,
            [(arr[:mid], processes//2), (arr[mid:], processes//2)]
        )
    
    # Combina os resultados ordenados
    return merge(left, right)

# =========================================================
# Funções de teste e benchmark
# =========================================================

def generate_random_array(size):
    """Gera um array de números aleatórios."""
    return [random.randint(0, 10000) for _ in range(size)]

def benchmark_sorting(sizes, runs=3):
    """Compara o desempenho das implementações serial e paralela."""
    serial_times = []
    parallel_times = []
    
    for size in sizes:
        serial_avg = 0
        parallel_avg = 0
        
        for _ in range(runs):
            # Gera o mesmo array para ambos os algoritmos
            arr = generate_random_array(size)
            arr_copy = arr.copy()
            
            # Benchmark da versão serial
            start = time.time()
            merge_sort_serial(arr)
            end = time.time()
            serial_avg += (end - start)
            
            # Benchmark da versão paralela
            start = time.time()
            merge_sort_parallel(arr_copy)
            end = time.time()
            parallel_avg += (end - start)
        
        # Calcula as médias
        serial_times.append(serial_avg / runs)
        parallel_times.append(parallel_avg / runs)
        
        print(f"Tamanho: {size}")
        print(f"Tempo médio (Serial): {serial_times[-1]:.4f} segundos")
        print(f"Tempo médio (Paralelo): {parallel_times[-1]:.4f} segundos")
        print(f"Speedup: {serial_times[-1] / parallel_times[-1]:.2f}x\n")
    
    return serial_times, parallel_times

def plot_results(sizes, serial_times, parallel_times):
    """Plota os resultados do benchmark."""
    plt.figure(figsize=(10, 6))
    
    plt.plot(sizes, serial_times, 'o-', label='Serial')
    plt.plot(sizes, parallel_times, 'o-', label='Paralelo')
    
    plt.title('Comparação de Desempenho: Merge Sort Serial vs Paralelo')
    plt.xlabel('Tamanho do Array')
    plt.ylabel('Tempo de Execução (segundos)')
    plt.grid(True)
    plt.legend()
    
    # Calcula speedup
    speedups = [serial / parallel for serial, parallel in zip(serial_times, parallel_times)]
    
    plt.figure(figsize=(10, 6))
    plt.plot(sizes, speedups, 'o-')
    plt.title('Speedup do Merge Sort Paralelo')
    plt.xlabel('Tamanho do Array')
    plt.ylabel('Speedup (Serial/Paralelo)')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()

# =========================================================
# Executar o benchmark
# =========================================================

if __name__ == "__main__":
    # Tamanhos dos arrays para teste
    sizes = [10000, 50000, 100000, 500000, 1000000]
    
    # Executa o benchmark
    serial_times, parallel_times = benchmark_sorting(sizes)
    
    # Plota os resultados
    plot_results(sizes, serial_times, parallel_times)