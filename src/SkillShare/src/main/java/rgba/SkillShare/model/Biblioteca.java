package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "biblioteca")
public class Biblioteca {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private String autor;
	
	@Column(nullable = false)
	private String curso;
	
	@Column(nullable = false)
	private String material;
	
	public Biblioteca(String nome, String autor, String curso, String material) {
		this.nome = nome;
		this.autor = autor;
		this.curso = curso;
		this.material = material;
	}
	
}
