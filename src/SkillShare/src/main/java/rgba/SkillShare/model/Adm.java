package rgba.SkillShare.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

/**
 *   Classe que define os usuários do tipo administrador
 *  @author Nicholas Roque
 */
@Entity(name="adm")
public class Adm extends Usuario{
    /** 
    * @param contatos
    */
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "id_adm")
    private Set<Contato> contatos = new HashSet<Contato>();

    /** 
    * Construtor padrão da classe Adm
    * @author Nicholas Roque
    */
    public Adm(){}

    /** 
    *  Cria uma instância da classe Adm
    * @param cpf,nome,email
    * @author Nicholas Roque
    */
    public Adm(String cpf,String nome,String email) { 
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
    }

    /** 
    *  Retorna o contato do administrador
    * @return contatos
    * @author Nicholas Roque
    */
    public Set<Contato> getContatos() {
        return this.contatos;
    }
    /** 
    *  Recebe uma instância da classe Contato para definir o contato do administrador
    * @param contatos
    * @author Nicholas Roque
    */
    public void setContatos(Set<Contato> contatos) {
        this.contatos = contatos;
    }

    

}
