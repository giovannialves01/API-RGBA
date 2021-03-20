package rgba.SkillShare.control;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.model.Login;
import rgba.SkillShare.model.Usuario;
import rgba.SkillShare.repository.UsuarioRepository;

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

	/**
	 * Método responsável por verificar as informações do usuário para realizar o login.
	 * Recebe os dados do login e realiza uma busca na tabela de usuários
	 *
	 * @param login -> instância da classe Login, que são os dados do formulário
	 * @throws NoSuchElementException -> quando o usuário não é encontrado
	 * @returns usuario -> quando ele é encontrado e os dados estão corretos
	 * @returns null -> quando ele é encontrado, mas os dados não estão corretos
	 * 
	 */
	@PostMapping("/logar")
    @ApiOperation("Efetua o login do usuário.")
    @ResponseStatus(HttpStatus.CREATED)
	@ApiResponses(value = {@ApiResponse(code = 200, message = "Usuário encontrado."), @ApiResponse(code = 500, message = "Usuário não encontrado.")})
	public Usuario logar(@RequestBody Login login) {
		Usuario usuario = usuarioRepository
				.findById(login.getCpf())
				.get();

		if (login.getSenha().equals(usuario.getSenha())) {
			return usuario;
		}
		
		return null;
	}
}
