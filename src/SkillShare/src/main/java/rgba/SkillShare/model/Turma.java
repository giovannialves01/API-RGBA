package rgba.SkillShare.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

/**
 *  Classe que define a turma
 *  @author Nicholas Roque
 */
@Entity(name="turma")
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    @JsonFormat(pattern="dd/MM/yyyy")
    LocalDate dataTermino;

    @Column
    @JsonFormat(pattern="dd/MM/yyyy")
    LocalDate dataInicio;

    @ManyToOne
    @JoinColumn(name="id_curso")
    private Curso curso;


    @ManyToOne
    @JoinColumn(name="id_tutor")
    private Tutor tutor;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "turma_aluno", 
        joinColumns = @JoinColumn(name = "id_turma"), 
        inverseJoinColumns = @JoinColumn(name = "cpf_aluno")
    )
    Set<Aluno> alunos = new HashSet<Aluno>();

    public void addAluno(Aluno a){
        this.alunos.add(a);
        a.getTurmas().add(this);
    }

    public void removeAluno(Aluno a){
        this.alunos.remove(a);
        a.getTurmas().remove(this);
    }
}