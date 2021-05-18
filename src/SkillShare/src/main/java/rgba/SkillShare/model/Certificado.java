package rgba.SkillShare.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="certificado")
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Certificado {
	
    @Id
    private int id;
    
    @Column
    private String mensagem;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_arquivo", referencedColumnName = "id")
    private Arquivo imagemDeFundo;
    
}
