package rgba.SkillShare.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *  Classe que define o curso
 *  @author Nicholas Roque
 */
@Entity(name="curso")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name="id_gestor")
    private Gestor gestor;

    /** 
    *  Cria uma instância da classe Curso.
    * @param titulo -> Título do curso.
    * @param descricao -> Descrição do curso.
    * @author Nicholas Roque
    */

    public Curso(String titulo,String descricao){
        this.titulo = titulo;
        this.descricao = descricao;
    }
}
