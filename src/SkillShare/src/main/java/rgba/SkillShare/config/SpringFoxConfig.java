package rgba.SkillShare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SpringFoxConfig {

    @Autowired

    @Bean
    public Docket swagger(){
        return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .select()
        .apis(RequestHandlerSelectors.basePackage("rgba.SkillShare.control"))
        .paths(PathSelectors.any())
        .build()
        .apiInfo(apiInfo());
    }

    private Contact contact(){
        return new Contact("Grupo RGBA",
            "https://github.com/giovannialves01/API-RGBA",
            null
        );
    }
    
    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
            .title("SkillShare API")
            .description("API criada para o projeto integrador do grupo RGBA do 3º Semestre de ADS da FATEC São José dos Campos - Prof. Jessen Vidal")
            .version("1.0")
            .contact(contact())
            .build();
    }

   
}
