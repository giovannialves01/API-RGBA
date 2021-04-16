class Evento{
    constructor(eventoData = {}) {
        if(eventoData == {}){
            this.conteudo;
            this.data;
            this.id;
            this.sinopse;
            this.arquivo = {arquivo: {conteudo: "", nomeArquivo: "", tipoArquivo: "", id: -1}};
            this.titulo;
            
        }else{
            this.conteudo = eventoData["conteudo"];
            this.data = eventoData["data"];
            this.id = eventoData["id"];
            this.sinopse = eventoData["sinopse"];  
            this.arquivo = {
                arquivo:{
                    conteudo: eventoData["thumb"]["arquivo"]["conteudo"],
                    nomeArquivo: eventoData["thumb"]["arquivo"]["nomeArquivo"],
                    tipoArquivo: eventoData["thumb"]["arquivo"]["tipoArquivo"],
                    id: eventoData["thumb"]["arquivo"]["id"],
                }
            };
            this.titulo = eventoData["titulo"];
        }

    }

    setConteudo(conteudo){
        this.conteudo = conteudo;
    }
    setData(data){
        this.data = data;
    }

    setId(id){
        this.id = id;
    }
    setSinopse(sinopse){
        this.sinopse = sinopse;
    }
    setArquivo(arquivo){
        this.arquivo = arquivo;
    }

    setTitulo(titulo){
        this.titulo = titulo;
    }
    
    getConteudo(){
        return this.conteudo;
    }
    getData(){
        return this.data;
    }

    getId(){
        return this.id;
    }
    getSinopse(){
        return this.sinopse;
    }
    getArquivo(){
        return this.arquivo;
    }

    getTitulo(){
        return this.titulo;
    }


    /**
     * Retorna o objeto com suas informações no formato JSON
     * 
     * @author Rafael Furtado
     * @returns JSON
     */
    toData(){
        let data = {
            conteudo: this.getConteudo(),
            data: this.getData(),
            id: this.getId(),
            sinopse: this.getSinopse(),
            arquivo: this.getArquivo(),
            titulo: this.getTitulo()
        };

        return data;
    }

}