package rgba.SkillShare.control;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.model.Usuario;
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
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

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
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Cria um usuário do tipo administrador.")
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
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
    @ApiOperation("Retorna uma lista com todos os usuários do tipo administrador.")
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
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna os detalhes de um usuário do tipo administrador.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo aluno encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo aluno não encontrado para o cpf informado.")
    })
    public Adm getAdmByCpf(@PathVariable @ApiParam("Cpf do administrador.") String cpf) {
        return admRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo aluno não encontrado.")
            );
    }
    
	@PostMapping(value = "/update")
	public boolean updateAdm(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);
		
		JSONObject admOldData = parsedData.getJSONObject("oldData");
		JSONObject admNewData = parsedData.getJSONObject("newData");
		
		Adm oldUsuario = new Adm(admOldData.getString("cpf"), admOldData.getString("nome"), admOldData.getString("email"), admOldData.getString("senha"));
		Adm newUsuario = new Adm(admNewData.getString("cpf"), admNewData.getString("nome"), admNewData.getString("email"), admNewData.getString("senha"));
		
		try{
			admRepository.delete(oldUsuario);
			admRepository.save(newUsuario);
			
			return true;
		}catch (Exception e) {
			return false;
		}

	}
	
	@PostMapping(value = "/delete")
	public boolean deleteAdm(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);

		try {
			admRepository.deleteById(parsedData.getString("cpf"));
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
}
