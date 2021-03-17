package rgba.SkillShare;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AdmRepository;
import rgba.SkillShare.repository.AlunoRepository;

@SpringBootApplication
public class SkillShareApplication implements CommandLineRunner {


	@Autowired 
    AlunoRepository aRepository;

	@Autowired 
    AdmRepository admRepository;


	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//------------------------------Cadastro teste de aluno--------------------------------------
		/* Aluno aluno = new Aluno("12345678910","NicholasAluno","nicholasAluno@gmail.com","senha123");
		Contato contato = new Contato("12997424087");
		aluno.getContato().add(contato);
        aRepository.save(aluno);

		List<Aluno> alunos = aRepository.findAll();
		System.out.println(alunos.toString()); */
		//------------------------------Cadastro teste de adm--------------------------------------
        /*Adm adm = new Adm("53553650810","NicholasAdm","nicholasAdm@gmail.com","senha123");
		Contato contatoAdm = new Contato("12997424087");
		adm.getContatos().add(contatoAdm);
        admRepository.save(adm);

		List<Adm> admList = admRepository.findAll();
		System.out.println(admList.toString()); */
	}

}