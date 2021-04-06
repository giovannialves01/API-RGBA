package rgba.SkillShare.control;

import java.io.IOException;

import javax.swing.ImageIcon;

import java.awt.Image;
import java.awt.Toolkit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.model.Arquivo;

import rgba.SkillShare.repository.ArquivoRepository;


/**
 * Classe criada com o fim de realizar upload de arquivos
 * 
 * @author Nicholas Roque
 *
 */

@RestController
@CrossOrigin
@RequestMapping("/arquivo")
@Api("API de usuário")
public class ArquivoController {
	
	@Autowired 
    ArquivoRepository arquivoRepository;

	/**
	 * @throws IOException
	 * 
	 */
	@PostMapping("/upload")
    @ApiOperation("Efetua o upload de um arquivo.")
    @ResponseStatus(HttpStatus.CREATED)
	@ApiResponses(value = {@ApiResponse(code = 200, message = "Arquivo postado com sucesso."), @ApiResponse(code = 500, message = "Erro ao postar arquivo.")})
	public Arquivo uploadArquivo(@RequestParam MultipartFile arquivo) throws IOException {
		Arquivo arq = new Arquivo(arquivo.getOriginalFilename(),arquivo.getBytes(),arquivo.getContentType());
		arquivoRepository.save(arq);
		return arq;
	}
}
