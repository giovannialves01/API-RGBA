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
	public String gestorPage(HttpSession sessao) {
		boolean permitido = SessionManager.checkPermission(sessao, "gestor");
			
			if(permitido) {
				return "gestorHomePage";
			}
			else {
				return "redirect:login";
			}
	
	}
	
	@GetMapping(value = "/tutorPage")
	public String tutorPage(HttpSession sessao) {
		boolean permitido = SessionManager.checkPermission(sessao, "tutor");
			
			if(permitido) {
				return "tutorHomePage";
			}
			else {
				return "redirect:login";
			}
	
	}
	
	@GetMapping(value = "/alunoPage")
	public String alunoPage(HttpSession sessao) {
		boolean permitido = SessionManager.checkPermission(sessao, "aluno");
			
			if(permitido) {
				return "paginaAluno";
			}
			else {
				return "redirect:login";
			}
	
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
	
	@GetMapping(value = "/acervo")
	public String paginaBiblioteca(HttpSession sessao) {
		return "paginaBiblioteca";
	}
	
	@GetMapping(value = "/materialAcervo")
	public String materialDoAcervo() {
		return "materialAcervo";
	}
	

	@GetMapping(value = "/upload")
	public String uploadImagem() {
		return "upload";
	}
	
}
 