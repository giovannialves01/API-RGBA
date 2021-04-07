package rgba.SkillShare.control;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import rgba.SkillShare.utils.SessionManager;

@Controller
public class PathController {

	@GetMapping(value = "/")
	public String index(HttpSession sessao) {
		if(sessao.isNew()) {
			JSONObject user = new JSONObject();
			
			user.put("type", "guest");
			user.put("userName", "guest");
			
			sessao.setAttribute("user", user);

		}
		
		return "home";
		
	}
	
	@GetMapping(value = "/adminPage")
	public String adminPage(HttpSession sessao) {
		boolean permitido = SessionManager.checkPermission(sessao, "admin");
		
		if(permitido) {
			return "adminHomePage";
		}else {
			return "redirect:login";
		}
		
	}
	
	@GetMapping(value = "/gestorPage")
	public String gestorPage() {
		return "gestorHomePage";
	
	}
	
	@GetMapping(value = "/login")
	public String login(HttpSession sessao) {
		if(sessao.isNew()) {
			JSONObject user = new JSONObject();
			
			user.put("type", "guest");
			user.put("userName", "guest");
			
			sessao.setAttribute("user", user);
		}
		
		return "login";
	}
	
}
 