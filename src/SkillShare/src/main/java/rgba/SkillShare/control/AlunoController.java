package rgba.SkillShare.control;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Certificado;
import rgba.SkillShare.model.Curso;
import rgba.SkillShare.model.Feedback;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.utils.EmailService;

/**
 *  Classe que define os endpoints para aluno
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/alunos")
@Api("API de aluno")
public class AlunoController {

    @Autowired 
    AlunoRepository aRepository;
    
    @Autowired 
    CursoRepository cursoRepository;
    
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
        
        //EmailService emails = new EmailService();
      //  String corpoMSG = "Parabéns, sua conta na SkillShare foi criada com sucesso! \n "
      //  + "Você pode se conectar utlizando seu CPF e a senha: " + aluno.getSenha() + "\n Seja bem vindo!";
    //	emails.enviarEmailSimples("Conta criada na SkillShare", corpoMSG, aluno.getEmail());
    	
        return aRepository.save(aluno);
    }

    /** 
    *  Endpoint para listar todos os alunos.
    * @return Retorna uma lista do objeto Aluno com todos os alunos. 
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna uma lista com todos os usuários do tipo aluno.")
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
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
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna os detalhes de um usuário do tipo aluno")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo aluno encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo aluno não encontrado para o cpf informado.")
    })
    public Aluno getAlunoByCpf(@PathVariable @ApiParam("Cpf do aluno") String cpf) {
        return aRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo aluno não encontrado.")
            );
    }
    
    /** 
    *  Endpoint para deletar um aluno especificado pelo cpf.
    * @param cpf-> cpf do aluno a ser deletado
    * @author Nicholas Roque
    */
    @DeleteMapping("{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Deleta o aluno especificado pelo cpf.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Aluno deletado com sucesso."),
        @ApiResponse(code = 404,message = "Aluno não encontrado para o cpf informado.")
    })
    public void deleteAlunoByCpf(@PathVariable @ApiParam("Cpf do aluno") String cpf) {
        aRepository
            .findById(cpf)
            .map(a->{
                aRepository.delete(a);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado.")         
            );
    }

    /** 
    *  Endpoint para atualizar um aluno especificado pelo id.
    * @param cpf-> cpf do aluno a ser atualizado
    * @param aluno-> objeto do aluno a ser atualizado
    * @author Nicholas Roque
    */
    @PutMapping("{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Atualiza o aluno especificado pelo cpf.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Aluno atualizado com sucesso."),
        @ApiResponse(code = 404,message = "Aluno não encontrado para o cpf informado.")
    })
    public void updateAlunoByCpf(@PathVariable @ApiParam("Cpf do aluno") String cpf,@RequestBody @ApiParam("Aluno atualizado") Aluno aluno) {
        aRepository
            .findById(cpf)
            .map(a->{
                aluno.setSenha(a.getSenha());
                aRepository.save(aluno);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado.")         
            );
    }
    
    @GetMapping(value = "/certificados")
    public List<Certificado> certificadosAluno(String cpfAluno){
    	Aluno aluno = aRepository.findById(cpfAluno).get();
    	
    	List<Certificado> certificados = aluno.getCertificados();
    	
    	return certificados;
    }
    
    @GetMapping(value = "/feedbacks")
    public ArrayList<HashMap<String, String>> feedbacksAluno(String cpfAluno){
    	Aluno aluno = aRepository.findById(cpfAluno).get();
    	
    	List<Feedback> feedbacks = aluno.getFeedbacks();
    	ArrayList<HashMap<String, String>> pseudoJson = new ArrayList<HashMap<String,String>>();
    	
    	for (int i = 0; i < feedbacks.size(); i++) {
			Feedback feedback = feedbacks.get(i);
			
			HashMap<String, String> data = new HashMap<String, String>();
			
			data.put("acertosErrosProva", feedback.getAcertosErrosProva().toString());
			data.put("comentarioTutor", feedback.getComentarioTutor());
			data.put("compreendimento", String.valueOf(feedback.getCompreendimento()));
			data.put("id", String.valueOf(feedback.getId()));
			data.put("notaFinal", feedback.getNotaFinal());
			data.put("prova", String.valueOf(feedback.getProva().getId()));
			
			pseudoJson.add(data);
		}
    	
    	return pseudoJson;
    }
    
    @PostMapping(value = "/novoFeedback")
    public boolean adicionarFeedback(String cpfAluno, long idCurso, @RequestBody Feedback feedback) {
    	try {
        	Aluno aluno = aRepository.findById(cpfAluno).get();
        	Curso curso = cursoRepository.findById(idCurso).get();
        	
        	Certificado certificado = curso.getCertificado();
        	
        	String data = LocalDate.now().getDayOfMonth() + "/0" + LocalDate.now().getMonthValue() + "/" + LocalDate.now().getYear();
        	
        	certificado.setMensagem("Certificado de comprovamento de que o aluno " + aluno.getNome() + " concluiu o curso "
        	+ curso.getTitulo() + " em " + data);
        	
        	aluno.getFeedbacks().add(feedback);
        	aluno.getCertificados().add(certificado);
        	
        	aRepository.save(aluno);
        	
        	return true;
    	}catch (Exception e) {
    		e.printStackTrace();
    		
    		return false;
    	}

    }
	
}