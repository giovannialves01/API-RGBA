/**
 * Classe responsável por administrar e facilitar todas as requisições RESTs feitas ao servidor
 * 
 * @author Rafael Furtado
 */
class ServerRequester{
    constructor(){
        // URL do servidor
        this.serverURL = window.location.protocol + "//" + window.location.host;

    }
    


    /**
     * Faz uma requisição GET ao servidor, para o serviço REST específicado
     * 
     * @author Rafael Furtado
     * @param {String} caminhoRest - Rota de acesso ao serviço REST, por exemplo /rest/texto
     * @param {Object} parametros - JSON com parâmetros para a requisição, no formato chave:valor
     * @returns JSON - Retorna um objeto JSON contendo a resposta do servidor para o serviço solicitado
     */
    async fazerGet(caminhoRest, parametros){
        let url = this.serverURL + caminhoRest;
        let configsGet = {
                            method: "GET",
                          };

        if(parametros != undefined){
            url += "/" + parametros;
        }
        
        // Faz a requisição para a URL construída e obtêm sua resposta como JSON
        return await this.fazerRequisicao(url, configsGet);
    }

    async fazerGetWithData(caminhoRest, parametros = {}){
        let url = this.serverURL + caminhoRest;
        let configsGet = {
                            method: "GET",
                          }
        
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
        return await this.fazerRequisicao(url, configsGet);
    }

    async fazerPut(caminhoRest){
        let url = this.serverURL + caminhoRest;
        let configsPut = {
            method: "PUT"
        };

        return await this.fazerRequisicao(url, configsPut);
    }


    /**
     * Faz uma requisição POST para o servidor, para o serviço REST específicado e com os dados fornecidos
     * 
     * @author Rafael Furtado
     * @param {String} caminhoRest - Rota de acesso ao serviço REST, por exemplo /rest/texto
     * @param {Object} data - JSON com parâmetros para a requisição, no formato chave:valor
     * @returns JSON - Retorna um objeto JSON contendo a resposta do servidor para o serviço solicitado
     */
    async fazerPost(caminhoRest, data = {}, contentType = "application/json"){
        let url = this.serverURL + caminhoRest;
        let configsPost = {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": contentType   
                                }
                        };

        // Faz a requisição para a URL construída e obtêm sua resposta como JSON
        return await this.fazerRequisicao(url, configsPost);
    }


    /**
     * MÉTODO PRIVADO
     * 
     * Utilizado pela classe ServerRequester para reaproveitar a parte igual que as
     * requisições tem, independente do método
     * 
     * @author Rafael Furtado
     * @param {String} url - URL para fazer a solicitação
     * @param {Object} configs - Configurações para o método de solicitação
     * @returns JSON - Retorna um objeto JSON contendo a resposta do servidor para o serviço solicitado 
     */
    async fazerRequisicao(url, configs){
        let requisicao = await fetch(url, configs);
        let resposta = {};
        try{
            let responseJson = await requisicao.json();

            resposta["ok"] = requisicao.ok;
            resposta["status"] = requisicao.status;
            resposta["responseJson"] = responseJson;
        }catch(e){
            console.log("Requisição sem retorno");
        }

        return resposta;
    }

}

var serverRequester = new ServerRequester();
