package rgba.control;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/rest")
public class RESTBasico {

	@GetMapping(value = "/json")
	public String json() {
		JSONObject json = new JSONObject();
		
		json.put("teste", "Testando");
		
		return json.toString();
	}
	
	@GetMapping(value = "/texto")
	public String texto() {
		return "Uma string qualquer";
	}
}
