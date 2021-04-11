package rgba.SkillShare.model;

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

    /** 
    *  Cria uma instância da classe Biblioteca.
    * @param nomeArquivo -> nome do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public Biblioteca(String nomeArquivo,byte[] conteudo,String tipoArquivo){
        super(nomeArquivo,conteudo,tipoArquivo);
    }

}
