class Log{
    constructor(logData = {}) {
        if(logData == {}){
            this.autor;
            this.nivelDeAcesso;
            this.acao;
            this.data;
            this.id;

        }else{
            this.autor = logData["autor"];
            this.nivelDeAcesso = logData["nivelDeAcesso"];
            this.acao = logData["acao"];
            this.data = logData["data"];
            this.id = logData["id"];

        }



    }

    getAutor(){
        return this.autor;
    }

    getNivelDeAcesso(){
        return this.nivelDeAcesso;
    }

    getAcao(){
        return this.acao;
    }

    getData(){
        return this.data;
    }

    getID(){
        return this.id;
    }



    setAutor(autor){
        this.autor = autor;
    }

    setNivelDeAcesso(nivelDeAcesso){
        this.nivelDeAcesso = nivelDeAcesso;
    }

    setAcao(acao){
        this.acao = acao;
    }

    setData(data){
        this.data = data;
    }

    setID(id){
        this.id = id;
    }

}