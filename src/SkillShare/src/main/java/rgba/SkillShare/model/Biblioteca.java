package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *  Classe que define o arquivo do tipo biblioteca 
 *  @author Nicholas Roque
 */
@Entity(name="biblioteca")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Biblioteca extends Arquivo{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String autor;

    @Column(nullable = false)
    private String titulo;

    /** 
    *  Cria uma instância da classe Biblioteca.
    * @param tituloArquivo -> titulo do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Biblioteca(String tituloArquivo,byte[] conteudo,String tipoArquivo,String titulo){
        super(tituloArquivo,conteudo,tipoArquivo);
        this.titulo = titulo;
    }

    public Biblioteca(String tituloArquivo,byte[] conteudo,String tipoArquivo,String titulo,String autor){
        super(tituloArquivo,conteudo,tipoArquivo);
        this.titulo = titulo;
        this.autor = autor;
    }

}
