package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *  Classe que define o arquivo
 *  @author Nicholas Roque
 */
@Entity(name="arquivo")
@NoArgsConstructor @AllArgsConstructor @Data
public class Arquivo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idArquivo;

    @Column(nullable = false)
    private String nomeArquivo;

    @Column(nullable = false)
    private Byte arquivo;

    @Column(nullable = false)
    private String tipoArquivo;

    /** 
    *  Cria uma instância da classe Contato.
    * @param nomeArquivo -> nome do arquivo
    * @param arquivo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Arquivo(String nomeArquivo,Byte arquivo,String tipoArquivo){
        this.nomeArquivo = nomeArquivo;
        this.arquivo = arquivo;
        this.tipoArquivo = tipoArquivo;
    }
}
