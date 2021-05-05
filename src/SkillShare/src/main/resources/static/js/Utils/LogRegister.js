class LogRegister{
    constructor(){

    }

    async createNewLog(autor, nivelDeAcessoAutor, acao){
        let logData = {
            autor: autor, 
            nivelDeAcesso: nivelDeAcessoAutor, 
            acao: acao
        }

        let log = new Log(logData);

        let response = await serverRequester.fazerPost("/logs/newLog", log.toData());

        return response["responseJson"];
        
    }

}