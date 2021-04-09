package rgba.SkillShare.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rgba.SkillShare.model.Pilula;

public interface PilulaRepository extends JpaRepository<Pilula, Long>{

    @Query(value = "select p.* from pilula as p inner join curso as c on c.id = p.id_curso where c.id=:id", nativeQuery = true)
    Optional<Set<Pilula>> findByIdCurso(@Param("id") Long id);
    
}
