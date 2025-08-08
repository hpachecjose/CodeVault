import random
from typing import List, Optional

class DNAHumano:
    """
    Classe para representar uma instância de DNA Humano
    """
    
    def __init__(self, sequencia: Optional[str] = None, tamanho: int = 100):
        """
        Inicializa uma instância de DNA Humano
        
        Args:
            sequencia (str, optional): Sequência específica de DNA. Se None, gera aleatoriamente.
            tamanho (int): Tamanho da sequência de DNA (padrão: 100)
        """
        self.bases = ['A', 'T', 'G', 'C']  # Adenina, Timina, Guanina, Citosina
        
        if sequencia:
            self.sequencia = sequencia.upper()
            self.tamanho = len(sequencia)
        else:
            self.sequencia = self._gerar_sequencia_aleatoria(tamanho)
            self.tamanho = tamanho
            
        self.id = self._gerar_id()
    
    def _gerar_sequencia_aleatoria(self, tamanho: int) -> str:
        """Gera uma sequência aleatória de DNA"""
        return ''.join(random.choices(self.bases, k=tamanho))
    
    def _gerar_id(self) -> str:
        """Gera um ID único para a instância de DNA"""
        return f"DNA_{random.randint(100000, 999999)}"
    
    def obter_complementar(self) -> str:
        """Retorna a fita complementar do DNA"""
        complementos = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
        return ''.join(complementos[base] for base in self.sequencia)
    
    def contar_bases(self) -> dict:
        """Conta a frequência de cada base no DNA"""
        contagem = {base: self.sequencia.count(base) for base in self.bases}
        return contagem
    
    def calcular_gc_content(self) -> float:
        """Calcula o conteúdo GC (%) do DNA"""
        gc_count = self.sequencia.count('G') + self.sequencia.count('C')
        return (gc_count / self.tamanho) * 100
    
    def transcrever_para_rna(self) -> str:
        """Transcreve DNA para RNA (T -> U)"""
        return self.sequencia.replace('T', 'U')
    
    def validar_sequencia(self) -> bool:
        """Valida se a sequência contém apenas bases válidas"""
        return all(base in self.bases for base in self.sequencia)
    
    def __str__(self) -> str:
        """Representação em string da instância"""
        preview = self.sequencia[:20] + "..." if len(self.sequencia) > 20 else self.sequencia
        return f"DNAHumano(ID: {self.id}, Tamanho: {self.tamanho}, Sequência: {preview})"
    
    def __repr__(self) -> str:
        return self.__str__()


def criar_dna_humano(sequencia: Optional[str] = None, tamanho: int = 100) -> DNAHumano:
    """
    Função para criar uma nova instância de DNA Humano
    
    Args:
        sequencia (str, optional): Sequência específica de DNA
        tamanho (int): Tamanho da sequência se não fornecida (padrão: 100)
    
    Returns:
        DNAHumano: Nova instância de DNA Humano
    """
    return DNAHumano(sequencia, tamanho)


# Exemplo de uso
if __name__ == "__main__":
    print("=== Criando instâncias de DNA Humano ===\n")
    
    # Criar DNA aleatório
    dna1 = criar_dna_humano()
    print(f"DNA 1: {dna1}")
    print(f"Conteúdo GC: {dna1.calcular_gc_content():.2f}%")
    print(f"Contagem de bases: {dna1.contar_bases()}")
    print()
    
    # Criar DNA com sequência específica
    sequencia_especifica = "ATGCGATCGTAGCTAGCTAG"
    dna2 = criar_dna_humano(sequencia_especifica)
    print(f"DNA 2: {dna2}")
    print(f"Fita complementar: {dna2.obter_complementar()}")
    print(f"RNA transcrito: {dna2.transcrever_para_rna()}")
    print()
    
    # Criar DNA maior
    dna3 = criar_dna_humano(tamanho=200)
    print(f"DNA 3: {dna3}")
    print(f"Válido: {dna3.validar_sequencia()}")
    print()
    
    print("=== Instâncias criadas com sucesso! ===")