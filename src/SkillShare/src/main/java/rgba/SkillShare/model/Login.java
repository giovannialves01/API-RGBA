package rgba.SkillShare.model;
/**
 * Classe utilizada como auxilio na realizacao do login
 * @author Barbara Port
 *
 */
public class Login {
	
	private String cpf;
	private String senha;
	
	/**
	 * Construtor padrao da classe Login
	 * @author Barbara Port
	 */
	public Login () {}
	
	/**
	 * Cria uma instancia da classe
	 * @param cpf -> cpf do usuario
	 * @param senha -> senha do usuario
	 * @author Barbara Port
	 */
	public Login (String cpf, String senha) {
		this.setCpf(cpf);
		this.setSenha(senha);
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
    @Override
    public String toString() {
        return "{" +
            " cpf='" + getCpf() + "'" +
            ", senha='" + getSenha() + "'" +
            "}";
    }

}
