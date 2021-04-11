package rgba.SkillShare.model;

import javax.persistence.CascadeType;
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
 *  Classe que define o material de cada curso 
 *  @author Nicholas Roque
 */
@Entity(name="arquivo_curso")
@NoArgsConstructor @AllArgsConstructor @Data @ToString
public class ArquivoCurso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_biblioteca",referencedColumnName = "id")
    private Biblioteca biblioteca;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_curso",referencedColumnName = "id")
    private Curso curso;

    /** 
    *  Cria uma instância da classe ArquivoCurso.
    * @param nomeArquivo -> nome do arquivo
    * @param conteudo -> arquivo
    * @param tipoArquivo -> tipoArquivo
    * @author Nicholas Roque
    */
    public ArquivoCurso(String nomeArquivo,byte[] conteudo,String tipoArquivo){
    
    }

}