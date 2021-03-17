package rgba.SkillShare.model;

import javax.persistence.Entity;


/**
 *   Classe que define os usuários do tipo administrador
 *  @author Nicholas Roque
 */
@Entity(name="adm")
public class Adm extends Usuario{
    

    /** 
    * Construtor padrão da classe Adm
    * @author Nicholas Roque
    */
    public Adm(){}

    /** 
    *  Cria uma instância da classe Adm
    * @param cpf,nome,email,senha
    * @author Nicholas Roque
    */
    public Adm(String cpf,String nome,String email,String senha) { 
        this.setNome(nome);
        this.setCpf(cpf);
        this.setEmail(email);
        this.setSenha(senha);
    }

    /** 
    *  Retorna o contato do administrador
    * @return contatos
    * @author Nicholas Roque
    */
    

    

}
