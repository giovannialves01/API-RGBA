
package rgba.SkillShare.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
/**
 *  Classe que define as postagens de destaques.
 *  @author Nicholas Roque
 */
@Entity(name = "destaque")
@NoArgsConstructor @Data @AllArgsConstructor @ToString
public class Destaque {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String sinopse;

    @Column(nullable = false)
    private String conteudo;

    @Column(nullable = false)
    private LocalDateTime data;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_thumb",referencedColumnName = "id")
    private Thumb thumb;

    /** 
    *  Cria uma instância da classe Destaque.
    * @param titulo -> titulo do destaque
    * @param sinopse -> sinopse do destaque
    * @param conteudo -> conteudo do destaque
    * @author Nicholas Roque
    */

    public Destaque(String titulo,String sinopse,String conteudo) {
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.conteudo = conteudo;
        this.data = LocalDateTime.now();
    }

}
