package rgba.SkillShare.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import rgba.SkillShare.model.Gestor;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AlunoRepository;


@Controller
@RequestMapping("/gestor")
public class GestorController {
    @Autowired 
    AlunoRepository aRepository;

    @PostMapping("/cadastrar")
    public String createGestor(Gestor gestor, Contato contato){
        gestor.getContatos().add(contato);
        aRepository.save(gestor);
        return "pagina-de-retorno";
    }

    @GetMapping("/listar")
    public ModelAndView getGestor(){

        List<Gestor> gestor = aRepository.findAll();

        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("gestor", gestor);

        return mv;
    }

}
