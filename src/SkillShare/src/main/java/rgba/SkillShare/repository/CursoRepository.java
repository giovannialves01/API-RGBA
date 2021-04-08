package rgba.SkillShare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rgba.SkillShare.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long>{
    @Query(value = "select c.* from curso as c join tutor as t on c.id_tutor = t.cpf where t.cpf=:cpf", nativeQuery = true)
    Optional<List<Curso>> findByCpf(@Param("cpf") String cpf);
}
