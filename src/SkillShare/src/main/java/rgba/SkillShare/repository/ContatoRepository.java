package rgba.SkillShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rgba.SkillShare.model.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Long>{
    @Query(value = "select c.* from contato as c join usuario as u on c.id_usuario = u.cpf where u.cpf=:cpf", nativeQuery = true)
    Contato findByCpf(@Param("cpf") String cpf);
}
