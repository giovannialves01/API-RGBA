package rgba.SkillShare.control;

import java.io.IOException;
import java.util.List;

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

import rgba.SkillShare.model.Biblioteca;

import rgba.SkillShare.repository.BibliotecaRepository;


/**
 *  Classe que define os endpoints para biblioteca
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/biblioteca")
@Api("API de biblioteca")
public class BibliotecaController {

    @Autowired 
    BibliotecaRepository bibliotecaRepository;
    /** 
    *  Endpoint para cadastro de material na biblioteca.
    * @author Nicholas Roque
    * @param Biblioteca
    * @throws IOException
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Faz upload de um material para a biblioteca.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Material postado com sucesso na biblioteca.")
    public Biblioteca createBiblioteca(@RequestParam MultipartFile material) throws IOException {
        Biblioteca b = new Biblioteca(material.getOriginalFilename(),material.getBytes(),material.getContentType());
		return bibliotecaRepository.save(b);
	}

    /** 
    *  Endpoint para retornar todos os materiais presentes na biblioteca.
    * @return Retorna uma lista de objetos do tipo Biblioteca.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna as pílulas de um determinado curso.")
    @ApiResponse(code = 200,message = "Materiais encontradas com sucesso na biblioteca.")
    public List<Biblioteca> getBiblioteca() {
        return bibliotecaRepository.findAll();
    }
}
