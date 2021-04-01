package rgba.SkillShare.model;

import javax.persistence.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;


/**
 *   Classe que define os usuários do tipo gestor.
 *  @author Nicholas Roque
 */
@Entity(name="gestor")
@NoArgsConstructor @Data

public class Gestor extends Usuario{


    /** 
    *  Cria uma instância da classe Gestor.
    * @param cpf -> cpf do gestor
    * @param nome -> nome do gestor
    * @param email -> email do gestor
    * @param senha -> senha do gestor
    * @author Nicholas Roque
    */

    //NÃO RETIRAR
    public Gestor(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }


}
