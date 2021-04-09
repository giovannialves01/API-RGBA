package rgba.SkillShare.control;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Tutor;

import rgba.SkillShare.repository.TutorRepository;

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

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import java.util.List;

/**
 *  Classe que define os endpoints para tutor.
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/tutor")
@Api("API de tutor")
public class TutorController {

    @Autowired 
    TutorRepository tRepository;

    /** 
    *  Endpoint para cadastro de tutor.
    * @param tutor
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Cria um usuário do tipo tutor.")
    public Tutor createTutor(@RequestBody @ApiParam("Informações do tutor") Tutor tutor){
        return tRepository.save(tutor);
    }

    /** 
    *  Endpoint para listar todos os tutores.
    * @return Retorna uma lista do objeto Tutor com todos os tutores. 
    * @author Nicholas Roque
    */
    @GetMapping("/findAll")
    @ApiOperation("Retorna uma lista com todos os usuários do tipo tutor")
    @ApiResponse(code = 200,message = "Usuários retornados com sucesso.")
    public List<Tutor> getAllTutores(){
        return tRepository.findAll();
    }

    /** 
    *  Endpoint para retornar os detalhes de um tutor.
    * @return Retorna objeto do tipo Tutor com os dados do tutor.
    * @param cpf -> cpf do tutor
    * @return Tutor
    * @author Nicholas Roque
    */
    @GetMapping("{cpf}")
    @ApiOperation("Retorna os detalhes de um usuário do tipo tutor.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Usuário do tipo tutor encontrado com sucesso."),
        @ApiResponse(code = 404,message = "Usuário do tipo tutor não encontrado para o cpf informado.")
    })
    public Tutor getTutorByCpf(@PathVariable @ApiParam("Cpf do tutor") String cpf) {
        return tRepository
            .findById(cpf)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário do tipo tutor não encontrado.")
            );
    }
    
	@PostMapping(value = "/update")
	public boolean updateTutor(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);
		
		JSONObject admOldData = parsedData.getJSONObject("oldData");
		JSONObject admNewData = parsedData.getJSONObject("newData");
		
		Tutor oldUsuario = new Tutor(admOldData.getString("cpf"), admOldData.getString("nome"), admOldData.getString("email"), admOldData.getString("senha"));
		Tutor newUsuario = new Tutor(admNewData.getString("cpf"), admNewData.getString("nome"), admNewData.getString("email"), admNewData.getString("senha"));
		
		try{
			tRepository.delete(oldUsuario);
			tRepository.save(newUsuario);
			
			return true;
		}catch (Exception e) {
			return false;
		}

	}
	
	@PostMapping(value = "/delete")
	public boolean deleteTutor(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);

		try {
			tRepository.deleteById(parsedData.getString("cpf"));
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
}
