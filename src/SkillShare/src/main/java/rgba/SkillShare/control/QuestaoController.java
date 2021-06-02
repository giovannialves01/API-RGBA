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
import rgba.SkillShare.model.Questao;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.repository.QuestaoRepository;

/**
 * Endpoints para as questoes
 * @author Barbara Port
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/questoes")
@Api("API das questões")
public class QuestaoController {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	@Autowired
	QuestaoRepository questaoRepository;
	
	@Autowired
	CursoRepository cursoRepository;
	
	/**
	 * Endpoint para cadastrar uma nova questao
	 * @param id_curso -> id do curso
	 * @param questao -> questao a ser cadastrada
	 * @author Barbara Port
	 * 
	 */
	@PostMapping("/cadastrar/{idCurso}")
	@ApiOperation("Cadastra uma nova questão no banco de questões.")
	@ResponseStatus(HttpStatus.CREATED)
	@ApiResponse(code = 201, message = "Questão cadastrada com sucesso.")
	public Questao cadastrarQuestao( @ApiParam("Curso ao qual a questão pertence") @PathVariable Long idCurso, @ApiParam("Informações da questão") @RequestBody Questao questao) {
		return cursoRepository.findById(idCurso)
		.map(curso -> {
			questao.setCurso(curso);
			return questaoRepository.save(questao);
		})
		.orElseThrow(()->
        	new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
		);
		
	}
	
	/**
	 * Endpoint para listar todas as questoes (sem filtrar por curso)
	 * @author Barbara Port
	 */
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation("Retorna todas as questões, independente do curso")
	@ApiResponse(code = 200, message = "Questões encontradas com sucesso.")
	public List<Questao> todasQuestoes () {
		return questaoRepository.findAll();
	}
	
	/**
	 * Endpoint para listar todas as questoes de um curso
	 * @author Barbara Port
	 */
	@GetMapping("/curso/{id}")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation("Retorna as questões de um determinado curso.")
	@ApiResponses({
		@ApiResponse (code = 200, message = "Questões encontradas."),
		@ApiResponse (code = 404, message = "Curso não encontrado.")
	})
	public List<Questao> questoesCurso (@ApiParam("ID do curso solicitado") @PathVariable Long id) {
		if (!cursoRepository.existsById(id)) {
			new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso não encontrado.");
		}
		return cursoRepository.findById(id).get().getQuestoes();
	}
	
	/**
	 * Endpoint para alterar uma questao
	 * @param id -> id da questao
	 * @param questao -> dados da questao
	 * @autor Barbara Port
	 */
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation("Atualiza a questão através do seu ID")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Questão atualizada com sucesso."),
        @ApiResponse(code = 404,message = "Questão não encontrada para o id informado.")
    })
    public void updateQuestaoById(@PathVariable @ApiParam("ID da questão") Long id,@RequestBody @ApiParam("Questão atualizada.") Questao questao) {
        questaoRepository
            .findById(id)
            .map(q->{
                questao.setCurso(q.getCurso());
                questaoRepository.save(questao);
                return ResponseEntity.ok().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Questão não encontrada.")         
            );
    }
	
	/**
	 * Endpoint para deletar uma questao
	 * @param id -> id da questao
	 * @author Barbara Port
	 *
	 */
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation("Deleta a questao pelo seu ID")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Questão deletada com sucesso!"),
		@ApiResponse(code = 404, message = "Questão não encontrada...")
	})
	public void deletarQuestaoById(@PathVariable @ApiParam("ID da questão") Long id) {
		questaoRepository.findById(id)
		.map(questao -> {
			questaoRepository.delete(questao);
			return ResponseEntity.ok().build();
		})
		.orElseThrow(() -> 
			new ResponseStatusException(HttpStatus.NOT_FOUND,"Questão não encontrada.")
		);
	}
}
