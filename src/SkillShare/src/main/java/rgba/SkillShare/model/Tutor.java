package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo tutor.
 *  @author Nicholas Roque
 */
@Entity(name="tutor")
public class Tutor extends Usuario{
    

    /** 
    * Construtor padrão da classe Tutor
    * @author Nicholas Roque
    */
    public Tutor(){}

    /** 
    *  Cria uma instância da classe Tutor.
    * @param cpf -> cpf do tutor
    * @param nome -> nome do tutor
    * @param email -> email do tutor
    * @param senha -> senha do tutor
    * @author Nicholas Roque
    */

    //NÃO RETIRAR
    public Tutor(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }


}
