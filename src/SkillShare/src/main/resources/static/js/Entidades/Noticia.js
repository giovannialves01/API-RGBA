class Noticia{
    constructor(noticiaData = {}) {
        if(noticiaData == {}){
            this.titulo;
            this.fonte;
            this.thumb = {conteudo: "", nomeArquivo: "", tipoArquivo: ""};
            this.id;
            this.sinopse;
            this.corpo;
            
        }else{
            this.titulo = noticiaData["titulo"];
            this.fonte = noticiaData["autor"];
            this.id = noticiaData["id"];
            this.sinopse = noticiaData["sinopse"];
            this.conteudo = noticiaData["conteudo"];  

            this.arquivo = {};

            this.arquivo["conteudo"] = noticiaData["conteudo"];
            this.arquivo["nomeArquivo"] = noticiaData["nomeArquivo"];
            this.arquivo["tipoArquivo"] = noticiaData["tipoArquivo"];
        }

    }

    setTitulo(titulo){
        this.titulo = titulo;
    }
    setFonte(fonte){
        this.fonte = fonte;
    }
    setSinopse(sinopse){
        this.sinopse = sinopse;
    }
    setId(id){
        this.id = id;
    }
    setConteudo(conteudo){
        this.conteudo = conteudo;
    }
    setThum(thumb){
        this.thumb = thumb;
    }

    getTitulo(){
        return this.titulo;
    }
    getAutor(){
        return this.autor;
    }
    getArquivo(){
        return this.arquivo;
    }
    getId(){
        return this.id;
    }


    /**
     * Retorna o objeto com suas informações no formato JSON
     * 
     * @author Rafael Furtado
     * @returns JSON
     */
    toData(){
        let data = {
            nome: this.titulo,
            autor: this.autor,
            arquivo: this.arquivo,
            id: this.id
        };

        return data;
    }

}
