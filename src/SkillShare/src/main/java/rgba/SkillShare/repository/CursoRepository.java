package rgba.SkillShare.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rgba.SkillShare.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long>{
    @Query(value = "select c.* from curso as c inner join gestor as g on c.id_gestor = g.cpf where g.cpf=:cpf", nativeQuery = true)
    Optional<Set<Curso>> findByGestorCpf(@Param("cpf") String cpf);
}
