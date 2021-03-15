package rgba.SkillShare.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

/**
 *  Classe que define os usuários do tipo aluno
 *  @author Nicholas Roque
 */
@Entity(name="alunos")
public class Aluno extends Usuario{
    
    /** 
    * @param contatos
    */
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "id_aluno")
    private Set<Contato> contatos = new HashSet<Contato>();

    /** 
    * Construtor padrão da classe Aluno
    * @author Nicholas Roque
    */
    public Aluno(){}

    /** 
    *  Cria uma instância da classe Aluno
    * @param cpf,nome,email
    * @author Nicholas Roque
    */
    public Aluno(String cpf,String nome, String email) {
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
    }

    /** 
    *  Retorna o contato do aluno
    * @return contatos
    * @author Nicholas Roque
    */
    public Set<Contato> getContatos() {
        return this.contatos;
    }

    /** 
    *  Recebe uma instância da classe Contato para definir o contato do aluno
    * @param contatos
    * @author Nicholas Roque
    */
    public void setContatos(Set<Contato> contatos) {
        this.contatos = contatos;
    }

    

}
