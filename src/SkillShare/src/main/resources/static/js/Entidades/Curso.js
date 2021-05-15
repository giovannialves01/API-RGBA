class Curso {
    constructor(cursoData = {}) {
        if(cursoData == {}){
            this.id;
            this.titulo;
            this.descricao;
            this.pilulas;
            this.questoes;
            this.gestor;
            this.tutor;
            this.thumb;
            

        }else{
            this.id = cursoData["id"];
            this.titulo = cursoData["titulo"];
            this.descricao = cursoData["descricao"];
            this.pilulas = cursoData["pilulas"];
            this.questoes = cursoData["questoes"];
            this.gestor = cursoData["gestor"];
            this.tutor = cursoData["tutor"];
            this.thumb = cursoData["thumb"];

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
        return this.questoes;
    }

    getGestor(){
        return this.gestor;
    }

    getTutor(){
        return this.tutor;
    }

    getThumb(){
        return this.thumb;
    }

    getDeleteMessage(){
        return this.titulo;
    }


    setId (id){
        this.id = id;
    }

    setThumb (thumb){
        this.thumb = thumb;
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
    
    setTutor(tutor){
        this.tutor = tutor;
    }

    toData(){
        let data = {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            pilulas: this.pilulas,
            questoes: this.questoes,
            gestor: this.gestor,
            tutor: this.tutor
        }

        return data;
    }

}