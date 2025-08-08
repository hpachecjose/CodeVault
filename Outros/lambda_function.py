# Funções lambdas são funções anônimas usadas em pequenos contextos
# Úteis quando precisamos de uma função simples, que será utilizada apenas uma vez e não precisa ser
# reutilizada em outro lugar do código.

# Criando funções lambda
# Usando funçõs lambda com Map, Filter e Reduce

import random

result = lambda value_1, value_2 : value_1 * value_2
print(result(23,45))


sum_values = lambda input_num_pos, input_num_neg: 45 / input_num_neg * input_num_pos - 2.34
print(sum_values(23,34.56))

print((lambda idade, peso: idade * peso / 2.5)(23,56))


# Função map para aplicar a função lambda que eleva cada elementos
# de uma lista ao quadrado
lista = [1.2, 2.3, 4.5]
print(list(map(lambda input: input ** 2, lista)))

# Uma função para retornar apenas o números pares de uma lista
lista = [1,2,3,4,5,6,7]
print(list(filter(lambda inp: inp % 2 == 0, lista)))


# Função REDUCE   para somar todos os elementos de uma lista de entrada
from functools import reduce
lista_nova = [1,2,3,4,5,6]
print(reduce(lambda x, y: x + y, lista_nova))

numero = random.randint(1,100) # inteiro entre 1 e 100

verifica_par_impar = lambda num: "par" if num % 2 == 0 else "ímpar"
print(verifica_par_impar(numero))









