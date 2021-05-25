

async function getProva() {
    let idCurso = localStorage.getItem("idCurso");

    let response = await serverRequester.fazerGetWithData("/cursos/getProva", {"idCurso": idCurso});

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
        let alternativaA = getAlternativaProva(questaoIdentifier, 
            "A", 
            questaoData["alternativaA"], 
            questaoIdentifier + "-radioA");
        let alternativaB = getAlternativaProva(questaoIdentifier, 
            "B", 
            questaoData["alternativaB"], 
            questaoIdentifier + "-radioB");
        let alternativaC = getAlternativaProva(questaoIdentifier, 
            "C", 
            questaoData["alternativaC"], 
            questaoIdentifier + "-radioC");
        let alternativaD = getAlternativaProva(questaoIdentifier, 
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

function getAlternativaProva(group, value, text, idRadio) {
    let divAlternativa = document.createElement("div");
    
    let radioAlternativa = document.createElement("input");
    radioAlternativa.type = "radio";
    radioAlternativa.name = group;
    radioAlternativa.value = value;
    radioAlternativa.id = idRadio;
    radioAlternativa.onchange = function(){
        console.log(idRadio);
    }

    let textoAlternativa = document.createElement("label");
    textoAlternativa.textContent = text;
    textoAlternativa.htmlFor = idRadio;
    
    divAlternativa.appendChild(radioAlternativa);
    divAlternativa.appendChild(textoAlternativa);

    return divAlternativa;
}

async function finalizarProva() {
    console.log("Prova finalizada");

}

buildProva();
