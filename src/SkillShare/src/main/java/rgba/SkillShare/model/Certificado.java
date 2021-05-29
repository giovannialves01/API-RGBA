package rgba.SkillShare.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column
    private String mensagem;
    
    @Column
    private String nomeCurso;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_arquivo", referencedColumnName = "id")
    private Arquivo imagemDeFundo;
    
}
