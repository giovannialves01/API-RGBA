package rgba.SkillShare.model;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;



/**
 *  Classe que define os usuários do tipo aluno
 *  @author Nicholas Roque
 */
@Entity(name="aluno")
@NoArgsConstructor @Getter @Setter @ToString
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

    @ManyToMany(mappedBy = "alunos",cascade = CascadeType.ALL)
    /* @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "turma_aluno", 
        joinColumns = @JoinColumn(name = "cpf_aluno"), 
        inverseJoinColumns = @JoinColumn(name = "id_turma")
    ) */
    @JsonIgnore
    Set<Turma> turmas = new HashSet<Turma>();

    public void addTurma(Turma t){
        turmas.add(t);
    }

}
