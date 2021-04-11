class Biblioteca{
    constructor(bookData = {}) {
        if(bookData == {}){
            this.nome;
            this.autor;
            this.curso;
            this.arquivo;
            
        }else{
            this.nome = bookData["nome"];
            this.autor = bookData["autor"];
            this.curso = bookData["curso"];
            this.arquivo = bookData["arquivo"];

        }

    }

    setNome(nome){
        this.nome = nome;
    }
    setAutor(autor){
        this.autor = autor;
    }
    setCurso(curso){
        this.curso = curso;
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
    getCurso(){
        return this.curso;
    }
    getArquivo(){
        return this.arquivo;
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
            curso: this.curso,
            arquivo: this.arquivo,
        };

        return data;
    }

}