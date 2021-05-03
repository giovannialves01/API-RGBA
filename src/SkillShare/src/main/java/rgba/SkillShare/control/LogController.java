package rgba.SkillShare.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rgba.SkillShare.model.Log;
import rgba.SkillShare.repository.LogRepository;


/**
 * Classe de controle e mapeamento de rotas para a entidade Log
 * 
 * @author Rafael Furtado
 */
@RestController
@CrossOrigin
@RequestMapping("/logs")
public class LogController {
    @Autowired 
    LogRepository logRepository;
    
    /**
     * Retorna um JSONArray ao cliente com todos os logs do sistema
     * 
     * @return JSONArray com todos os logs do sistema
     */
    @GetMapping
    public List<Log> getAllLogs(){
        return logRepository.findAll();
    }
    
    /**
     * Registra um novo log no sistema
     * 
     * @param log - Log do ocorrido
     * @return Retorna true ou false em razão da operação ser sido bem suceedida ou não
     */
    @GetMapping(value = "/newLog")
    public boolean createNewLog(Log log) {
    	boolean sucesso = false;
    	
    	try {
        	logRepository.save(log);
        	
        	sucesso = true;
    	}catch(Exception e) {
    		e.printStackTrace();
    		
    	}

    	return sucesso;
    }
    
}
