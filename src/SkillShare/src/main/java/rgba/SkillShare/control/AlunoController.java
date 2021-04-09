package rgba.SkillShare.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.utils.EmailService;





/**
 *  Classe que define os endpoints para aluno
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/aluno")
@Api("API de aluno")
public class AlunoController {

    @Autowired 
    AlunoRepository aRepository;
    
    @Autowired
	JavaMailSender javaMailSender;

    /** 
    *  Endpoint para cadastro de aluno.
    * @param aluno
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Cria um usuário do tipo aluno.")
    public Aluno createAluno(@RequestBody @ApiParam("Informações do aluno") Aluno aluno){
        
        EmailService emails = new EmailService();
        String corpoMSG = "Parabéns, sua conta na SkillShare foi criada com sucesso! \n "
        + "Você pode se conectar utlizando seu CPF e a senha: " + aluno.getSenha() + "\n Seja bem vindo!";
    	emails.enviarEmailSimples("Conta criada na SkillShare", corpoMSG, aluno.getEmail());
    	
        return aRepository.save(aluno);
    }

    /** 
    *  Endpoint para listar todos os alunos.
    * @return Retorna uma lista do objeto Aluno com todos os alunos. 
    * @author Nicholas Roque
    */
    @GetMapping("/findAll")
    @ApiOperation("Retorna uma lista com todos os usuários do tipo aluno.")
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
    @ResponseStatus(HttpStatus.OK)
    public List<Aluno> getAllAlunos(){
        return aRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os detalhes de um aluno.
    * @return Retorna objeto do tipo Aluno com os dados do usuário.
    * @param cpf -> cpf do aluno
    * @return Aluno
    * @author Nicholas Roque
    */
    @GetMapping("{cpf}")
    @ApiOperation("Retorna os detalhes de um usuário do tipo aluno")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo aluno encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo aluno não encontrado para o cpf informado.")
    })
    @ResponseStatus(HttpStatus.OK)
    public Aluno getAlunoByCpf(@PathVariable @ApiParam("Cpf do aluno") String cpf) {
        return aRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo aluno não encontrado.")
            );
    }
}
