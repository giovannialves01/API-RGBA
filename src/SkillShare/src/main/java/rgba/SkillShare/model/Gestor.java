package src.main.java.rgba.SkillShare.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity(name = "gestor")
public class Gestor extends Usuario {
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "id_gestor")
	private Set<Contato> contatos = new HashSet<Contato>();

	public Gestor() {
	}

	public Gestor(String cpf, String nome, String email, String senha) {
		this.setNome(nome);
		this.setCpf(cpf);
		this.setEmail(email);
		this.setSenha(senha);

	}

	public Set<Contato> getContatos() {
		return this.contatos;
	}

	public void setContatos(Set<Contato> contatos) {
		this.contatos = contatos;
	}

}
