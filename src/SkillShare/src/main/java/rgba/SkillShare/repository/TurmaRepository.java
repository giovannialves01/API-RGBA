package rgba.SkillShare.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import rgba.SkillShare.model.Curso;
import rgba.SkillShare.model.Turma;

public interface TurmaRepository extends JpaRepository<Turma, Long>{
    
    //List<Turma> findByTutor(Tutor tutor);

    Turma findByCurso(Curso curso);
    
}
