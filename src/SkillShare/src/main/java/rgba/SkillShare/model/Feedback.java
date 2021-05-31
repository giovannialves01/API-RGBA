package rgba.SkillShare.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Converter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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

