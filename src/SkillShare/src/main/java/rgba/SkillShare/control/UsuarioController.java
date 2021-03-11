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

import rgba.SkillShare.model.Usuario;
import rgba.SkillShare.repository.UsuarioRepository;

@Controller
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired 
    UsuarioRepository uRepository;

    /* @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public String createUsuario(Usuario usuario){
        uRepository.save(usuario);
        return "pagina-de-retorno";
    }

    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public ModelAndView getUsuario(){
        List<Usuario> usuarios;

        usuarios = uRepository.findAll();
        ModelAndView mv = new ModelAndView("pagina-de-retorno");

        mv.addObject("usuarios", usuarios);

        return mv;
    }

    @GetMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public ModelAndView deleteUsuarioById(String id){
        uRepository.deleteById(id);
        ModelAndView mv = new ModelAndView("pagina-de-retorno");
        mv.addObject("usuarios", uRepository.findAll());
        return mv;
    } */

}
