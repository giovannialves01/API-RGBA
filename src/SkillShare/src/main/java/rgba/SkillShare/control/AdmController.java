package rgba.SkillShare.control;

import rgba.SkillShare.model.Adm;

import rgba.SkillShare.repository.AdmRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

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
    * @param adm
    * @return Retorna para a página definida
    * @author Nicholas Roque
    */
    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Adm createAdm(@RequestBody Adm adm){
        System.out.println(adm.toString());
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

    @GetMapping("{cpf}")
    public ResponseEntity<Optional<Adm>> getAdmByCpf(@PathVariable String cpf) {
        Optional<Adm> adm = admRepository.findById(cpf);
            return adm.map(a -> {
                return new ResponseEntity<Optional<Adm>>(adm, HttpStatus.OK);
            }).orElseThrow(() -> {
                return new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado");
            });
    }
}
