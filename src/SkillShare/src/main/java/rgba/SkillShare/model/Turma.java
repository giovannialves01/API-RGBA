package rgba.SkillShare.model;

import java.util.HashSet;
import java.util.List;
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
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *  Classe que define o curso
 *  @author Nicholas Roque
 */
@Entity(name="turma")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="id_curso")
    @JsonIgnore //ignora o curso no retorno do json
    private Curso curso;


    @ManyToOne
    @JoinColumn(name="id_tutor")
    @JsonIgnore //ignora o tutor no retorno do json
    private Tutor tutor;

    @ManyToMany(mappedBy = "turmas")
    /* @ManyToMany
    @JoinTable(
        name = "turma_aluno", 
        joinColumns = @JoinColumn(name = "id_turma"), 
        inverseJoinColumns = @JoinColumn(name = "cpf_aluno")
    ) */
    Set<Aluno> alunos = new HashSet<Aluno>();

    public void addAluno(Aluno a){
        alunos.add(a);
    }
}