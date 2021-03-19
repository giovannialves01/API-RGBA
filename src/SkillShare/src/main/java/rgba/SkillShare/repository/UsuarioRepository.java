package rgba.SkillShare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rgba.SkillShare.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
    
	Optional<Usuario> findByCpfAndSenha(String senha, String cpf);
}
