package rgba.SkillShare.control;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import rgba.SkillShare.model.Arquivo;
import rgba.SkillShare.model.Pilula;
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
    public Pilula createPilula(@RequestParam MultipartFile arq, Pilula pilula,Long idCurso) throws IOException {
        Arquivo a = new Arquivo(arq.getOriginalFilename(),arq.getBytes(),arq.getContentType());
		return cursoRepository.findById(idCurso)
            .map(curso->{
		        pilula.setArquivo(a);
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
    public List<Pilula> getPilulasByCurso(@ApiParam("Id do curso") @PathVariable Long id) {
        if(!cursoRepository.existsById(id)){
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado para o id informado.");
        }
        return cursoRepository.findById(id).get().getPilulas();

    }

     /** 
    *  Endpoint para retornar todas as pilulas.
    * @return Retorna uma lista de objetos do tipo Pilula.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna todas as pilulas.")
    @ApiResponse(code = 200,message = "Pílulas encontradas com sucesso.")
    public List<Pilula> getAllPilulas() {
        return pilulaRepository.findAll();
    }

       /** 
    *  Endpoint para deletar uma pílula especificada pelo id.
    * @param id-> id da pílula a ser deletada
    * @author Nicholas Roque
    */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Deleta a pílula especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Pílula deletada com sucesso."),
        @ApiResponse(code = 404,message = "Pílula não encontrada para o id informado.")
    })
    public void deletePilulaById(@PathVariable @ApiParam("Id da pílula") Long id) {
        pilulaRepository
            .findById(id)
            .map(p->{
                pilulaRepository.delete(p);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Pílula não encontrada.")         
            );
    }

    /** 
    *  Endpoint para atualizar uma pílula especificada pelo id.
    * @param id-> id da pílula a ser atualizada
    * @param pilula-> objeto da pílula a ser atualizada
    * @author Nicholas Roque
    */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Atualiza a pílula especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Pílula atualizada com sucesso."),
        @ApiResponse(code = 404,message = "Pílula não encontrada para o id informado.")
    })
    public void updatePilulaById(@PathVariable @ApiParam("Id da pílula") Long id,@RequestBody @ApiParam("Pílula atualizada") Pilula pilula) {
        pilulaRepository
            .findById(id)
            .map(p->{
                pilula.setArquivo(p.getArquivo());
                pilula.setCurso(p.getCurso());
                pilulaRepository.save(pilula);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Pílula não encontrado.")         
            );
    }
}