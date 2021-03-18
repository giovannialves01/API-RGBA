package rgba.SkillShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rgba.SkillShare.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, String>{
    
}
