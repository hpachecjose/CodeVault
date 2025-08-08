# Funções recursivas são funções que chama a si mesmas durante a execução.
# Elas são amplamente utilizada em programação para resolver problemas que podem
#ser divididos em subproblemas menores e semelhantes ao problema original.
# É uma técnica poderosa, mas deve ser usada com cuidado para evitar problemas 
#com loops infinitos ou estouro de pilha.


# Cálculo de fatorial
def fatorial(input):
    if input == 0: # Caso base
        return 1
    else: 
         return input * fatorial(n - 1) # Chamada recursiva - onde a função chama a si mesmo



# Cálculo de Fibonacci

def fibonacci(value_input):
    if value_input <= 1: # Caso base
        return value_input
    else: 
        return fibonacci(value_input - 1) + fibonacci(value_input - 2) # Chamada recursiva