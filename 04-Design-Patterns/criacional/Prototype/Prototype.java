
public interface Prototype {
    Prototype clone();
}

public class GameCharacter implements Prototype {
    private String name;
    private int health;
    private int mana;
    private List<String> inventory;

    public GameCharacter(String name, int health, int mana, List<String> inventory) {
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.inventory = new ArrayList<>(inventory);
    }

    // Método clone para criar uma cópia do objeto
    @Override
    public GameCharacter clone() {
        return new GameCharacter(this.name, this.health, this.mana, this.inventory);
    }

    // Getters e setters...

    @Override
    public String toString() {
        return "GameCharacter{" +
                "name='" + name + '\'' +
                ", health=" + health +
                ", mana=" + mana +
                ", inventory=" + inventory +
                '}';
    }
}

public class Game {
    public static void main(String[] args) {
        // Criar um personagem prototípico
        List<String> initialInventory = Arrays.asList("Espada", "Escudo", "Poção de Cura");
        GameCharacter prototypeCharacter = new GameCharacter("Guerreiro", 100, 50, initialInventory);

        // Clonar o personagem prototípico para criar novos personagens
        GameCharacter character1 = prototypeCharacter.clone();
        GameCharacter character2 = prototypeCharacter.clone();

        // Modificar os personagens clonados
        character1.setName("Guerreiro A");
        character2.setName("Guerreiro B");

        // Exibir os personagens
        System.out.println(character1);
        System.out.println(character2);
    }
}

public class Game {
    public static void main(String[] args) {
        // Criar um personagem prototípico
        List<String> initialInventory = Arrays.asList("Espada", "Escudo", "Poção de Cura");
        GameCharacter prototypeCharacter = new GameCharacter("Guerreiro", 100, 50, initialInventory);

        // Clonar o personagem prototípico para criar novos personagens
        GameCharacter character1 = prototypeCharacter.clone();
        GameCharacter character2 = prototypeCharacter.clone();

        // Modificar os personagens clonados
        character1.setName("Guerreiro A");
        character2.setName("Guerreiro B");

        // Exibir os personagens
        System.out.println(character1);
        System.out.println(character2);
    }
}