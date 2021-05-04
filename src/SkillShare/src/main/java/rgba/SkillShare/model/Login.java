package rgba.SkillShare.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

/**
 * Classe utilizada como auxilio na realizacao do login
 * @author Barbara Port
 *
 */
@NoArgsConstructor @Getter @Setter @AllArgsConstructor @ToString
public class Login {
	
	private String cpf;
	private String senha;

}
