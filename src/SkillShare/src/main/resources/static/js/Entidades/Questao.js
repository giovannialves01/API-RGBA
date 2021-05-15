class Questao{
    constructor(questaoData = {}) {
        if(questaoData == {}){
            this.id;
            this.enunciado;
            this.alternativaA;
            this.alternativaB;
            this.alternativaC;
            this.alternativaD;
            this.alternativaCorreta;
            this.curso;
            

        }else{
            this.id = questaoData["id"];
            this.enunciado = questaoData["enunciado"];
            this.alternativaA = questaoData["alternativaA"];
            this.alternativaB = questaoData["alternativaB"];
            this.alternativaC = questaoData["alternativaC"];
            this.alternativaD = questaoData["alternativaD"];
            this.alternativaCorreta = questaoData["alternativaCorreta"];
            this.curso = questaoData["curso"];

        }

    }

    getId(){
        return this.id;
    }

    getEnunciado(){
        return this.enunciado;
    }

    getAlternativaA(){
        return this.alternativaA;
    }

    getAlternativaB(){
        return this.alternativaB;
    }

    getAlternativaC(){
        return this.alternativaC;
    }

    getAlternativaD(){
        return this.alternativaD;
    }

    getAlternativaCorreta(){
        return this.alternativaCorreta;
    }

    getCurso(){
        return this.curso;
    }

    getDeleteMessage(){
        return this.enunciado;
    }



    setId(id){
        this.id = id;
    }

    setEnunciado(enunciado){
        this.enunciado = enunciado;
    }

    setAlternativaA(alternativaA){
        this.alternativaA = alternativaA;
    }

    setAlternativaB(alternativaB){
        this.alternativaB = alternativaB;
    }

    setAlternativaC(alternativaC){
        this.alternativaC = alternativaC;
    }

    setAlternativaD(alternativaD){
        this.alternativaD = alternativaD;
    }

    setAlternativaCorreta(alternativaCorreta){
        this.alternativaCorreta = alternativaCorreta;
    }

    setCurso(curso){
        this.curso = curso;
    }


    toData(){
        let data = {
            id: this.id,
            enunciado: this.enunciado,
            alternativaA: this.alternativaA,
            alternativaB: this.alternativaB,
            alternativaC: this.alternativaC,
            alternativaD: this.alternativaD,
            alternativaCorreta: this.alternativaCorreta,
            curso: this.curso
        }

        return data;
    }
    
}