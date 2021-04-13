class Biblioteca{
    constructor(bookData = {}) {
        if(bookData == {}){
            this.titulo;
            this.autor;
            this.arquivo = {conteudo: "", nomeArquivo: "", tipoArquivo: ""};
            this.id;
            
        }else{
            this.titulo = bookData["titulo"];
            this.autor = bookData["autor"];
            this.id = bookData["id"];

            this.arquivo = {};

            this.arquivo["conteudo"] = bookData["conteudo"];
            this.arquivo["nomeArquivo"] = bookData["nomeArquivo"];
            this.arquivo["tipoArquivo"] = bookData["tipoArquivo"];
        }

    }

    setTitulo(nome){
        this.titulo = nome;
    }
    setAutor(autor){
        this.autor = autor;
    }
    setArquivo(arquivo){
        this.arquivo = arquivo;
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