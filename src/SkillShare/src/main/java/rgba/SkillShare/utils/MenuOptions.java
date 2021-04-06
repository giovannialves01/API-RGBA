package rgba.SkillShare.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MenuOptions {
	
	/**
	 * @author Rafael Furtado
	 * @return Retorna ao cliente um JSON contendo as informações necessárias para popular o menu do administrador
	 */
	@ResponseBody
	@GetMapping(value = "/getAdminOptions")
	public String getOptions() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.optionCurso());
		menuOptions.put(this.optionBiblioteca());
		menuOptions.put(this.optionBancoDeQuestoes());
		menuOptions.put(this.optionUsuarios());
		menuOptions.put(this.optionNoticiasEEventos());
		menuOptions.put(this.optionDashboard());
		menuOptions.put(this.optionMinhaConta());
		
		return menuOptions.toString();
	}
	
	private JSONObject optionCurso() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Criar novo curso", "console.log(\"Criar novo curso\");"));
		subOptions.put(this.criarSubOpcao("Gerir cursos", "console.log(\"Gerir cursos\");"));
		subOptions.put(this.criarSubOpcao("Criar nova pílula", "console.log(\"Criar nova pílula\");"));
		subOptions.put(this.criarSubOpcao("Gerir pílulas", "console.log(\"Gerir pílulas\");"));
		subOptions.put(this.criarSubOpcao("Criar nova turma", "console.log(\"Criar nova turma\");"));
		subOptions.put(this.criarSubOpcao("Gerir turmas", "console.log(\"Gerir turmas\");"));
		
		option = this.criarOpcao("Cursos", "chalkboard-teacher", "2", "Clique aqui para exibir a janela de cursos", subOptions);
		
		return option;
	}
	
	private JSONObject optionBiblioteca() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Adicionar conteúdo", "hideAllContent();showContent('biblioteca');"));
		subOptions.put(this.criarSubOpcao("Gerir conteúdo", "console.log(\"Gerir conteúdo\");"));
		
		option = this.criarOpcao("Biblioteca", "book", "3", "Clique aqui para exibir a biblioteca", subOptions);
		
		return option;
	}
	
	private JSONObject optionBancoDeQuestoes() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Em breve", "console.log(\"Em breve\");"));
		
		option = this.criarOpcao("Banco de Questões", "file-alt", "4", "Clique aqui para exibir o banco de questões", subOptions);
		
		return option;
	}
	
	private JSONObject optionUsuarios() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Cadastrar usuários", "hideAllContent();showContent('cadastrarUsuario');"));
		subOptions.put(this.criarSubOpcao("Gerir usuários", "hideAllContent();showContent('mostrarAlunos');"));
		
		option = this.criarOpcao("Usuários", "users", "5", "Clique aqui para expandir o menu de usuários", subOptions);
		
		return option;
	}
	
	private JSONObject optionNoticiasEEventos() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Postar nova notícia/evento", "console.log(\"Postar nova notícia/evento\");"));
		subOptions.put(this.criarSubOpcao("Gerir notícias/eventos", "console.log(\"Gerir notícias/eventos\");"));
		
		option = this.criarOpcao("Notícias e eventos", "calendar-day", "6", "Clique aqui para exibir o cadastro de eventos",
				subOptions);
		
		return option;
	}
	
	private JSONObject optionDashboard() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Em breve", "console.log(\"Em breve\");"));
		
		option = this.criarOpcao("Dashboard", "chart-line", "7", "Clique aqui para exibir o dashboard",
				subOptions);
		
		return option;
	}
	
	private JSONObject optionMinhaConta() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Em breve", "console.log(\"Em breve\");"));
		
		option = this.criarOpcao("Minha conta", "user-circle", "8", "Clique aqui para exibir informações da sua conta",
				subOptions);
		
		return option;
	}
	
	
	
	
	/**
	 * Cria um JSONObject da caixa de opção principal do menu
	 * 
	 * @author Rafael Furtado
	 * @param name - Nome que irá aparecer na caixa
	 * @param icon - Ícone da caixa, proveniente do FontAwesome
	 * @param tabIndex - Valor da propriedade tabIndex da caixa
	 * @param title - Texto flutuante de dica
	 * @param subOptions - Subopções que a caixa terá (JSONArray)
	 * @return Retorna um JSONObject da caixa
	 */
	private JSONObject criarOpcao(String name, String icon, String tabIndex, String title, JSONArray subOptions) {
		JSONObject option = new JSONObject();
		
		option.put("name", name);
		option.put("icon", icon);
		option.put("tabIndex", tabIndex);
		option.put("title", title);
		option.put("subOptions", subOptions);
		
		return option;
	}
	
	/**
	 * Cria um JSONObject de uma subpção para adicionar a uma opção principal do menu
	 * 
	 * @author Rafael Furtado
	 * @param textValue - Texto da subopção
	 * @param onclick - Funções que serão chamadas ao clicar na subopção
	 * @return Retorna um JSONObject da subopção
	 */
	private JSONObject criarSubOpcao(String textValue, String onclick) {
		JSONObject subOption = new JSONObject();
		subOption.put("textValue", textValue);
		subOption.put("onclick", onclick);
		
		return subOption;
	}
	
}
