package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo gestor.
 *  @author Nicholas Roque
 */
@Entity(name="gestor")
public class Gestor extends Usuario{
    

    /** 
    * Construtor padrão da classe Gestor
    * @author Nicholas Roque
    */
    public Gestor(){}

    /** 
    *  Cria uma instância da classe Gestor.
    * @param cpf,nome,email,senha
    * @author Nicholas Roque
    */
    public Gestor(String cpf,String nome,String email,String senha) { 
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
        this.setSenha(senha);
    }


}
