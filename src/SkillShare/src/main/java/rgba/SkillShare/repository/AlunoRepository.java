package rgba.SkillShare.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import rgba.SkillShare.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, String>{
    
}
