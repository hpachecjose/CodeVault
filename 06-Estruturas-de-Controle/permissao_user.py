import os

class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, node):
        self.children.append(node)

def build_tree_from_file(file_path):
    root = TreeNode("root")

    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()

            if not line:
                continue

            current = TreeNode(line)
            root.add_child(current)

            if line.endswith('.md'):
                # Aqui você poderia adicionar lógica específica
                md_node = TreeNode(line[:-3])  # Remove '.md'
                current.add_child(md_node)

    return root

def create_dirs_from_tree(node, base_path):
    path = os.path.join(base_path, node.name)

    if not os.path.exists(path):
        os.makedirs(path)

    for child in node.children:
        create_dirs_from_tree(child, path)

# Uso
tree = build_tree_from_file('Arquivo.txt')
create_dirs_from_tree(tree, '/home/bezerk/Imagens')