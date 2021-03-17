package rgba.SkillShare.control;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AlunoRepository;

/**
 *  Classe que define os endpoints para aluno
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired 
    AlunoRepository aRepository;

    /** 
    *  Endpoint para cadastro de aluno
    * @param aluno,contato
    * @return Retorna para a página definida
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno createAluno(@RequestBody Aluno aluno, @RequestBody Contato contato){
        aluno.getContatos().add(contato);
        return aRepository.save(aluno);
    }

    /** 
    *  Endpoint para listar todos os alunos
    * @return Retorna um ModelAndView com a lista de alunos
    * @author Nicholas Roque
    */
    @GetMapping("/listarTodos")
    public List<Aluno> getAllAlunos(){
        return aRepository.findAll();
    }

}
