package rgba.SkillShare;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.repository.AlunoRepository;

@SpringBootApplication
public class SkillShareApplication implements CommandLineRunner {
    @Autowired 
    AlunoRepository rp;
    
	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//coloque algum codigo que precisa ser executado quando o servidor subir aqui
		Aluno aluno1 = new Aluno("123456789", "Rafael", "abc@abc.com", "123");
		Aluno aluno2 = new Aluno("987654321", "Carlos", "abqwe@abc.com", "123");
		
		rp.save(aluno1);
		rp.save(aluno2);
		
		List<Aluno> lista = rp.findAll();
		
		JSONObject main = new JSONObject();
		JSONObject columns = new JSONObject();
		JSONArray rows = new JSONArray();
		String extraConfigs[];
		
		columns.put("cpf", "Meu cpf");
		columns.put("nome", "Meu nome");
		
		rows.put(lista);
		
		main.put("columns", columns);
		main.put("rows", rows);
		
		System.out.println("JSON bonito: " + main.toString());
	}
}