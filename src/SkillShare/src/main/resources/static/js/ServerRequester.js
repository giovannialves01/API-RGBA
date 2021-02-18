/**
 * Classe responsável por administrar e facilitar todas as requisições RESTs feitas ao servidor
 * 
 * @author Rafael Furtado
 */
class ServerRequester{
    constructor(){
        // URL do servidor
        this.serverURL = "http://localhost:8080";

    }
    


    /**
     * Faz uma requisição GET ao servidor, para o serviço REST específicado
     * 
     * @author Rafael Furtado
     * @param {String} caminhoRest - Rota de acesso ao serviço REST, por exemplo /rest/texto
     * @param {Object} parametros - JSON com parâmetros para a requisição, no formato chave:valor
     * @returns JSON Object - Retorna um objeto JSON contendo a resposta do servidor para o serviço solicitado
     */
    async fazerGet(caminhoRest, parametros){
        let url = this.serverURL + caminhoRest;
        
        // Verifica se foram passados parâmetros para a requisição
        if(parametros != undefined){
            // Cria um array com as chaves do JSON parametros
            let chavesParametros = Object.keys(parametros);

            // Adiciona "?" após a URL, para iniciar a inserção dos parâmetros da requisição
            url += "?";

            // Itera pelos parâmetros e os adiciona à URL
            for (let i = 0; i < chavesParametros.length; i++) {
                const chave = chavesParametros[i];
                
                url += chave + "=" + parametros[chave] + "&";

            }

            // Retira o último "&" da url de requisição
            url = url.slice(0, url.length - 1);

        }

        // Faz a requisição para a URL construída e obtêm sua resposta como JSON
        let requisicao = await fetch(url);
        let resposta = await requisicao.json();

        return resposta;
    }

}

var serverRequester = new ServerRequester();