package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "log")
public class Log {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @Column
    String autor;
    
    @Column
    String nivelDeAcesso;
    
    @Column(columnDefinition = "text")
    String acao;
    
    @Column(columnDefinition = "date")
    String data;

}
