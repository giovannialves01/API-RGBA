package rgba.SkillShare.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

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
public class Arquivo implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idArquivo;

    @Column(nullable = false)
    private String nomeArquivo;

    @Lob
    @Column(nullable = false)
    private byte[] arquivo;

    @Column(nullable = false)
    private String tipoArquivo;

    /** 
    *  Cria uma instância da classe Contato.
    * @param nomeArquivo -> nome do arquivo
    * @param arquivo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Arquivo(String nomeArquivo,byte[] arquivo,String tipoArquivo){
        this.nomeArquivo = nomeArquivo;
        this.arquivo = arquivo;
        this.tipoArquivo = tipoArquivo;
    }
    public Arquivo(String nomeArquivo,String tipoArquivo){
        this.nomeArquivo = nomeArquivo;
        this.tipoArquivo = tipoArquivo;
    }
}
