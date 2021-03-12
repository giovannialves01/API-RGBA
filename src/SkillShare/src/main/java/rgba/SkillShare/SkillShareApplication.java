package rgba.SkillShare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AlunoRepository;

@SpringBootApplication
public class SkillShareApplication implements CommandLineRunner {


	@Autowired
	private AlunoRepository aRepository;

	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		Aluno aluno = new Aluno("50553650807","Nicholas");
		Contato contato = new Contato("12997424087","nicholas.sroque@gmail.com");
		aluno.getContatos().add(contato);
        aRepository.save(aluno);
		System.out.println(aRepository.findAll());
        //aRepository.save(new Aluno("505.536.507-07","Nicholas",new Contato("12997424087","nicholas.sroque@gmail.com")));
		
	}

}