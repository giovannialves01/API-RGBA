package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo administrador
 *  @author Nicholas Roque
 */
@Entity(name="adm")
public class Adm extends Usuario{
    

    /** 
    * Construtor padrão da classe Adm
    * @author Nicholas Roque
    */
    public Adm(){}

    /** 
    *  Cria uma instância da classe Adm
    * @param cpf -> cpf do administrador
    * @param nome -> nome do administrador
    * @param email -> email do administrador
    * @param senha -> senha do administrador
    * @author Nicholas Roque
    */
    public Adm(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }
}
