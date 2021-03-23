package rgba.SkillShare.utils;

import java.util.Properties;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * 
 * Classe que contem o metodo para o envio dos e-mails
 * 
 * @author Barbara Port
 *
 */

public class EmailService {
	
	/**
	 * Implementação da interface do JavaMailSender
	 * 
	 * @author Barbara Port
	 * 
	 * @return JavaMailSenderImpl -> informações da instância do JavaMailSenderImpl
	 * 
	 */
	
	public JavaMailSenderImpl javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        
        // configurando as mesmas coisas do application.properties (não pode apagar o que tem lá)
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("nosso-email");
        mailSender.setPassword("nossa-senha");
        
        Properties props = new Properties();
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", true);
        mailSender.setJavaMailProperties(props);
        
        return mailSender;
	}
	
	/** 
	 * 
	 * Envia um e-mail simples (sem anexo, somente com destino, assunto e texto)
	 * 
	 * @author Barbara Port
	 * 
	 * @param assunto -> assunto do e-mail
	 * @param texto -> corpo do e-mail, ou seja, a mensagem que voce precisa mandar
	 * @param destino -> que é o e-mail que vai receber a mensagem
	 * 
	 * @return void
	 * 
	 */
	
	public void enviarEmailSimples(String assunto, String texto, String destino) {
        JavaMailSenderImpl javaMailSender = JavaMailSender();
        SimpleMailMessage email = new SimpleMailMessage();
        
        email.setSubject(assunto);
        email.setText(texto);
        email.setTo(destino);
        email.setFrom("nosso-email");
        javaMailSender.send(email);
    }
}
