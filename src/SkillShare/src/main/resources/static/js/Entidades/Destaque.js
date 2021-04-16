class Destaque{
    constructor(destaqueData = {}) {
        if(destaqueData == {}){
            this.conteudo;
            this.data;
            this.fonte;
            this.id;
            this.sinopse;
            this.arquivo = {arquivo: {conteudo: "", nomeArquivo: "", tipoArquivo: "", id: -1}};
            this.titulo;
            
        }else{
            this.conteudo = destaqueData["conteudo"];
            this.data = destaqueData["data"];
            this.fonte = destaqueData["fonte"];
            this.id = destaqueData["id"];
            this.sinopse = destaqueData["sinopse"];  
            this.arquivo = {
                arquivo:{
                    conteudo: destaqueData["thumb"]["arquivo"]["conteudo"],
                    nomeArquivo: destaqueData["thumb"]["arquivo"]["nomeArquivo"],
                    tipoArquivo: destaqueData["thumb"]["arquivo"]["tipoArquivo"],
                    id: destaqueData["thumb"]["arquivo"]["id"],
                }
            };
            this.titulo = destaqueData["titulo"];
        }

    }

    setConteudo(conteudo){
        this.conteudo = conteudo;
    }
    setData(data){
        this.data = data;
    }
    setFonte(fonte){
        this.fonte = fonte;
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
    getFonte(){
        return this.fonte;
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
            fonte: this.getFonte(),
            id: this.getId(),
            sinopse: this.getSinopse(),
            arquivo: this.getArquivo(),
            titulo: this.getTitulo()
        };

        return data;
    }

}