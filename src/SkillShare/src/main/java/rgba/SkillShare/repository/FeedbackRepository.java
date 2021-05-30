package rgba.SkillShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rgba.SkillShare.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{

	@Query(value = "select * from feedback where feedback.prova_id=:idProva", nativeQuery = true)
    List<Feedback> findByProva(@Param("idProva") long idProva);
}
