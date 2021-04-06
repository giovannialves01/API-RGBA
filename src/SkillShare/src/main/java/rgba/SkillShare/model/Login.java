package rgba.SkillShare.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Classe utilizada como auxilio na realizacao do login
 * @author Barbara Port
 *
 */
@NoArgsConstructor @Data @AllArgsConstructor @ToString
public class Login {
	
	private String cpf;
	private String senha;

}
