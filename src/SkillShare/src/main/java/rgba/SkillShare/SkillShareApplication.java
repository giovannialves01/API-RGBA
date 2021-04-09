package rgba.SkillShare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Curso;
import rgba.SkillShare.repository.AdmRepository;
import rgba.SkillShare.repository.AlunoRepository;
import rgba.SkillShare.repository.CursoRepository;
import rgba.SkillShare.model.Gestor;
import rgba.SkillShare.repository.GestorRepository;


@SpringBootApplication
public class SkillShareApplication implements CommandLineRunner {
    
	@Autowired 
    AdmRepository admRepository;
	@Autowired
	AlunoRepository alunoRepository;
    @Autowired 
    GestorRepository gRepository;

	@Autowired 
    CursoRepository cursoRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(SkillShareApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//coloque algum codigo que precisa ser executado quando o servidor subir aqui
		if(admRepository.findAll().isEmpty()) {
			Adm adm = new Adm("0000000000", "Bárbara Port", "barbara.port@skillshare.com", "barbara1234");
			admRepository.save(adm);
		};

		if(gRepository.findAll().isEmpty()) {
			Gestor gestor = new Gestor("11111111111", "Henrique dos Santos", "henrique.santos@skillshare.com", "henrique123");
			gRepository.save(gestor);

			Gestor nicholasGestor = new Gestor("012345678910", "Nicholas Gabriel dos Santos Roque", "nicholas.roque@skillshare.com", "nicholas1234");
			gRepository.save(nicholasGestor);

			Curso curso = new Curso("Curso de Informática Básica","Neste curso, serão apresentados os fundamentos da informática, além de como utilizar o pacote Office e como o computador funciona.");
			curso.setGestor(nicholasGestor);

			cursoRepository.save(curso);
		};
		
		// Um aluno de teste, para popular a tabela que lista os alunos, apenas para não iniciar vazia
		Aluno rafael = new Aluno("98765432100", "Rafael Furtado Rodrigues dos Santos", "rafael.furtado@rgba.com.br", "rafael123");
		alunoRepository.save(rafael);

		
	}
}