package rgba.SkillShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rgba.SkillShare.model.Gestor;

public interface GestorRepository extends JpaRepository<Gestor, String>{
    
}
