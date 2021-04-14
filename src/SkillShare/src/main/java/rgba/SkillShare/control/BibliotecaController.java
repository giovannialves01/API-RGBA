package rgba.SkillShare.control;

import java.io.IOException;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
    public Biblioteca createBiblioteca(@RequestParam MultipartFile material,Biblioteca b) throws IOException {
        b.setNomeArquivo(material.getOriginalFilename());
        b.setTipoArquivo(material.getContentType());
        b.setConteudo(material.getBytes());
		return bibliotecaRepository.save(b);
	}
    /** 
    *  Endpoint para retornar todos os materiais presentes nas bibliotecas.
    * @return Retorna uma lista de objetos do tipo Biblioteca.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna todos os materiais das bibliotecas.")
    @ApiResponse(code = 200,message = "Materiais encontradas com sucesso nas bibliotecas.")
    public List<Biblioteca> getBiblioteca() {
        return bibliotecaRepository.findAll();
    }

    /** 
    *  Endpoint para retornar todos os materiais presentes nas bibliotecas.
    * @return Retorna uma lista de objetos do tipo Biblioteca.
    * @author Nicholas Roque
    */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna o material com o id especificado.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Material encontrado com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Material não encontrado para o id informado.")
   })
    public Biblioteca getBibliotecaById(@PathVariable Long id) {
        return bibliotecaRepository.findById(id)
            .orElseThrow(()->
               new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
            );
    }
    
	@PostMapping(value = "/delete")
	public boolean deleteBiblioteca(@RequestBody Biblioteca data) {
		try {
			bibliotecaRepository.deleteById(data.getId());
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			
			return false;
		}
		
	}
	
	@PostMapping(value = "/update")
	public boolean updateBiblioteca(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);
		
		JSONObject oldData = parsedData.getJSONObject("oldData");
		JSONObject newData = parsedData.getJSONObject("newData");
		
		Biblioteca biblioteca = bibliotecaRepository.findById(oldData.getLong("id")).get();
		
		biblioteca.setAutor(newData.getString("autor"));
		biblioteca.setTitulo(newData.getString("titulo"));

		try{
			bibliotecaRepository.save(biblioteca);
			
			return true;
		}catch (Exception e) {
			return false;
		}

	}

    
}
