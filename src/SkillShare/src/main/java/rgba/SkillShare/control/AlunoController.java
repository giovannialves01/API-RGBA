package rgba.SkillShare.control;

import rgba.SkillShare.model.Aluno;

import rgba.SkillShare.repository.AlunoRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;





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
    * @param aluno
    * @return Retorna para a página definida
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno createAluno(@RequestBody Aluno aluno){

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
