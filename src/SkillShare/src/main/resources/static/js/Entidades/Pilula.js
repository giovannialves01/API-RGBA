class Pilula{
    constructor(pilulaData = {}) {
        if(pilulaData == {}){
            this.descricao;
            this.id;
            this.nomeCurso;
            this.titulo;
            this.arquivo = {conteudo: "", nomeArquivo: "", tipoArquivo: "", id: -1};

        }else{
            this.descricao = pilulaData["descricao"];
            this.id = pilulaData["id"];
            this.nomeCurso = pilulaData["nomeCurso"];
            this.titulo = pilulaData["titulo"];
            this.arquivo = pilulaData["arquivo"];


        }

    }

    setDescricao(descricao){
        this.descricao = descricao;
    }
    setId(id){
        this.id = id;
    }
    setNomeCurso(nomeCurso){
        this.nomeCurso = nomeCurso;
    }
    setArquivo(arquivo){
        this.arquivo = arquivo;
    }
    setTitulo(titulo){
        this.titulo = titulo;
    }
    
    getDescricao(){
        return this.descricao;
    }
    getId(){
        return this.id;
    }
    getNomeCurso(){
        return this.nomeCurso;
    }
    getArquivo(){
        return this.arquivo;
    }
    getTitulo(){
        return this.titulo;
    }

    getDeleteMessage(){
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
            descricao: this.getDescricao(),
            id: this.getId(),
            nomeCurso: this.getNomeCurso(),
            arquivo: this.getArquivo(),
            titulo: this.getTitulo()
        };

        return data;
    }

}
