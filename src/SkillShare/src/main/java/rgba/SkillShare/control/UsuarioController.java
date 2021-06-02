package rgba.SkillShare.control;

import java.util.List;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Gestor;
import rgba.SkillShare.model.Login;
import rgba.SkillShare.model.Tutor;
import rgba.SkillShare.model.Usuario;
import rgba.SkillShare.repository.AdmRepository;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.GestorRepository;
import rgba.SkillShare.repository.TutorRepository;
import rgba.SkillShare.repository.UsuarioRepository;
import rgba.SkillShare.utils.SessionManager;

/**
 * Classe criada com o fim de realizar o login do usuario
 * 
 * @author Bárbara Port
 *
 */

@RestController
@CrossOrigin
@RequestMapping("/usuario")
@Api("API de usuário")
public class UsuarioController {
	
	@Autowired 
    UsuarioRepository usuarioRepository;
	@Autowired 
    AdmRepository admRepository;
	@Autowired 
    GestorRepository gestorRepository;
	@Autowired 
    TutorRepository tutorRepository;
	@Autowired 
    AlunoRepository alunoRepository;
	
	/**
	 * Método responsável por verificar o nível de acesso do usuário
	 * @param cpf
	 * @returns "adm" -> se o usuário é um adm
	 * @returns "gestor" -> se o usuário é um gestor
	 * @returns "tutor" -> se o usuário é um tutor
	 * @returns "aluno" -> se o usuário é um aluno
	 */
	public String verificarNivelAcesso(String cpf) {
		if (admRepository.findById(cpf).isPresent()) {
			return "admin";
		}
		else if (gestorRepository.findById(cpf).isPresent()) {
			return "gestor";
		}
		else if (tutorRepository.findById(cpf).isPresent()) {
			return "tutor";
		}
		else {
			return "aluno";
		}
	}

	/**
	 * Método responsável por verificar as informações do usuário para realizar o login.
	 * Recebe os dados do login e realiza uma busca na tabela de usuários
	 *
	 * @param login -> instância da classe Login, que são os dados do formulário
	 * @throws NoSuchElementException -> quando o usuário não é encontrado
	 * @returns String -> quando ele é encontrado e os dados estão corretos. manda uma string do json com o nivel de acesso e mais os dados do usuario
	 * @returns null -> quando ele é encontrado, mas os dados não estão corretos
	 * 
	 */
	@PostMapping("/logar")
    @ApiOperation("Efetua o login do usuário.")
    @ResponseStatus(HttpStatus.OK)
	@ApiResponses(value = {@ApiResponse(code = 200, message = "Usuário encontrado."), @ApiResponse(code = 500, message = "Usuário não encontrado.")})
	public String logar(@RequestBody Login login, HttpSession sessao) {
		Usuario usuario = usuarioRepository
				.findById(login.getCpf())
				.get();

		if (login.getSenha().equals(usuario.getSenha())) {
			String nivelAcesso = verificarNivelAcesso(login.getCpf());
			
			JSONObject infos_usuario = new JSONObject();
			infos_usuario.put("type", nivelAcesso);
			infos_usuario.put("userName", usuario.getNome());
			infos_usuario.put("cpf", usuario.getCpf());
			
			sessao.setAttribute("user", infos_usuario);
			
			return infos_usuario.toString();
		}
		
		return null;
	}
	
	/**
	 * Verifica se o cliente que está acessando a página já está logado no sistema
	 * 
	 * @author Rafael Furtado
	 * @param sessao - Sessão do usuário
	 * @return Retorna true caso o cliente já esteja logado e false caso ele não esteja
	 */
	@GetMapping(value = "/isLogged")
	@ApiOperation("Verifica se o cliente está logado na plataforma")
	public boolean isLogged(HttpSession sessao) {
		boolean logged = SessionManager.isLogged(sessao);
		
		if(logged) {
			return true;
		}else {
			return false;
		}

	}
	
	/**
	 * Realiza o logout do usuário no sistema, invalidando sua sessão
	 * 
	 * @author Rafael Furtado
	 * @param sessao - Sessão do usuário
	 * @return void
	 */
	@GetMapping(value = "/logout")
	@ApiOperation("Realiza o logout do usuário no sistema")
	public void logout(HttpSession sessao) {
		sessao.invalidate();
	}
	
	/**
	 * Retorna todos os usuários da plataforma
	 * 
	 * @author Barbara Port
	 * @return 
	 * @return List<Usuario> com todos os usuarios cadastrados no sistema
	 */
	@GetMapping(value = "/all")
	@ApiOperation("Retorna todos os usuários do sistema")
	public List<Usuario> todosUsuarios() {
		return usuarioRepository.findAll();
	}
	
	/** 
	    *  Endpoint para retornar os dados de um usuário através de uma sessão
	    * @return Retorna um usuário
	    * @param sessao -> sessao do usuário (login)
	    * @author Barbara Port
	    */
	    @GetMapping("/getData")
	    @ResponseStatus(HttpStatus.OK)
	    @ApiOperation("Retorna os dados de um usuário logado.")
	    @ApiResponses({
	        @ApiResponse(code = 200,message = "Usuário encontrado com sucesso para o cpf informado."),
	        @ApiResponse(code = 404,message = "Usuário não encontrado para o cpf informado.")
	    })
	    public Usuario getDadosUsuario(@ApiParam("Sessão do usuário") HttpSession sessao) {

	       return usuarioRepository
	       .findById(SessionManager.getUserCpf(sessao))
	       .orElseThrow(()->
	           new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado para o cpf informado.")
	       );

	    }
	
    /** 
    *  Endpoint para atualizar um usuário através do cpf
    * @param cpf -> cpf do usuário a ser atualizado
    * @param usuario -> objeto do usuário que será utilizado na alteração
    * @author Bárbara Port
    */
    @PostMapping("/atualizar")
    public boolean updateUsuarioByCpf(@RequestBody Usuario usuario) {
    	try{
    		Usuario rawUser = usuarioRepository.findById(usuario.getCpf()).get();

    		String userClassName = rawUser.getClass().getSimpleName();

    		Usuario user;

    		switch (userClassName) {
	    		case "Adm":
	    			user = (Adm) rawUser;
	    			break;
	
	    		case "Aluno":
	    			user = (Aluno) rawUser;
	    			break;
	
	    		case "Gestor":
	    			user = (Gestor) rawUser;
	    			break;
	
	    		case "Tutor":
	    			user = (Tutor) rawUser;
	    			break;
	
	    		default:
	    			user = null;
	    			break;

    		}

    		user.setEmail(usuario.getEmail());
    		user.setSenha(usuario.getSenha());
    		user.setNome(usuario.getNome());
    		
    		usuarioRepository.save(user);
    		
    		return true;
    	}catch (Exception e) {
    		return false;
    	}
    	
    }
    
}
