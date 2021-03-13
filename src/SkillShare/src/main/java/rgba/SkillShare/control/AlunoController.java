package rgba.SkillShare.control;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AlunoRepository;

@Controller
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired 
    AlunoRepository aRepository;


    @PostMapping("/cadastrar")
    public String createAluno(Aluno aluno, Contato contato){
        aluno.getContatos().add(contato);
        aRepository.save(aluno);
        return "pagina-de-retorno";
    }

    @GetMapping("/listar")
    public ModelAndView getAluno(){

        List<Aluno> alunos;
        alunos = aRepository.findAll();

        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("alunos", alunos);

        return mv;
    }

}
