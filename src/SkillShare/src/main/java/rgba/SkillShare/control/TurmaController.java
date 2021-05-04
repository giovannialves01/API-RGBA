package rgba.SkillShare.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.data.PostTurma;
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Turma;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.repository.TurmaRepository;
import rgba.SkillShare.repository.TutorRepository;
import rgba.SkillShare.utils.EmailService;





/**
 *  Classe que define os endpoints para turma
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/turmas")
@Api("API de turma")
public class TurmaController {

    @Autowired 
    AlunoRepository alunoRepository;
    
    @Autowired 
    TurmaRepository turmaRepository;

    @Autowired 
    CursoRepository cursoRepository;

    @Autowired 
    TutorRepository tutorRepository;

    /** 
    *  Endpoint para cadastro de turma.
    * @param aluno
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Cria uma turma e adiciona os alunos.")
    public Turma createTurma(
        @RequestBody @ApiParam("Dados da turma") PostTurma postTurma
    ){

        if(!cursoRepository.existsById(postTurma.getIdCurso())){
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado para o id informado.");
        }
        if(!tutorRepository.existsById(postTurma.getCpfTutor())){
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Tutor não encontrado para o cpf informado.");
        }

        Turma turma = new Turma();
        turma.setCurso(cursoRepository.findById(postTurma.getIdCurso()).get());
        turma.setTutor(tutorRepository.findById(postTurma.getCpfTutor()).get());


        for(String cpf : postTurma.getCpfList()){
            alunoRepository.findById(cpf).ifPresent(a->{
                turma.addAluno(a);
                a.addTurma(turma);
            });
        }
        turmaRepository.save(turma);
/* turma1.addAluno(rafael);
			turma1.addAluno(nicholasAluno);
			turma2.addAluno(nicholasAluno);

			//add turma to aluno
			rafael.addTurma(turma1);
			nicholasAluno.addTurma(turma1);
			nicholasAluno.addTurma(turma2);

			turmaRepository.save(turma1); */

        return turma;
    }
	
}