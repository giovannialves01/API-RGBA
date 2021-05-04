package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
/**
 *  Classe que define os contatos dos usuários
 *  @author Nicholas Roque
 */
@Entity(name = "contato")
@NoArgsConstructor @Getter @Setter @AllArgsConstructor @ToString
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String telefone;


    /** 
    *  Cria uma instância da classe Contato.
    * @param telefone -> telefone do usuario
    * @author Nicholas Roque
    */

    public Contato(String telefone) {
        this.telefone = telefone;
    }

}
