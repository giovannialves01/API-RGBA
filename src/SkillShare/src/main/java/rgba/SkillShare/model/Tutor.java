package rgba.SkillShare.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;


/**
 *   Classe que define os usuários do tipo tutor.
 *  @author Nicholas Roque
 */
@Entity(name="tutor")
@NoArgsConstructor @Getter @Setter @ToString 
public class Tutor extends Usuario{
    /** 
    *  Cria uma instância da classe Tutor.
    * @param cpf -> cpf do tutor
    * @param nome -> nome do tutor
    * @param email -> email do tutor
    * @param senha -> senha do tutor
    * @author Nicholas Roque
    */

    public Tutor(String cpf,String nome,String email,String senha) { 
        super(cpf,nome,email,senha);
    }
    public Tutor(String cpf,String nome,String email) { 
        super(cpf,nome,email);
    }
    public Tutor(String cpf) { 
        super(cpf);
    }
    
    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Turma> turmas;
}