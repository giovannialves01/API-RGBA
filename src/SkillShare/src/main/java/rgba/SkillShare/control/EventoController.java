
package rgba.SkillShare.control;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import rgba.SkillShare.model.Evento;
import rgba.SkillShare.model.Thumb;
import rgba.SkillShare.repository.EventoRepository;

/**
 *  Classe que define os endpoints para evento
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/eventos")
@Api("API de eventos")
public class EventoController {

    @Autowired 
    EventoRepository eventoRepository;


    /** 
    *  Endpoint para cadastro de um evento.
    * @author Nicholas Roque
    * @param evento
    * @throws IOException
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Cria um evento.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Evento criado com sucesso.")
    public Evento createEvento(@RequestParam MultipartFile th, Evento evento) throws IOException {
        Thumb t = new Thumb(th.getOriginalFilename(),th.getBytes(),th.getContentType());
        evento.setThumb(t);
		return eventoRepository.save(evento);
	}

    /** 
    *  Endpoint para retornar todos os eventos.
    * @return Retorna uma lista de objetos do tipo Evento.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna todos os eventos.")
    @ApiResponse(code = 200,message = "Eventos encontrados com sucesso.")
    public List<Evento> getEventos() {
        return eventoRepository.findAll();
    }

    /** 
    *  Endpoint para retornar um evento especificado pelo id.
    * @return Retorna um objeto do tipo Evento.
    * @author Nicholas Roque
    */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna o evento especificado pelo id.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Evento encontrado com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Evento não encontrado para o id informado.")
    })
    public Evento getEventoById(@PathVariable @ApiParam("Id do evento") Long id) {
        return eventoRepository
            .findById(id)
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Evento não encontrado.")         
            );
    }
}