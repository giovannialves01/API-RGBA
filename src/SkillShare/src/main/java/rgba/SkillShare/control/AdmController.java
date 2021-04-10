package rgba.SkillShare.control;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.repository.AdmRepository;

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

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 *  Classe que define os endpoints para adm
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/adm")
@Api("API de administradores")
public class AdmController {

    @Autowired 
    AdmRepository admRepository;

    /** 
    *  Endpoint para cadastro de administrador.
    * @param adm
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Cria um usuário do tipo administrador.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Usuário criado com sucesso.")
    public Adm createAdm(@RequestBody @ApiParam("Informações do administrador.") Adm adm){
        System.out.println(adm.toString());
        return admRepository.save(adm);
    }
    /** 
    *  Endpoint para listar todos os administradores.
    * @return Retorna uma lista do objeto Adm com todos os administradores.
    * @author Nicholas Roque
    */
    @GetMapping
    @ApiOperation("Retorna uma lista com todos os usuários do tipo administrador.")
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
    @ResponseStatus(HttpStatus.OK)
    public List<Adm> getAllAdm(){
        return admRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os detalhes de um administrador.
    * @return Retorna objeto do tipo Adm com os dados do usuário.
    * @param cpf -> cpf do administrador
    * @return Adm
    * @author Nicholas Roque
    */
    @GetMapping("{cpf}")
    @ApiOperation("Retorna os detalhes de um usuário do tipo administrador.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo aluno encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo aluno não encontrado para o cpf informado.")
    })
    @ResponseStatus(HttpStatus.OK)
    public Adm getAdmByCpf(@PathVariable @ApiParam("Cpf do administrador.") String cpf) {
        return admRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo aluno não encontrado.")
            );
    }
}
