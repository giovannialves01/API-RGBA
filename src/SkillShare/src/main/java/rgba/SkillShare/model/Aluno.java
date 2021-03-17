package rgba.SkillShare.model;
import javax.persistence.Entity;



/**
 *  Classe que define os usuários do tipo aluno
 *  @author Nicholas Roque
 */
@Entity(name="alunos")

public class Aluno extends Usuario{ 
  
    /** 
    * Construtor padrão da classe Aluno
    * @author Nicholas Roque
    */
    public Aluno(){}

    /** 
    *  Cria uma instância da classe Aluno
    * @param cpf,nome,email,senha
    * @author Nicholas Roque
    */
    public Aluno(String cpf,String nome,String email,String senha) { 
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
        this.setSenha(senha);
    }


}
