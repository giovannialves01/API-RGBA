package rgba.SkillShare.model;
import javax.persistence.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;



/**
 *  Classe que define os usuários do tipo aluno
 *  @author Nicholas Roque
 */
@Entity(name="aluno")
@NoArgsConstructor @Data
public class Aluno extends Usuario{ 


    /** 
    *  Cria uma instância da classe Aluno
    * @param cpf -> cpf do aluno
    * @param nome -> nome do aluno
    * @param email -> email do aluno
    * @param senha -> senha do aluno
    * @author Nicholas Roque
    */
    
    //NÃO RETIRAR
    public Aluno(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }
    public Aluno(String cpf,String nome,String email) { 
        super(cpf,nome,email);
    }

}
