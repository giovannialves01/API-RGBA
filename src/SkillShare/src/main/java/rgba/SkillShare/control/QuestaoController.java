package rgba.SkillShare.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import rgba.SkillShare.model.Curso;
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
	@PostMapping("/cadastrar")
	@ApiOperation("Cadastra uma nova questão no banco de questões.")
	@ResponseStatus(HttpStatus.CREATED)
	@ApiResponse(code = 201, message = "Questão cadastrada com sucesso.")
	public Questao cadastrarQuestao(@RequestBody @ApiParam("Curso ao qual a questão pertence") long id_curso, @RequestBody @ApiParam("Informações da questão") Questao questao) {
		return cursoRepository.findById(id_curso)
		.map(curso -> {
			questao.setCurso(curso);
			return questaoRepository.save(questao);
		})
		.orElseThrow(()->
        	new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
		);
	}
}
