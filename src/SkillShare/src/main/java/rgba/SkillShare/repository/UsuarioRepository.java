package rgba.SkillShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rgba.SkillShare.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
    
    @Override
    @Query(value = "select * from usuarios order by nome", nativeQuery = true)
    List<Usuario> findAll();
}
