package rgba.SkillShare.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * 
 * Classe que contem o metodo para o envio dos e-mails
 * 
 * @author Barbara Port
 *
 */

@Service
public class EmailService {
	
	
	@Autowired
	JavaMailSender javaMailSender;
	
	/** 
	 * 
	 * Envia um e-mail simples (sem anexo, somente com destino, assunto e texto)
	 * 
	 * @author Barbara Port
	 * 
	 * @param destino -> que é o e-mail que vai receber a mensagem
	 * @param assunto -> assunto do e-mail
	 * @param texto -> corpo do e-mail, ou seja, a mensagem que voce precisa mandar
	 * 
	 * @return void
	 * 
	 */
	
    public void enviarEmail(String destino, String assunto, String texto) {
    	SimpleMailMessage email = new SimpleMailMessage();
    	email.setFrom("aquele-email");
    	email.setTo(destino);
    	email.setSubject(assunto);
    	email.setText(texto);
    	javaMailSender.send(email);
    }
}
