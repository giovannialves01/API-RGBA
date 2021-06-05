package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.json.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rgba.SkillShare.converters.JSONObjectConverter;

@Entity(name = "feedback")
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column
	private String notaFinal;

	@Column(columnDefinition = "text")
	private String comentarioTutor;

	@Column
	private int compreendimento;
	
	@Column
	private String nomeCurso;

	@Column(columnDefinition = "text")
	@Convert(converter = JSONObjectConverter.class)
	private JSONObject acertosErrosProva;

	@OneToOne
	private Prova prova;

}

