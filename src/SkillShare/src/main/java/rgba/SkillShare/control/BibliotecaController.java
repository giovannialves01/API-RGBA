package rgba.SkillShare.control;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import rgba.SkillShare.model.Biblioteca;
import rgba.SkillShare.repository.BibliotecaRepository;


@Api
@RestController
@RequestMapping(value = "/biblioteca")
public class BibliotecaController {
	@Autowired
	BibliotecaRepository bibliotecaRepository;
	
    @PostMapping("/cadastrar")
    public boolean createBiblioteca(@RequestBody Biblioteca biblioteca){
    	try {
    		bibliotecaRepository.save(biblioteca);
    		return true;
    	}catch (Exception e) {
			e.printStackTrace();
			return false;
		}

    }

    @GetMapping("/findAll")
    public List<Biblioteca> getAllBiblioteca(){
        return bibliotecaRepository.findAll();
    }


    @GetMapping(value = "/findById")
    public Biblioteca getBibliotecaById(String data) {
		JSONObject parsedData = new JSONObject(data);
		Biblioteca biblioteca;
		
		try {
			biblioteca = bibliotecaRepository.findById(parsedData.getInt("id")).get();
			
			return biblioteca;
		}catch (Exception e) {
			e.printStackTrace();
			
			return null;
		}
		
	}
    
    
	@PostMapping(value = "/update")
	public boolean updateBiblioteca(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);
		
		JSONObject admOldData = parsedData.getJSONObject("oldData");
		JSONObject admNewData = parsedData.getJSONObject("newData");
		
		Biblioteca oldBiblioteca = new Biblioteca(admOldData.getString("nome"), admOldData.getString("autor"), admOldData.getString("curso"), admOldData.getString("material"));
		Biblioteca newBiblioteca = new Biblioteca(admNewData.getString("nome"), admNewData.getString("autor"), admNewData.getString("curso"), admNewData.getString("material"));
		
		try{
			bibliotecaRepository.delete(oldBiblioteca);
			bibliotecaRepository.save(newBiblioteca);
			
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	@PostMapping(value = "/delete")
	public boolean deleteBiblioteca(@RequestBody String data) {
		JSONObject parsedData = new JSONObject(data);

		try {
			bibliotecaRepository.deleteById(parsedData.getInt("id"));
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
}
