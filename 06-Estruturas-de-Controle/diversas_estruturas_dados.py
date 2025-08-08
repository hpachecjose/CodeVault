


# árvore
class FileSystemNode:
    def __init__(self, name, is_directory):
        self.name = name
        self.is_directory = is_directory
        self.children = [] if is_directory else None 

    # Método para adicionar um valor ao nodo
    def add_child(self, child_node):
        if self.is_directory:
            self.childe.append(child_node)
        else: 
            raise Exception("Não é possivel adicionar filhos a arquivos.")
        


        # Método para imprimir a árvore
def print_tree(node, indent=0):
    print('  ' * indent + ('[DIR] ' if node.is_directory else '[FILE] ') + node.name)
    if node.is_directory:
        for child in node.children:
            print_tree(child, indent + 1)
def find_node(node, name):
    if node.name == name:
        return node
    if node.is_directory:
        for child in node.children:
            result = find_node(child, name)
            if result:
                return result
    return None
# Criando diretórios e arquivos
root = FileSystemNode('root', True)
docs = FileSystemNode('Documents', True)
img = FileSystemNode('Images', True)
music = FileSystemNode('Music', True)
file1 = FileSystemNode('resume.pdf', False)
file2 = FileSystemNode('song.mp3', False)
img1 = FileSystemNode('photo.jpg', False)

# Montando a árvore
root.add_child(docs)
root.add_child(img)
root.add_child(music)

docs.add_child(file1)
music.add_child(file2)
img.add_child(img1)
# Imprimir toda a estrutura:
print_tree(root)

# Buscar um arquivo
node = find_node(root, 'song.mp3')
if node:
    print(f"Encontrado: {node.name}, Diretório? {node.is_directory}")
else:
    print("Arquivo não encontrado.")
