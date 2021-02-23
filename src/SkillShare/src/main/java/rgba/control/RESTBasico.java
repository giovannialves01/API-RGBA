package rgba.control;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/rest")
public class RESTBasico {

	@GetMapping(value = "/get")
	public String getJson() {
		JSONObject json = new JSONObject();
		
		json.put("teste", "Testando GET");
		
		return json.toString();
	}
	
	@PostMapping(value = "/post")
	public String postJson(@RequestBody String data) {
		JSONObject json = new JSONObject();
		
		System.out.println(data);
		
		json.put("teste", "Testando POST");
		json.put("eco", data);

		return json.toString();
	}
	
}
