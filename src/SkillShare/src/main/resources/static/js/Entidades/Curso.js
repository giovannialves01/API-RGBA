class Curso {
    constructor(cursoData = {}) {
        if(cursoData == {}){
            this.id;
            this.titulo;
            this.descricao;
            this.pilulas;
            this.questoes;
            this.gestor;
            

        }else{
            this.id = cursoData["id"];
            this.titulo = cursoData["titulo"];
            this.descricao = cursoData["descricao"];
            this.pilulas = cursoData["pilulas"];
            this.questoes = cursoData["questoes"];
            this.gestor = cursoData["gestor"];

        }

      



    }

    getId(){
        return this.id;
    }

    getTitulo(){
        return this.titulo;
    }

    getDescricao(){
        return this.descricao;
    }

    getPilulas(){
        return this.pilulas;
    }

    getQuestoes(){
        return this.questoes
    }

    getGestor(){
        return this.gestor
    }


    setId (id){
        this.id = id;
    }

    setTitulo (titulo) {
        this.titulo = titulo;
    }

    setDescricao (descricao) {
        this.descricao = descricao;
    }

    setPilulas (pilulas) {
        this.pilulas = pilulas;
    }

    setQuestoes (questoes) {
        this.questoes = questoes;
    }

    setGestor (gestor) {
        this.gestor = gestor;
    }

    toData(){
        let data = {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            pilulas: this.pilulas,
            questoes: this.questoes,
            gestor: this.gestor
        }

        return data;
    }
}