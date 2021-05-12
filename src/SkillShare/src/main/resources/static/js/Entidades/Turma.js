class Turma {
    constructor(turmaData = {}) {
        if(turmaData == {}){
            this.id;
            this.dataInicio;
            this.dataTermino;
            this.tutor;
            this.curso;
            this.alunos;            

        }else{
            this.id = turmaData.id;
            this.dataInicio = turmaData.dataInicio;
            this.dataTermino = turmaData.dataTermino;
            this.tutor = turmaData.tutor;
            this.curso = turmaData.curso;
            this.alunos = turmaData.alunos;     

        }

    }
    getId(){
        return this.id ;
    }
    getDataInicio(){
        return this.dataInicio ;
    }
    getDataTermino(){
        return this.dataTermino ;
    }
    getTutor(){
        return this.tutor ;
    }
    getCurso(){
        return this.curso ;
    }
    getAlunos(){
        return this.alunos ;
    }

    setId(id){
        this.id = id;
    }
    setDataInicio(dataInicio){
        this.dataInicio = dataInicio;
    }
    setDataTermino(dataTermino){
        this.dataTermino = dataTermino;
    }
    setTutor(tutor){
        this.tutor = tutor;
    }
    setCurso(curso){
        this.curso = curso;
    }
    setAlunos(alunos){
        this.alunos = alunos;
    }
    toData(){
        let data = {
            id: this.id,
            dataInicio: this.dataInicio,
            dataTermino: this.dataTermino,
            tutor: this.tutor,
            curso: this.curso,
            alunos: this.alunos
        }

        return data;
    }

}