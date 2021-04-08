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
 *  Classe que define a pílula
 *  @author Nicholas Roque
 */
@Entity(name="pilula")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Pilula {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "pilula",cascade = CascadeType.ALL)
    private Set<Arquivo> arquivos;

    @ManyToOne
    @JoinColumn(name="id_curso")
    private Curso curso;

    /** 
    *  Cria uma instância da classe Pilula.
    * @param titulo -> Título da pílula
    * @param descricao -> Descrição da pílula
    * @author Nicholas Roque
    */
    public Pilula(String titulo,String descricao){
        this.titulo = titulo;
        this.descricao = descricao;
    }

}
