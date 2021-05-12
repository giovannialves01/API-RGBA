package rgba.SkillShare.data;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import rgba.SkillShare.model.Turma;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class GetTurmaByAlunoSession {
	
	private String cpfAluno;  
	private Turma turma;

}
