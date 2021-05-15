class LogRegister{
    constructor(){

    }

    async createNewLog(acao){
        let logData = {
            acao: acao
        }

        let response = await serverRequester.fazerGetWithData("/logs/newLog", logData);

        return response["responseJson"];
        
    }

}