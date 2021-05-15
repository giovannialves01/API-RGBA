package rgba.SkillShare.control;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import rgba.SkillShare.model.Arquivo;
import rgba.SkillShare.model.Biblioteca;
import rgba.SkillShare.repository.BibliotecaRepository;


/**
 *  Classe que define os endpoints para biblioteca
 *  @author Nicholas Roque
 */
@RestController
@CrossOrigin
@RequestMapping("/biblioteca")
@Api("API de biblioteca")
public class BibliotecaController {

    @Autowired 
    BibliotecaRepository bibliotecaRepository;

    /** 
    *  Endpoint para cadastro de material na biblioteca.
    * @author Nicholas Roque
    * @param Biblioteca
    * @throws IOException
    */
    @PostMapping("/cadastrar")
    @ApiOperation("Faz upload de um material para a biblioteca.")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(code = 201,message = "Material postado com sucesso na biblioteca.")
    public Biblioteca createBiblioteca(@RequestParam MultipartFile arq,Biblioteca b) throws IOException {
        Arquivo a = new Arquivo(arq.getOriginalFilename(),arq.getBytes(),arq.getContentType());
        b.setArquivo(a);
		return bibliotecaRepository.save(b);
	}
    /** 
    *  Endpoint para retornar todos os materiais presentes nas bibliotecas.
    * @return Retorna uma lista de objetos do tipo Biblioteca.
    * @author Nicholas Roque
    */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna todos os materiais das bibliotecas.")
    @ApiResponse(code = 200,message = "Materiais encontradas com sucesso nas bibliotecas.")
    public List<Biblioteca> getBiblioteca() {
        return bibliotecaRepository.findAll();
    }

    /** 
    *  Endpoint para retornar todos os materiais presentes nas bibliotecas.
    * @return Retorna uma lista de objetos do tipo Biblioteca.
    * @author Nicholas Roque
    */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation("Retorna o material com o id especificado.")
    @ApiResponses({
        @ApiResponse(code = 200,message = "Material encontrado com sucesso para o id informado."),
        @ApiResponse(code = 404,message = "Material não encontrado para o id informado.")
   })
    public Biblioteca getBibliotecaById(@PathVariable Long id) {
        return bibliotecaRepository.findById(id)
            .orElseThrow(()->
               new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso não encontrado.")
            );
    }

    /** 
    *  Endpoint para deletar uma biblioteca especificada pelo id.
    * @param id-> id da biblioteca a ser deletada
    * @author Nicholas Roque
    */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Deleta a biblioteca especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Biblioteca deletada com sucesso."),
        @ApiResponse(code = 404,message = "Biblioteca não encontrada para o id informado.")
    })
    public void deleteBibliotecaById(@PathVariable @ApiParam("Id da biblioteca") Long id) {
        bibliotecaRepository
            .findById(id)
            .map(b->{
                bibliotecaRepository.delete(b);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Biblioteca não encontrada.")         
            );
    }

    /** 
    *  Endpoint para atualizar uma biblioteca especificada pelo id.
    * @param id-> id da biblioteca a ser atualizada.
    * @param biblioteca-> objeto da biblioteca a ser atualizada.
    * @author Nicholas Roque
    */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Atualiza a biblioteca especificada pelo id.")
    @ApiResponses({
        @ApiResponse(code = 204,message = "Biblioteca atualizada com sucesso."),
        @ApiResponse(code = 404,message = "Biblioteca não encontrada para o id informado.")
    })
    public void updateBibliotecaById(@PathVariable @ApiParam("Id da biblioteca") Long id,@RequestBody @ApiParam("Biblioteca atualizada") Biblioteca biblioteca) {
        bibliotecaRepository
            .findById(id)
            .map(b->{
                biblioteca.setArquivo(b.getArquivo());
                bibliotecaRepository.save(biblioteca);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND,"Biblioteca não encontrado.")         
            );
    }

    
}
