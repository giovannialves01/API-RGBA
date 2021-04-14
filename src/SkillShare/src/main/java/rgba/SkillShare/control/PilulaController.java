package rgba.SkillShare.control;

import java.io.IOException;
import java.util.Set;

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
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.model.Pilula;
import rgba.SkillShare.model.Thumb;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.repository.PilulaRepository;

/**
 *  Classe que define os endpoints para pílula
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/pilulas")
@Api("API de pilula")
public class PilulaController {

    @Autowired 
    CursoRepository cursoRepository;

    @Autowired  
    PilulaRepository pilulaRepository;

    /** 
    *  Endpoint para cadastro de pilula.
    * @author Nicholas Roque
    * @param curso
    * @throws IOException
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Cria uma pílula.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Pílula criada com sucesso.")
    public Pilula createPilula(@RequestParam MultipartFile th, Pilula pilula,Long idCurso) throws IOException {
        Thumb t = new Thumb(th.getOriginalFilename(),th.getBytes(),th.getContentType());
		return cursoRepository.findById(idCurso)
            .map(curso->{
		        pilula.setThumb(t);
                pilula.setCurso(curso);
                pilulaRepository.save(pilula);
		        return pilula;
            }).orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
            );

	}

    /** 
    *  Endpoint para retornar as pilulas de um determinado curso.
    * @return Retorna uma lista de objetos do tipo Pilula.
    * @param id -> id do curso
    * @author Nicholas Roque
    */
    @GetMapping("/curso/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna as pílulas de um determinado curso.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Pílulas encontradas com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Pílulas não encontradas para o id informado.")
    })
    public Set<Pilula> getPilulasByCurso(@ApiParam("Id do curso") Long id) {
        return cursoRepository
            .findById(id).map(curso->{
                return curso.getPilulas();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Nenhum curso encontrado.")
            );
    }
}