package rgba.SkillShare.control;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import rgba.SkillShare.model.Curso;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.repository.GestorRepository;





/**
 *  Classe que define os endpoints para curso
 *  NAO UTILIZAR ESTE CONTROLER
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/cursos")
@Api("API de curso")
public class CursoController {

    @Autowired 
    CursoRepository cursoRepository;

    @Autowired 
    GestorRepository gestorRepository;


    /** 
    *  Endpoint para cadastro de curso.
    * @param curso
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Curso criado com sucesso.")
    @ApiOperation("Cria um curso.")
    public Curso createCurso(@RequestBody @ApiParam("Informações do curso") Curso curso, @RequestBody @ApiParam("CPF do gestor")String cpf){
        
        return cursoRepository.save(curso);
    }

    /** 
    *  Endpoint para listar todos os cursos.
    * @return Retorna uma lista do objeto Curso com todos os cursos. 
    * @author Nicholas Roque
    */
    @GetMapping
    @ApiOperation("Retorna uma lista com todos os cursos.")
    @ApiResponse(code = 200,message = "Cursos retornados com sucesso.")
    @ResponseStatus(HttpStatus.OK)
    public List<Curso> getAllCursos(){
        return cursoRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os detalhes de um curso.
    * @return Retorna objeto do tipo Curso com os dados do curso especificado.
    * @param id -> id do curso
    * @author Nicholas Roque
    */
    @GetMapping("{id}")
    @ApiOperation("Retorna os detalhes de um curso.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Curso encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Curso não encontrado para o id informado.")
    })
    @ResponseStatus(HttpStatus.OK)
    public Curso getCursoById(@PathVariable @ApiParam("Id do curso") Long id) {
        return cursoRepository
            .findById(id)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
            );
    }

    /** 
    *  Endpoint para retornar os cursos com um determinado gestor.
    * @return Retorna uma lista de objetos do tipo Curso.
    * @param cpf -> cpf do gestor
    * @author Nicholas Roque
    */
   @GetMapping("/gestor/{cpf}")
   @ApiOperation("Retorna os cursos com um determinado gestor.")
   @ApiResponses({
       @ApiResponse(code = 200,message = "Cursos encontrados com sucesso para o cpf informado."),
       @ApiResponse(code = 404,message = "Cursos não encontrados para o cpf informado.")
   })
   @ResponseStatus(HttpStatus.OK)
   public Set<Curso> getCursosByGestor(@PathVariable @ApiParam("Cpf do gestor") String cpf) {
       return cursoRepository
           .findByGestorCpf(cpf)
           .orElseThrow(()->
               new ResponseStatusException(HttpStatus.NOT_FOUND,"Nenhum curso encontrado.")
           );
   }
}
