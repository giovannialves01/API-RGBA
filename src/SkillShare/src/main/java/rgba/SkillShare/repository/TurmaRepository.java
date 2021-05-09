package rgba.SkillShare.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rgba.SkillShare.model.Turma;
import rgba.SkillShare.model.Tutor;

public interface TurmaRepository extends JpaRepository<Turma, Long>{
    
    //List<Turma> findByTutor(Tutor tutor);
    
}
