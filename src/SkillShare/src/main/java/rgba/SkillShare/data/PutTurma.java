package rgba.SkillShare.data;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class PutTurma {
    private String cpfTutor;
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate dataTermino;
    @JsonFormat(pattern="dd/MM/yyyy")
    private LocalDate dataInicio;

}
