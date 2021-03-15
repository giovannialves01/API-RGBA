package rgba.SkillShare.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** 
*  Classe que define os contatos dos usuários
* @author @NicholasRoque
*/
@Entity(name = "contatos")
public class Contato {

    /** 
    * @param id
    */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    /** 
    * @param telefone
    */
    private String telefone;

    /** 
    *  Construtor padrão da classe Contato
    * @author @NicholasRoque
    */
    public Contato(){}
    /** 
    *  Cria uma instância da classe Contato
    * @param telefone
    * @author @NicholasRoque
    */
    public Contato(String telefone) {
        this.telefone = telefone;
    }

    /** 
    *  Retorna o Id do contato
    * @return contato.id
    * @author @NicholasRoque
    */
    public long getId() {
        return this.id;
    }

    /** 
    *  Define o id do contato
    * @param id
    * @author @NicholasRoque
    */
    public void setId(long id) {
        this.id = id;
    }

    /** 
    *  Retorna o telefone do usuario
    * @return contato.telefone
    * @author @NicholasRoque
    */
    public String getTelefone() {
        return this.telefone;
    }
    /** 
    *  Define o telefone do usuario
    * @param telefone
    * @author @NicholasRoque
    */
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    /** 
    *  Constrói um retorno legível da classe Contato
    * @return String
    * @author @NicholasRoque
    */
    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }
    
}
