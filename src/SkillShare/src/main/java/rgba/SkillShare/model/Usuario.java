package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

/**
 *  Classe abstrata que define os usuários
 *  @author Nicholas Roque
 */
@Entity(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {
    /** 
    * @param cpf
    */
    @Id
    private String cpf;
    /** 
    * @param nome
    */
    @Column(nullable = false)
    private String nome;
    /** 
    * @param email
    */
   private String email;

   /** 
    * Construtor padrão da classe Usuario
    * @author Nicholas Roque
    */
    public Usuario() {}

    /** 
    *  Retorna o cpf do usuario
    * @return usuario.cpf
    * @author Nicholas Roque
    */
    public String getCpf() {
        return this.cpf;
    }

    /** 
    *  Define o cpf do usuario
    * @param cpf
    * @author Nicholas Roque
    */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    /** 
    *  Retorna o nome do usuario
    * @return usuario.nome
    * @author Nicholas Roque
    */
    public String getNome() {
        return this.nome;
    }
    /** 
    *  Define o nome do usuario
    * @param nome
    * @author Nicholas Roque
    */
    public void setNome(String nome) {
        this.nome = nome;
    }
    /** 
    *  Retorna o email do usuario
    * @return usuario.email
    * @author Nicholas Roque
    */
    public String getEmail() {
        return this.email;
    }

    /** 
    *  Define o email do usuario
    * @param email
    * @author Nicholas Roque
    */
    public void setEmail(String email) {
        this.email = email;
    }

/** 
    *  Constrói um retorno legível da classe Usuario
    * @return String
    * @author Nicholas Roque
    */
    @Override
    public String toString() {
        return "{" +
            " cpf='" + getCpf() + "'" +
            ", nome='" + getNome() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }

}
