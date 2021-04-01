package rgba.SkillShare.control;

import rgba.SkillShare.model.Contato;

import rgba.SkillShare.repository.ContatoRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
 *  Classe que define os endpoints para contato.
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/contato")
@Api("API de contato")
public class ContatoController {

    @Autowired 
    ContatoRepository cRepository;

    /** 
    *  Endpoint para listar todos os contatos.
    * @return Retorna uma lista do objeto Contato com todos os contatos. 
    * @author Nicholas Roque
    */
    @GetMapping("/findAll")
    @ApiOperation("Retorna uma lista com todos os contatos dos usuários")
    @ApiResponse(code = 200,message = "Contatos retornados com sucesso.")
    public List<Contato> getAllContatos(){
        return cRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os contatos de um usuário específico.
    * @return Retorna objeto do tipo Contato com os dados dos contatos do usuário.
    * @param cpf -> cpf do usuario
    * @return Contato
    * @author Nicholas Roque
    */
    @GetMapping("{cpf}")
    @ApiOperation("Retorna os detalhes de contato de um usuário específico.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Contatos encontrados com sucesso."),
        @ApiResponse(code = 404,message = "Contatos não encontrado para o cpf informado.")
    })
    public Contato getContatoByCpf(@PathVariable @ApiParam("Cpf do usuário") String cpf) {
        return cRepository
            .findByCpf(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo gestor não encontrado.")
            );

    }
}
