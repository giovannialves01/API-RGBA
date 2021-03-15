package rgba.SkillShare;

import java.util.List;
import java.util.Optional;

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
    AlunoRepository aRepository;


	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		Aluno aluno = new Aluno("50553650807","Nicholas","nicholas.sroque@gmail.com");
		Contato contato = new Contato("12997424087");
		aluno.getContatos().add(contato);
        aRepository.save(aluno);

		List<Aluno> alunos;
        alunos = aRepository.findAll();

		System.out.println(alunos.toString());
        
	}

}