class Biblioteca{
    constructor(bookData = {}) {
        if(bookData == {}){
            this.nome;
            this.autor;
            this.arquivo;
            this.id;
            
        }else{
            this.nome = bookData["nome"];
            this.autor = bookData["autor"];
            this.arquivo = bookData["arquivo"];
            this.id = bookData["id"];

        }

    }

    setNome(nome){
        this.nome = nome;
    }
    setAutor(autor){
        this.autor = autor;
    }
    setArquivo(arquivo){
        this.arquivo = arquivo;
    }

    getNome(){
        return this.nome;
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
            nome: this.nome,
            autor: this.autor,
            arquivo: this.arquivo,
            id: this.id
        };

        return data;
    }

}