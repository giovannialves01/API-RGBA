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

    function getAlternativaProva(idQuestao, group, value, text, idRadio) {
        let divAlternativa = document.createElement("div");

        let radioAlternativa = document.createElement("input");
        radioAlternativa.type = "radio";
        radioAlternativa.name = group;
        radioAlternativa.value = value;
        radioAlternativa.id = idRadio;
        radioAlternativa.onchange = function () {
            validarQuestao(idQuestao, this.value);
        }

        let textoAlternativa = document.createElement("label");
        textoAlternativa.textContent = text;
        textoAlternativa.htmlFor = idRadio;

        divAlternativa.appendChild(radioAlternativa);
        divAlternativa.appendChild(textoAlternativa);

        return divAlternativa;
    }

    async function buildProva() {
        let provaData = await getProva();

        let questoesData = provaData["questoes"];

        let container = document.getElementById("avaliacaoAlunoFeedback");

        for (let i = 0; i < questoesData.length; i++) {
            const questaoData = questoesData[i];

            let idQuestao = questaoData["id"];

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

    }

    buildProva();

    // let formFeedback = document.getElementById("formFeedbackTutor");
    // formFeedback.addEventListener("submit", alert("enviado"));
    // function enviarFeedback() {

    //     let explicacao = document.getElementById("explicacao").value;
    //     let radios = document.getElementsByName("compreensao");
    //     let compreensao = "";

    //     radios.forEach(radio => {
    //         if (radio.checked) {
    //             compreensao = radio.value;
    //         }
    //     });

    //     // tive que fazer com then porque tava dando um mesmo problema que deu outro dia com o await.....
    //     let responseFeedback = serverRequester.fazerGetWithData("/alunos/feedbacks", { "cpfAluno": cpfAluno }).then((resposta) => {

    //         let feedback = resposta["responseJson"];
    //         console.log("Feedback:");
    //         console.log(feedback);

    //         let json = {
    //             "acertosErrosProva": JSON.stringify("n sei"), // preciso fazer ou já tá feita a correção?
    //             "comentarioTutor": explicacao,
    //             "compreendimento": compreensao,
    //             "id": feedback[0].id,
    //             "notaFinal": feedback[0].notaFinal,
    //             "prova": { "id": feedback[0].prova }
    //         }

    //         console.log(json);

    //         let response = serverRequester.fazerPost("/alunos/updateFeedback", feedback).then((response) => {
    //             console.log("update:");
    //             console.log(response);
    //         });
    //     });

    // }

}