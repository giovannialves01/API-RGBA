package rgba.SkillShare.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import rgba.SkillShare.model.Usuario;
import rgba.SkillShare.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired 
    UsuarioRepository usuarioRepository;

	@PostMapping("/logar")
	public Usuario logar(@PathVariable String cpf, @PathVariable String senha) {
		return usuarioRepository
		.findByCpfAndSenha(senha, cpf)
		.orElseThrow(()->
        	new ResponseStatusException(HttpStatus.NOT_FOUND,"Dados inválidos. Tente novamente.")
		);
	}
}
