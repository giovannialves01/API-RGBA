package rgba.SkillShare.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import rgba.SkillShare.model.ArquivoCurso;
import rgba.SkillShare.model.Curso;

public interface ArquivoCursoRepository extends JpaRepository<ArquivoCurso, Long>{
    Set<ArquivoCurso> findByCurso(Curso curso);
}