package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo gestor.
 *  @author Nicholas Roque
 */
@Entity(name="gestor")
public class Gestor extends Usuario{
    

    /** 
    * Construtor padrão da classe Gestor
    * @author Nicholas Roque
    */
    public Gestor(){}

    /** 
    *  Cria uma instância da classe Gestor.
    * @param cpf -> cpf do gestor
    * @param nome -> nome do gestor
    * @param email -> email do gestor
    * @param senha -> senha do gestor
    * @author Nicholas Roque
    */
    public Gestor(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }


}
