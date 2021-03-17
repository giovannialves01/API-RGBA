package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 *  Classe que define os contatos dos usuários
 *  @author Nicholas Roque
 */
@Entity(name = "contatos")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String telefone;


    public Contato() {  }

    public Contato(long id, String telefone) {
        this.id = id;
        this.telefone = telefone;
    }


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }

}
