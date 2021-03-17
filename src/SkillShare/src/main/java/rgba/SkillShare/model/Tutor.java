package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo tutor.
 *  @author Nicholas Roque
 */
@Entity(name="tutor")
public class Tutor extends Usuario{
    

    /** 
    * Construtor padrão da classe Tutor
    * @author Nicholas Roque
    */
    public Tutor(){}

    /** 
    *  Cria uma instância da classe Tutor.
    * @param cpf,nome,email,senha
    * @author Nicholas Roque
    */
    public Tutor(String cpf,String nome,String email,String senha) { 
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
        this.setSenha(senha);
    }


}
