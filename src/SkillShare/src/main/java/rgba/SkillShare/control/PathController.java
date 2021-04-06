package rgba.SkillShare.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PathController {

	@GetMapping(value = "/")
	public String index() {
		return "home";
		
	}
	
	@GetMapping(value = "/pag2")
	public String pag2() {
		return "pagina2";
		
	}
	
	@GetMapping(value = "/adminPage")
	public String adminPage() {
		return "adminHomePage";
	
	}
	
	@GetMapping(value = "/gestorPage")
	public String gestorPage() {
		return "gestorHomePage";
	
	}
	
	@GetMapping(value = "/login")
	public String login() {
		return "login";
	}
	
	@GetMapping(value = "/menuTopBarTeste")
	public String menu() {
		return "menuTopBarTeste";
	}
}
 