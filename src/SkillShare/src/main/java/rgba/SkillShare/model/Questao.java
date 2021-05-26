package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Classe que define uma questao do banco de questoes
 * @author Barbara Port
 *
 */
@Entity(name = "questao")
@NoArgsConstructor @Getter @Setter @ToString
public class Questao {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable = false, columnDefinition = "text")
	private String enunciado;
	
	@Column(nullable = false, columnDefinition = "text")
	private String alternativaA;
	
	@Column(nullable = false, columnDefinition = "text")
	private String alternativaB;
	
	@Column(nullable = false, columnDefinition = "text")
	private String alternativaC;
	
	@Column(nullable = false, columnDefinition = "text")
	private String alternativaD;
	
	@Column(nullable = false)
	private String alternativaCorreta;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_curso")
	private Curso curso;
	
}
