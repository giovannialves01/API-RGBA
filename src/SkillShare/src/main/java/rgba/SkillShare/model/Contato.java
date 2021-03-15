package rgba.SkillShare.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** 
*  Classe que define os contatos dos usuários
* @author Nicholas Roque
*/
@Entity(name = "contatos")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String telefone;

    /** 
    *  Construtor padrão da classe Contato
    * @author Nicholas Roque
    */
    public Contato(){}
    /** 
    *  Cria uma instância da classe Contato
    * @param telefone
    * @author Nicholas Roque
    */
    public Contato(String telefone) {
        this.telefone = telefone;
    }

    /** 
    *  Retorna o Id do contato
    * @return contato.id
    * @author Nicholas Roque
    */
    public long getId() {
        return this.id;
    }

    /** 
    *  Define o id do contato
    * @param id
    * @author Nicholas Roque
    */
    public void setId(long id) {
        this.id = id;
    }

    /** 
    *  Retorna o telefone do usuario
    * @return contato.telefone
    * @author Nicholas Roque
    */
    public String getTelefone() {
        return this.telefone;
    }
    /** 
    *  Define o telefone do usuario
    * @param telefone
    * @author Nicholas Roque
    */
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    /** 
    *  Constrói um retorno legível da classe Contato
    * @return String
    * @author Nicholas Roque
    */
    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }
    
}
