class LogRegister{
    constructor(){

    }

    async createNewLog(acao){
        let logData = {
            acao: acao
        }

        let log = new Log(logData);

        let response = await serverRequester.fazerPost("/logs/newLog", log.toData());

        return response["responseJson"];
        
    }

}