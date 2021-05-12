package rgba.SkillShare.control;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

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
import rgba.SkillShare.data.GetTurmaByAlunoSession;
import rgba.SkillShare.data.GetTurmasByAlunoSession;
import rgba.SkillShare.data.PostTurma;
import rgba.SkillShare.data.PutTurma;
import rgba.SkillShare.model.Turma;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.repository.TurmaRepository;
import rgba.SkillShare.repository.TutorRepository;
import rgba.SkillShare.utils.EmailService;
import rgba.SkillShare.utils.SessionManager;

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
    * @param PostTurma
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
        turma.setDataTermino(postTurma.getDataTermino());
        turma.setDataInicio(postTurma.getDataInicio());



        for(String cpf : postTurma.getCpfList()){
            alunoRepository.findById(cpf).ifPresent(a->{
                turma.addAluno(a);
                EmailService emails = new EmailService();
                String corpoMSG = a.getNome()+", você foi adicionado(a) a uma turma do curso de "+turma.getCurso().getTitulo()+".";
                //	emails.enviarEmailSimples("Adicionado(a) a uma turma na SkillShare", corpoMSG, a.getEmail());
            });
        }
        turmaRepository.save(turma);

        return turma;
    }
/** 
    *  Endpoint para retornar uma lista de todas as turmas.
    * @return Retorna uma lista de turmas
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma lista de todas as turmas.")
    @ApiResponse(code = 200,message = "Turmas encontradas com sucesso.")
    public List<Turma> getAllTurmas() {

        return turmaRepository.findAll();

    }
    /** 
    *  Endpoint para retornar uma turma através de um determinado id.
    * @return Retorna um objeto do tipo Turma.
    * @param id -> id da turma
    * @author Nicholas Roque
    */
    @GetMapping("/turma/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma turma de um determinado id.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Turma encontrada com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Turma não encontrada para o id informado.")
    })
    public Turma getTurmaById(@ApiParam("Id da turma") @PathVariable Long id) {

        return turmaRepository
        .findById(id)
        .orElseThrow(()->
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o id informado.")
        );

    }


    /** 
    *  Endpoint para retornar uma lista de turmas através de um determinado tutor.
    * @return Retorna uma lista de objetos do tipo Turma.
    * @param cpf -> cpf do tutor
    * @author Nicholas Roque
    */
    @GetMapping("/turma/tutor/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma lista de turmas de um determinado tutor.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Turmas encontradas com sucesso para o cpf informado."),
        @ApiResponse(code = 404,message = "Turmas não encontradas para o cpf informado.")
    })
    public List<Turma> getTurmasByTutor(@ApiParam("Cpf do tutor") @PathVariable String cpf) {

       return tutorRepository
       .findById(cpf).map((tutor)->{
           return tutor.getTurmas();
       })
       .orElseThrow(()->
           new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o cpf informado.")
       );

    }

    /** 
    *  Endpoint para retornar uma lista de turmas que um aluno está inscrito.
    * @return Retorna uma lista de objetos do tipo Turma.
    * @param cpf -> cpf do aluno
    * @author Nicholas Roque
    */
    @GetMapping("/turma/aluno/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma lista de turmas de um determinado aluno.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Turmas encontradas com sucesso para o cpf informado."),
        @ApiResponse(code = 404,message = "Turmas não encontradas para o cpf informado.")
    })
    public Set<Turma> getTurmasByAluno(@ApiParam("Cpf do aluno") @PathVariable String cpf) {

        return alunoRepository
        .findById(cpf).map((aluno)->{
            return aluno.getTurmas();
        })
        .orElseThrow(()->
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o cpf informado.")
        );

    }
    
    /** 
    *  Endpoint para retornar uma lista de turmas que um aluno logado está inscrito (a partir da sessão).
    * @return Retorna uma lista de objetos do tipo Turma.
    * @param HttpSession session -> sessão do Java
    * @author Barbara Port
    */
    @GetMapping("/cursos/aluno")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma lista de turmas do aluno que está logado.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Turmas encontradas com sucesso para o cpf informado."),
        @ApiResponse(code = 404,message = "Turmas não encontradas para o cpf informado.")
    })
    public GetTurmasByAlunoSession getTurmasByAlunoSession(@ApiParam("Dados da sessão do aluno") HttpSession session) {

        return alunoRepository
        .findById(SessionManager.getUserCpf(session)).map((aluno)->{
        	GetTurmasByAlunoSession turmas = new GetTurmasByAlunoSession();
        	turmas.getTurmas().addAll(aluno.getTurmas());
        	turmas.setCpfAluno(aluno.getCpf());
            
        	return turmas;
        })
        .orElseThrow(()->
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado para o cpf informado.")
        );

    }
