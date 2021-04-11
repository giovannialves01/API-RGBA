package rgba.SkillShare.model;

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
 *  Classe que define o arquivo do tipo thumb 
 *  @author Nicholas Roque
 */
@Entity(name="thumb")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class Thumb extends Arquivo{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(mappedBy = "thumb")
    @JsonIgnore
    private Pilula pilula;

    /** 
    *  Cria uma instância da classe Thumb.
    * @param nomeArquivo -> nome do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Thumb(String nomeArquivo,byte[] conteudo,String tipoArquivo){
        super(nomeArquivo,conteudo,tipoArquivo);
    }

}