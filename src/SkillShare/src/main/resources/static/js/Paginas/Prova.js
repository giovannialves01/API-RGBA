var prova = {};
var idProva;

async function getProva() {
    let idCurso = localStorage.getItem("idCurso");

    let response = await serverRequester.fazerGetWithData("/cursos/getProva", {"idCurso": idCurso});

    let provaCrua = [];
    Object.assign(provaCrua, response["responseJson"]["questoes"]);

    for (let i = 0; i < provaCrua.length; i++) {
        const questao = provaCrua[i];
        
        let id = questao["id"];

        prova[id] = Object.assign({}, questao);
    
    }
    idProva = response["responseJson"]["id"];
    return response["responseJson"];
}

async function buildProva() {
    let provaData = await getProva();

    let questoesData = provaData["questoes"];

    let container = document.getElementById("questoesProva");

    let title = document.createElement("label");
    title.textContent = "Prova de geografia";
    title.classList.add("tituloProva");

    container.appendChild(title);

    for (let i = 0; i < questoesData.length; i++) {
        const questaoData = questoesData[i];

        let idQuestao = questaoData["id"];

        let questaoIdentifier = "questaoProva" + (i + 1);

        let containerQuestao = document.createElement("div");
        containerQuestao.id = questaoIdentifier;
        containerQuestao.classList.add("questaoProva");

        let tituloQuestao = document.createElement("label");
        tituloQuestao.textContent = "Questão " + (i + 1);

        let divEnunciadoQuestao = document.createElement("div");
        let enunciado = document.createElement("p");
        enunciado.textContent = questaoData["enunciado"];
        enunciado.classList.add("enunciadoQuestao");

        divEnunciadoQuestao.appendChild(enunciado);

        let divAlternativasQuestao = document.createElement("div");
        divAlternativasQuestao.classList.add("alternativasContainer");
        let alternativaA = getAlternativaProva(idQuestao, questaoIdentifier, 
            "A", 
            questaoData["alternativaA"], 
            questaoIdentifier + "-radioA");
        let alternativaB = getAlternativaProva(idQuestao, questaoIdentifier, 
            "B", 
            questaoData["alternativaB"], 
            questaoIdentifier + "-radioB");
        let alternativaC = getAlternativaProva(idQuestao, questaoIdentifier, 
            "C", 
            questaoData["alternativaC"], 
            questaoIdentifier + "-radioC");
        let alternativaD = getAlternativaProva(idQuestao, questaoIdentifier, 
            "D", 
            questaoData["alternativaD"], 
            questaoIdentifier + "-radioD");
        
        divAlternativasQuestao.appendChild(alternativaA);
        divAlternativasQuestao.appendChild(alternativaB);
        divAlternativasQuestao.appendChild(alternativaC);
        divAlternativasQuestao.appendChild(alternativaD);

        containerQuestao.appendChild(divEnunciadoQuestao);
        containerQuestao.appendChild(divAlternativasQuestao);

        container.appendChild(tituloQuestao);
        container.appendChild(containerQuestao);
        
    }

    let botaoFinalizar = document.createElement("button");
    botaoFinalizar.textContent = "Finalizar prova";
    botaoFinalizar.onclick = function (){
        finalizarProva();

    }

    container.appendChild(botaoFinalizar);

}

function getAlternativaProva(idQuestao, group, value, text, idRadio) {
    let divAlternativa = document.createElement("div");
    
    let radioAlternativa = document.createElement("input");
    radioAlternativa.type = "radio";
    radioAlternativa.name = group;
    radioAlternativa.value = value;
    radioAlternativa.id = idRadio;
    radioAlternativa.onchange = function(){
        validarQuestao(idQuestao, this.value);
    }

    let textoAlternativa = document.createElement("label");
    textoAlternativa.textContent = text;
    textoAlternativa.htmlFor = idRadio;
    
    divAlternativa.appendChild(radioAlternativa);
    divAlternativa.appendChild(textoAlternativa);

    return divAlternativa;
}

async function finalizarProva() {
    console.log(acertosErrosProva);

    let keys = Object.keys(acertosErrosProva);

    let notaFinal = 0;
    let notaAcerto = parseFloat((10 / keys.length).toFixed(2));

    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        
        if(element["alternativaEscolhida"] == element["alternativaCorreta"]){
            notaFinal += notaAcerto;

        }

    }

    notaFinal = notaFinal.toFixed(2);

    if(notaFinal > 9.5){
        notaFinal = 10;
    }

    let feedback = {
        "prova": {"id": idProva},
        "acertosErrosProva": JSON.stringify(acertosErrosProva),
        "notaFinal": notaFinal
    };

    let response = await serverRequester.fazerPost("/alunos/novoFeedback?cpfAluno=2&idCurso=2", feedback);

    if(response["responseJson"]){
        alert("Prova finalizada com sucesso!\n\nAguarde o tutor enviar seu feedback");

    }else{
        alert("Ocorreu um erro ao finalizar a prova, tente novamente, " 
            + "e se o problema persistir, contate um administrador");

    }

}

var acertosErrosProva = {}
function validarQuestao(idQuestao, alternativa) {
    let questao = prova[idQuestao];

    acertosErrosProva[idQuestao] = {
        "alternativaEscolhida": alternativa, 
        "alternativaCorreta": questao["alternativaCorreta"]
    };

}

buildProva();
