package rgba.SkillShare.control;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import rgba.SkillShare.model.Aluno;
import rgba.SkillShare.model.Contato;

import rgba.SkillShare.repository.AlunoRepository;

@Controller
@RequestMapping("/Aluno")
public class AlunoController {

    @Autowired 
    AlunoRepository aRepository;

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public String createAluno(Aluno aluno, Contato contato){
        aluno.getContatos().add(contato);
        aRepository.save(aluno);
        return "pagina-de-retorno";
    }

    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public ModelAndView getAluno(){
        List<Aluno> Alunos;

        Alunos = aRepository.findAll();
        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("Alunos", Alunos);

        return mv;
    }

    @GetMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public ModelAndView deleteAlunoById(String id){
        aRepository.deleteById(id);
        ModelAndView mv = new ModelAndView("pagina-de-retorno");
        mv.addObject("Alunos", aRepository.findAll());
        return mv;
    } 

}
