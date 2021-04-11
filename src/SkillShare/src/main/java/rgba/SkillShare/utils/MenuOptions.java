package rgba.SkillShare.utils;

import javax.servlet.http.HttpSession;

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
	@GetMapping(value = "/getMenuOptions")
	public String getOptions(HttpSession sessao) {
		boolean logado = SessionManager.isLogged(sessao);
		String userType;
		
		if(logado) {
			JSONObject user = (JSONObject) sessao.getAttribute("user");
			userType = user.getString("type");
		}else {
			userType = "guest";
		}

		
	
		switch (userType) {
		
		default:
			JSONArray menu;
			
		case "guest":
			menu = guestMenu();
			
			return menu.toString();
			
		case "admin":
			menu = adminMenu();
			
			return menu.toString();
		
		case "gestor":
			menu = gestorMenu();
			
			return menu.toString();
		
		case "tutor":
			menu = tutorMenu();
			
			return menu.toString();
		
		case "aluno":
			menu = alunoMenu();
			
			return menu.toString();
		
		}
		
	}
	
	private JSONArray guestMenu() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.guestBiblioteca());
		menuOptions.put(this.guestPilulas());
		
		return menuOptions;
	}
	
	private JSONObject guestBiblioteca() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Acessar a biblioteca", "console.log(\"Acessando a biblioteca\");"));
		
		option = this.criarOpcao("Biblioteca", "book", "2", "Clique aqui para ir para a página da biblioteca", subOptions);
		
		return option;
	}
	
	private JSONObject guestPilulas() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Acessar as pílulas", "console.log(\"Acessando as pílulas\");"));
		
		option = this.criarOpcao("Pílulas de conhecimento", "capsules", "3",
				"Clique aqui para ir para a página das pílulas de conhecimento", subOptions);
		
		return option;
	}
	
	
	
	private JSONArray adminMenu() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.optionCurso());
		menuOptions.put(this.optionBiblioteca());
		menuOptions.put(this.optionBancoDeQuestoes());
		menuOptions.put(this.optionUsuarios());
		menuOptions.put(this.optionNoticiasEEventos());
		menuOptions.put(this.optionDashboard());
		menuOptions.put(this.optionMinhaConta());
		
		return menuOptions;
	}
	
	private JSONArray tutorMenu() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.optionTutorVerAvaliacoes());
		menuOptions.put(this.optionTutorVerTurmas());
		menuOptions.put(this.optionMinhaConta());
		
		return menuOptions;
	}
	
	private JSONArray gestorMenu() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.optionCurso());
		menuOptions.put(this.optionBiblioteca());
		menuOptions.put(this.optionBancoDeQuestoes());
		menuOptions.put(this.optionUsuarios());
		menuOptions.put(this.optionNoticiasEEventos());
		menuOptions.put(this.optionDashboard());
		menuOptions.put(this.optionMinhaConta());
		
		return menuOptions;
	}
	
	private JSONArray alunoMenu() {
		JSONArray menuOptions = new JSONArray();
		
		menuOptions.put(this.optionAlunoMeusCursos());
		menuOptions.put(this.optionAlunoMinhasAvaliacoes());
		menuOptions.put(this.optionAlunoBiblioteca());
		menuOptions.put(this.optionAlunoPilulas());
		menuOptions.put(this.optionAlunoNovidades());
		menuOptions.put(this.optionMinhaConta());
		
		return menuOptions;
	}
	
	//---------------------Administrador e gestor---------------------
	private JSONObject optionCurso() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Criar novo curso", "console.log(\"Criar novo curso\");"));
		subOptions.put(this.criarSubOpcao("Gerir cursos", "console.log(\"Gerir cursos\");"));
		subOptions.put(this.criarSubOpcao("Criar nova pílula", "hideAllContent();showContent('adicionarPilula');"));
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
		subOptions.put(this.criarSubOpcao("Gerir conteúdo", "hideAllContent();showContent('gerirBiblioteca');loadBooksToShow();"));
		
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
	
	//--------------Tutor------------------------
	
	private JSONObject optionTutorVerTurmas() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Em breve", "console.log(\"Em breve\");"));
		
		option = this.criarOpcao("Turmas", "user-graduate", "14", "Clique aqui para visualizar todas as suas turmas!",
				subOptions);
		
		return option;
	}
	
	private JSONObject optionTutorVerAvaliacoes() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("A responder", "console.log(\"A responder\");"));
		subOptions.put(this.criarSubOpcao("Respondidas", "console.log(\"Respondidas\");"));
		
		option = this.criarOpcao("Avaliações", "book", "15", "Clique aqui para visualizar todas as avaliações!",
				subOptions);
		
		return option;
	}
	
	//-------------------Aluno-------------------
	private JSONObject optionAlunoBiblioteca() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Ver acervo", "console.log('Em breve');"));
		
		option = this.criarOpcao("Biblioteca", "book", "9", "Clique aqui para acessar o nosso acervo!", subOptions);
		
		return option;
	}
	
	private JSONObject optionAlunoMeusCursos() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Visualizar Meus Cursos", "console.log('Em breve');"));
		
		option = this.criarOpcao("Meus Cursos", "chalkboard-teacher", "10", "Clique aqui para visualizar seus cursos!", subOptions);
		
		return option;
	}
	
	private JSONObject optionAlunoMinhasAvaliacoes() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Minhas notas", "console.log('Em breve');"));
		
		option = this.criarOpcao("Avaliações", "book", "11", "Clique aqui para acessar o nosso acervo!", subOptions);
		
		return option;
	}
	
	private JSONObject optionAlunoPilulas() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Ver pílulas", "console.log('Em breve');"));
		
		option = this.criarOpcao("Pílulas de conhecimento", "capsules", "12", "Clique aqui para visualizar pílulas de conhecimento!", subOptions);
		
		return option;
	}
	
	private JSONObject optionAlunoNovidades() {
		JSONObject option;
		JSONArray subOptions = new JSONArray();
		
		subOptions.put(this.criarSubOpcao("Visualizar notícias e eventos", "console.log('Em breve');"));
		
		option = this.criarOpcao("Novidades", "newspaper", "13", "Clique aqui para visualizar novidades da plataforma!", subOptions);
		
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