/** 
    *  Endpoint para retornar uma turma de um curso do aluno que está logado através do id do curso e da sessão.
    * @return Retorna um objeto do tipo Turma.
    * @param HttpSession session -> sessão do Java
    * @param Long id -> id do Curso
    * @author Barbara Port
    */
    @GetMapping("/curso/{id}/aluno")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma turma de um curso do aluno que está logado através do id do curso.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Curso encontrado com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Curso não encontrado para o id informado.")
    })
    public GetTurmaByAlunoSession getTurmaByAlunoSession(@ApiParam("Dados da sessão do aluno") HttpSession session, @PathVariable Long id) {

        return cursoRepository
        .findById(id).map((curso)->{
            Turma turma = turmaRepository.findByCurso(curso);
        	GetTurmaByAlunoSession res = new GetTurmaByAlunoSession();
            res.setCpfAluno(SessionManager.getUserCpf(session));
            res.setTurma(turma);
        	return res;
        })
        .orElseThrow(()->
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado para o id informado.")
        );

    }
     /** 
    *  Endpoint para deletar uma turma especificada pelo id.
    * @param id-> id da turma a ser deletada
    * @author Nicholas Roque
    */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Deleta a turma especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Turma deletada com sucesso."),
        @ApiResponse(code = 404,message = "Turma não encontrada para o id informado.")
    })
    public void deleteTurmaById(@PathVariable @ApiParam("Id da turma") Long id) {
        turmaRepository
            .findById(id)
            .map(t->{
                t.getAlunos().removeAll(t.getAlunos());
                turmaRepository.delete(t);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o id informado.")         
            );
    }

     /** 
    *  Endpoint para retirar um aluno de uma turma especificada pelo id.
    * @param id-> id da turma
    * @param cpf-> cpf do aluno
    * @author Nicholas Roque
    */
    @PutMapping("/remove/{id}/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Remove o aluno da turma especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Aluno removido com sucesso."),
        @ApiResponse(code = 404,message = "Turma não encontrada para o id informado."),
        @ApiResponse(code = 404,message = "Aluno não encontrado para o cpf informado.")
    })
    public void removeAlunoFromTurma(
        @PathVariable @ApiParam("Id da turma") Long id,
        @PathVariable @ApiParam("Cpf do aluno") String cpf
    ) {
        alunoRepository
            .findById(cpf)
            .ifPresentOrElse(
                (a)->{
                    turmaRepository.findById(id)
                    .ifPresentOrElse(
                        (t)->{
                            t.removeAluno(a);
                            turmaRepository.save(t);
                        },()->{
                            new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o id informado.");   
                        }
                    );
                }, ()->{
                    new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado para o cpf informado.");         
                });
    }

     /** 
    *  Endpoint para adicionar um aluno em uma turma especificada pelo id.
    * @param id-> id da turma
    * @param cpf-> cpf do aluno
    * @author Nicholas Roque
    */
   @PutMapping("/add/{id}/{cpf}")
   @ResponseStatus(HttpStatus.NO_CONTENT)
   @ApiOperation("Adiciona o aluno na turma especificada pelo id.")
   @ApiResponses({
       @ApiResponse(code = 204,message = "Aluno adicionado com sucesso."),
       @ApiResponse(code = 404,message = "Turma não encontrada para o id informado."),
       @ApiResponse(code = 404,message = "Aluno não encontrado para o cpf informado.")
   })
   public void addAlunoFromTurma(
       @PathVariable @ApiParam("Id da turma") Long id,
       @PathVariable @ApiParam("Cpf do aluno") String cpf
   ) {
       alunoRepository
           .findById(cpf)
           .ifPresentOrElse(
               (a)->{
                   turmaRepository.findById(id)
                   .ifPresentOrElse(
                       (t)->{
                           t.addAluno(a);
                           turmaRepository.save(t);
                       },()->{
                           new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o id informado.");   
                       }
                   );
               }, ()->{
                   new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado para o cpf informado.");         
               });
   }
	

    /** 
    *  Endpoint para atualizar uma turma especificada pelo id.
    * @param id-> id da turma a ser atualizada
    * @param turma-> objeto da turma a ser atualizada
    * @author Nicholas Roque
    */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Atualiza a turma especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Turma atualizada com sucesso."),
        @ApiResponse(code = 404,message = "Turma não encontrada para o id informado.")
    })
    public void updateTurmaById(@PathVariable @ApiParam("Id da turma") Long id,@RequestBody @ApiParam("Turma atualizada") PutTurma turma) {
        turmaRepository
            .findById(id)
            .map(t->{
                t.setDataTermino(turma.getDataTermino());
                t.setDataInicio(turma.getDataInicio());
                if(!t.getTutor().getCpf().equals(turma.getCpfTutor())){
                    tutorRepository.findById(turma.getCpfTutor())
                    .ifPresentOrElse((tutor)->{
                        t.setTutor(tutor);

                    },()->{
                        new ResponseStatusException(HttpStatus.NOT_FOUND,"Tutor não encontrado para o cpf informado.");         
                    });
                }
                turmaRepository.save(t);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Turma não encontrada para o id informado.")         
            );
    }
}