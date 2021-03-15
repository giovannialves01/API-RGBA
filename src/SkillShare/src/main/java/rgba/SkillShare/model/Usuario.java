package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

/**
 *  Classe abstrata que define os usuários
 *  @author @NicholasRoque
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
    * @author @NicholasRoque
    */
    public Usuario() {}

    /** 
    *  Retorna o cpf do usuario
    * @return usuario.cpf
    * @author @NicholasRoque
    */
    public String getCpf() {
        return this.cpf;
    }

    /** 
    *  Define o cpf do usuario
    * @param cpf
    * @author @NicholasRoque
    */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    /** 
    *  Retorna o nome do usuario
    * @return usuario.nome
    * @author @NicholasRoque
    */
    public String getNome() {
        return this.nome;
    }
    /** 
    *  Define o nome do usuario
    * @param nome
    * @author @NicholasRoque
    */
    public void setNome(String nome) {
        this.nome = nome;
    }
    /** 
    *  Retorna o email do usuario
    * @return contato.email
    * @author @NicholasRoque
    */
    public String getEmail() {
        return this.email;
    }

    /** 
    *  Define o email do usuario
    * @param email
    * @author @NicholasRoque
    */
    public void setEmail(String email) {
        this.email = email;
    }

/** 
    *  Constrói um retorno legível da classe Usuario
    * @return String
    * @author @NicholasRoque
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
