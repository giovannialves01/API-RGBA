package rgba.SkillShare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Biblioteca;
import rgba.SkillShare.repository.AdmRepository;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.BibliotecaRepository;
import rgba.SkillShare.model.Gestor;
import rgba.SkillShare.model.Tutor;
import rgba.SkillShare.repository.GestorRepository;
import rgba.SkillShare.repository.TutorRepository;


@SpringBootApplication
public class SkillShareApplication implements CommandLineRunner {
    
	@Autowired 
    AdmRepository admRepository;
	@Autowired
	AlunoRepository alunoRepository;
    @Autowired 
    GestorRepository gRepository;
    @Autowired 
    TutorRepository tRepository;
	@Autowired
	BibliotecaRepository bibliotecaRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//coloque algum codigo que precisa ser executado quando o servidor subir aqui
		if(admRepository.findAll().isEmpty()) {
			Adm adm = new Adm("1", "Bárbara Port", "barbara.port@skillshare.com", "1");
			admRepository.save(adm);
			
			Adm adm2 = new Adm("2", "Bárbat", "bara.port@skillshare.com", "2");
			admRepository.save(adm2);
		}

		if(gRepository.findAll().isEmpty()) {
			Gestor gestor = new Gestor("11111111111", "Henrique dos Santos", "henrique.santos@skillshare.com", "henrique123");
			gRepository.save(gestor);
		}

		if(tRepository.findAll().isEmpty()) {
			Tutor tutor = new Tutor("22222222222", "Nícolas Rafael Pereira", "nicholas.pereira@skillshare.com", "nicolas123");
			tRepository.save(tutor);
		}
		
		if(alunoRepository.findAll().isEmpty()) {
			// Um aluno de teste, para popular a tabela que lista os alunos, apenas para não iniciar vazia
			Aluno rafael = new Aluno("98765432100", "Rafael Furtado Rodrigues dos Santos", "rafael.furtado@rgba.com.br", "rafael123");
			alunoRepository.save(rafael);
		}
		
		Biblioteca biblioteca = new Biblioteca("Nome do livro 1", "Nome do autor 1", "Curso 1", "arquivo.pdf");
		bibliotecaRepository.save(biblioteca);
		
		Biblioteca biblioteca2 = new Biblioteca("Nome do livro 2", "Nome do autor 2", "Sem curso definido", "arquivo2.pdf");
		bibliotecaRepository.save(biblioteca2);
		
	}
	
}
