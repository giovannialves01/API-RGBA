package rgba.SkillShare.control;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AdmRepository;

@Controller
@RequestMapping("/adm")
public class AdmController {

    @Autowired 
    AdmRepository admRepository;


    @PostMapping("/cadastrar")
    public String createAdm(Adm adm, Contato contato){
        adm.getContatos().add(contato);
        admRepository.save(adm);
        return "pagina-de-retorno";
    }

    @GetMapping("/listar")
    public ModelAndView getAdm(){

        List<Adm> admList;
        admList = admRepository.findAll();

        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("adm", admList);

        return mv;
    }

}
