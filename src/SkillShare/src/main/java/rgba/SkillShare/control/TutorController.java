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

import rgba.SkillShare.model.Tutor;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AlunoRepository;

//
@Controller
@RequestMapping("/tutor")
public class TutorController {
	 @Autowired 
	    AlunoRepository aRepository;

	    @PostMapping("/cadastrar")
	    public String createGestor(Tutor tutor, Contato contato){
	        gestor.getContatos().add(contato);
	        aRepository.save(tutor);
	        return "pagina-de-retorno";
	    }

	    @GetMapping("/listar")
	    public ModelAndView getGestor(){

	        List<Tutor> tutor = aRepository.findAll();

	        ModelAndView mv = new ModelAndView("pagina-de-retorno");

	        mv.addObject("tutor", tutor);

	        return mv;
	    }
}
