package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(nullable = false)
    private String titulo;

    @Column
    private String autor;
    
    @OneToOne(mappedBy = "biblioteca")
    @JsonIgnore
    private ArquivoCurso arquivoCurso;

    /** 
    *  Cria uma instância da classe Biblioteca.
    * @param nomeArquivo -> nome do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Biblioteca(String nomeArquivo,byte[] conteudo,String tipoArquivo,String autor, String titulo){
        super(nomeArquivo,conteudo,tipoArquivo);
        this.titulo = titulo;
        this.autor = autor;
    }
    public Biblioteca(String nomeArquivo,byte[] conteudo,String tipoArquivo, String titulo){
        super(nomeArquivo,conteudo,tipoArquivo);
        this.titulo = titulo;
    }
}