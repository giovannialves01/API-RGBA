package rgba.SkillShare.control;

import rgba.SkillShare.model.Gestor;

import rgba.SkillShare.repository.GestorRepository;

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

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import java.util.List;

/**
 *  Classe que define os endpoints para gestor
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/gestor")
@Api("API de gestor")
public class GestorController {

    @Autowired 
    GestorRepository gRepository;


    /** 
    *  Endpoint para cadastro de gestor.
    * @param gestor
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Cria um usuário do tipo gestor.")
    public Gestor createGestor(@RequestBody @ApiParam("Informações do gestor") Gestor gestor){
        return gRepository.save(gestor);
    }

    /** 
    *  Endpoint para listar todos os gestores.
    * @return Retorna uma lista do objeto Gestor com todos os gestores. 
    * @author Nicholas Roque
    */
    @GetMapping("/findAll")
    @ApiOperation("Retorna uma lista com todos os usuários do tipo gestor")
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
    @ResponseStatus(HttpStatus.OK)
    public List<Gestor> getAllGestores(){
        return gRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os detalhes de um gestor.
    * @return Retorna objeto do tipo Gestor com os dados do gestor.
    * @param cpf -> cpf do gestor
    * @return Gestor
    * @author Nicholas Roque
    */
    @GetMapping("{cpf}")
    @ApiOperation("Retorna os detalhes de um usuário do tipo gestor.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo gestor encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo gestor não encontrado para o cpf informado.")
    })
    @ResponseStatus(HttpStatus.OK)
    public Gestor getGestorByCpf(@PathVariable @ApiParam("Cpf do gestor") String cpf) {
        return gRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo gestor não encontrado.")
            );
    }
}
