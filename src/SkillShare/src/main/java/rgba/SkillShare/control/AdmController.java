package rgba.SkillShare.control;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


import rgba.SkillShare.model.Adm;
import rgba.SkillShare.model.Contato;
import rgba.SkillShare.repository.AdmRepository;

/**
 *  Classe que define os endpoints para adm
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/adm")
public class AdmController {

    @Autowired 
    AdmRepository admRepository;

    /** 
    *  Endpoint para cadastro de administrador
    * @param adm,contato
    * @return Retorna para a página definida
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Adm createAdm(@RequestBody Adm adm, @RequestBody Contato contato){
        adm.getContatos().add(contato);
        return admRepository.save(adm);
    }
    /** 
    *  Endpoint para listar todos os administradores
    * @return Retorna um ModelAndView com a lista de administradores
    * @author Nicholas Roque
    */
    @GetMapping("/listarTodos")
    public List<Adm> getAllAdm(){
        return admRepository.findAll();
    }

}
