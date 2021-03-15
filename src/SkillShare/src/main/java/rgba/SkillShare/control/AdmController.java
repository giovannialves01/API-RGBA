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

/**
 *  Classe que define os endpoints para adm
 *  @author Nicholas Roque
 */
@Controller
@RequestMapping("/adm")
public class AdmController {

    @Autowired 
    AdmRepository admRepository;

    /** 
    *  Endpoint para cadastro de administrador
    * @param adm,contato
    * @return String pagina-de-retorno
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    public String createAdm(Adm adm, Contato contato){
        adm.getContatos().add(contato);
        admRepository.save(adm);
        return "pagina-de-retorno";
    }
    /** 
    *  Endpoint para listar todos os administradores
    * @return Retorna um ModelAndView com a lista de administradores
    * @author Nicholas Roque
    */
    @GetMapping("/listar")
    public ModelAndView getAdm(){

        List<Adm> admList = admRepository.findAll();
        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("adm", admList);

        return mv;
    }

}
