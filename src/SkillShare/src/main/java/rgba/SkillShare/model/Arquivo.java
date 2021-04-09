package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *  Classe que define o arquivo
 *  @author Nicholas Roque
 */
@Entity(name="arquivo")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Arquivo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idArquivo;

    @Column(nullable = false)
    private String nomeArquivo;

    @Lob
    @Column(nullable = false)
    private byte[] conteudo;

    @Column(nullable = false)
    private String tipoArquivo;

    @ManyToOne
    @JoinColumn(name="id_pilula")
    private Pilula pilula;
    
    /** 
    *  Cria uma instância da classe Contato.
    * @param nomeArquivo -> nome do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Arquivo(String nomeArquivo,byte[] conteudo,String tipoArquivo){
        this.nomeArquivo = nomeArquivo;
        this.conteudo = conteudo;
        this.tipoArquivo = tipoArquivo;
    }
    public Arquivo(String nomeArquivo,String tipoArquivo){
        this.nomeArquivo = nomeArquivo;
        this.tipoArquivo = tipoArquivo;
    }
}
