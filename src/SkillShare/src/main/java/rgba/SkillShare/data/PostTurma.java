package rgba.SkillShare.data;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class PostTurma {
    private Long idCurso;
    private String cpfTutor;
    private List<String> cpfList;
}
