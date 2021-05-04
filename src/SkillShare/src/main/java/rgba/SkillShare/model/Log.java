package rgba.SkillShare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

@Getter @Setter @ToString
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
