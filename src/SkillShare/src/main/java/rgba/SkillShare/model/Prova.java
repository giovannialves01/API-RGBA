package rgba.SkillShare.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "prova")
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Prova {
	
	@Id
	private int id;
	
	@OneToMany
	private List<Questao> questoes;
	
}
