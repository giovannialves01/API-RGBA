package rgba.SkillShare.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
	
	@Column(nullable = true)
	private String curso;
	
    @OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "material", nullable = false, referencedColumnName = "id")
	private Arquivo material;
	
	public Biblioteca(String nome, String autor, String curso, Arquivo material) {
		this.nome = nome;
		this.autor = autor;
		this.curso = curso;
		this.material = material;
	}
	
}
