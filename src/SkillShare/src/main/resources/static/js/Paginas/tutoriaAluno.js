var feedbacks;
var provaData;
var feedbackProva;

window.onload = async function carregarConteudo() {

    let url = window.location.href;
    let quaseid = url.split("feedback");
    let id = quaseid[1];

    let cpfAluno = id;
    let idCurso = localStorage.getItem("idCursoTutoria", id);

    let respostaAluno = await serverRequester.fazerGet("/alunos/" + cpfAluno);
    let infosAluno = respostaAluno.responseJson;

    let nomeDoAlunoSpan = document.getElementById("nomeDoAlunoTutoria");
    nomeDoAlunoSpan.innerText = infosAluno.nome;

    let response = await serverRequester.fazerGetWithData("/alunos/feedbacks", {"cpfAluno": cpfAluno});
    feedbacks = response["responseJson"];

    var prova = {};
    var idProva;

    async function getProva() {
        let idCurso = localStorage.getItem("idCursoTutoria");

        let response = await serverRequester.fazerGetWithData("/cursos/getProva", { "idCurso": idCurso });

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
        provaData = await getProva();

        let questoesData = provaData["questoes"];

        feedbackProva = getFeedbackProva(provaData["id"]);

        let container = document.getElementById("avaliacaoAlunoFeedback");

        for (let i = 0; i < questoesData.length; i++) {
            const questaoData = questoesData[i];

            let idQuestao = questaoData["id"];
            let respondidoAluno = feedbackProva["acertosErrosProva"][idQuestao];

            let questaoIdentifier = "questaoProva" + (i + 1);

            let containerQuestao = document.createElement("div");
            containerQuestao.id = questaoIdentifier;
            containerQuestao.classList.add("questaoProva");

            let tituloQuestao = document.createElement("label");
            tituloQuestao.textContent = "Questão " + (i + 1);
            tituloQuestao.classList.add("tituloQuestaoProva");

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
                questaoIdentifier + "-radioA", respondidoAluno);
            let alternativaB = getAlternativaProva(idQuestao, questaoIdentifier,
                "B",
                questaoData["alternativaB"],
                questaoIdentifier + "-radioB", respondidoAluno);
            let alternativaC = getAlternativaProva(idQuestao, questaoIdentifier,
                "C",
                questaoData["alternativaC"],
                questaoIdentifier + "-radioC", respondidoAluno);
            let alternativaD = getAlternativaProva(idQuestao, questaoIdentifier,
                "D",
                questaoData["alternativaD"],
                questaoIdentifier + "-radioD", respondidoAluno);

            divAlternativasQuestao.appendChild(alternativaA);
            divAlternativasQuestao.appendChild(alternativaB);
            divAlternativasQuestao.appendChild(alternativaC);
            divAlternativasQuestao.appendChild(alternativaD);

            containerQuestao.appendChild(divEnunciadoQuestao);
            containerQuestao.appendChild(divAlternativasQuestao);

            container.appendChild(tituloQuestao);
            container.appendChild(containerQuestao);

        }

    }

    buildProva();

}

async function enviarFeedback(event){
    event.preventDefault();

    let compreendimento = document.querySelector('input[name="compreendimento"]:checked').value;
    let comentarioTutor = document.getElementById("explicacao").value;

    feedbackProva["compreendimento"] = compreendimento;
    feedbackProva["comentarioTutor"] = comentarioTutor;
    feedbackProva["acertosErrosProva"] = JSON.stringify(feedbackProva["acertosErrosProva"]);

    let response = await serverRequester.fazerPost("/alunos/updateFeedback", feedbackProva);

    if(response["ok"]){
        alert("Feedback enviado para o aluno com sucesso!");

    }else{
        alert("Não foi possível enviar o feedback ao aluno, tente novamente.\n\nCaso o erro persista,"
        + " contate um administrador");

    }

}

function getFeedbackProva(idProva) {
    for (let i = 0; i < feedbacks.length; i++) {
        let feedback = feedbacks[i];

        let provaFeedback = JSON.parse(feedback["prova"]);
        let provaFeedbackId = provaFeedback["id"];

        if(provaFeedbackId == idProva){
            feedback["prova"] = provaData;
            feedback["acertosErrosProva"] = JSON.parse(feedback["acertosErrosProva"]);

            return feedback;
        }

    }

}

function getAlternativaProva(idQuestao, group, value, text, idRadio, respondidoAluno) {
    let divAlternativa = document.createElement("div");

    let radioAlternativa = document.createElement("input");
    radioAlternativa.type = "radio";
    radioAlternativa.name = group;
    radioAlternativa.value = value;
    radioAlternativa.id = idRadio;

    if(respondidoAluno["alternativaEscolhida"] == value){
        radioAlternativa.checked = true;
    }

    radioAlternativa.disabled = true;

    let textoAlternativa = document.createElement("label");
    textoAlternativa.textContent = text;
    textoAlternativa.htmlFor = idRadio;

    if(respondidoAluno["alternativaCorreta"] == value){
        textoAlternativa.classList.add("alternativaCorreta");

    }else if(respondidoAluno["alternativaEscolhida"] == value
            && respondidoAluno["alternativaEscolhida"] != respondidoAluno["alternativaCorreta"]){
        textoAlternativa.classList.add("alternativaErrada");

    }

    divAlternativa.appendChild(radioAlternativa);
    divAlternativa.appendChild(textoAlternativa);

    return divAlternativa;
}