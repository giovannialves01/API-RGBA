package rgba.SkillShare.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PathController {

	@GetMapping(value = "/")
	public String home() {
		return "index";
		
	}
	
	@GetMapping(value = "/pag2")
	public String pag2() {
		return "pagina2";
		
	}
	
	@GetMapping(value = "adminPage")
	public String adminPage() {
		return "adminHomePage";
		
	}

}
 