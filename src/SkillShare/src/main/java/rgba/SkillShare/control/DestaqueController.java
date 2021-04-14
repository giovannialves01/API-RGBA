
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
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.model.Destaque;
import rgba.SkillShare.model.Thumb;
import rgba.SkillShare.repository.DestaqueRepository;

/**
 *  Classe que define os endpoints para pílula
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/destaques")
@Api("API de destaques")
public class DestaqueController {

    @Autowired 
    DestaqueRepository destaqueRepository;


    /** 
    *  Endpoint para cadastro de destaque.
    * @author Nicholas Roque
    * @param curso
    * @throws IOException
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Cria um destaque.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Destaque criada com sucesso.")
    public Destaque createDestaqueNoticia(@RequestParam MultipartFile th, Destaque destaque) throws IOException {
        Thumb t = new Thumb(th.getOriginalFilename(),th.getBytes(),th.getContentType());
        destaque.setThumb(t);
		return destaqueRepository.save(destaque);
	}

    /** 
    *  Endpoint para retornar todos os destaques.
    * @return Retorna uma lista de objetos do tipo Destque.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna todos os destaques.")
    @ApiResponse(code = 200,message = "Destaques encontrados com sucesso..")
    public List<Destaque> getDestaques() {
        return destaqueRepository.findAll();
    }

    /** 
    *  Endpoint para retornar um destaque especificado pelo id.
    * @return Retorna um objeto do tipo Destaque.
    * @author Nicholas Roque
    */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna o destaque especificado pelo id.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Destaque encontrado com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Destaque não encontrado para o id informado.")
    })
    public Destaque getDestaqueById(@PathVariable @ApiParam("Id do destaque") Long id) {
        return destaqueRepository
            .findById(id)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Destaque não encontrado.")         
            );
    }
}