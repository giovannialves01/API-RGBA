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
 *  Classe que define as postagens de eventos.
 *  @author Nicholas Roque
 */
@Entity(name = "evento")
@NoArgsConstructor @Data @AllArgsConstructor @ToString
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String sinopse;

    @Column(nullable = false)
    private String conteudo;

    @Column
    private LocalDateTime data = LocalDateTime.now();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_thumb",referencedColumnName = "id")
    private Thumb thumb;

    /** 
    *  Cria uma instância da classe Evento.
    * @param titulo -> titulo do evento.
    * @param sinopse -> sinopse do evento.
    * @param conteudo -> conteudo do evento.
    * @author Nicholas Roque
    */

    public Evento(String titulo,String sinopse,String conteudo) {
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.conteudo = conteudo;
    }

}