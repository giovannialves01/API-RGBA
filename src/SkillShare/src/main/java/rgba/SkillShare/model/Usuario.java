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

    @Id
    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

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
    *  Retorna a senha do usuario
    * @return usuario.senha
    * @author Nicholas Roque
    */
    public String getSenha() {
        return this.senha;
    }
    /** 
    *  Define a senha do usuario
    * @param senha
    * @author Nicholas Roque
    */
    public void setSenha(String senha) {
        this.senha = senha;
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
            ", senha='" + getSenha() + "'" +
            "}";
    }

}
