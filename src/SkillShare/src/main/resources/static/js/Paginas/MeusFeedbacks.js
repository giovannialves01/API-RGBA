async function carregarFeedbacks() {
    let cpfAluno = localStorage.getItem("cpfUser");

    let response = await serverRequester.fazerGetWithData("/alunos/feedbacks", {cpfAluno: cpfAluno});

    let feedbacksData = response["responseJson"];

    let container = document.getElementById("meusFeedbacksContainer");

    for (let i = 0; i < feedbacksData.length; i++) {
        const feedback = feedbacksData[i];

        let feedbackIdentifier = "feedback-" + (i + 1);
        
        let feedbackContainer = document.createElement("div");
        feedbackContainer.classList.add("feedback");
        feedbackContainer.classList.add("hideFeedback");
        feedbackContainer.id = feedbackIdentifier;

        let feedbackParte1Container = document.createElement("div");
        feedbackParte1Container.classList.add("feedbackParte1");

        let labelNomeCurso = document.createElement("label");
        labelNomeCurso.textContent = feedback["nomeCurso"];
        let labelNotaProva = document.createElement("label");
        labelNotaProva.textContent = "Nota da prova: " + feedback["notaFinal"];
        let botaoExpandir = document.createElement("span");
        botaoExpandir.className = "fas fa-chevron-left fa-botaoExpandir";
        botaoExpandir.onclick = function () {
            expandirEsconder(feedbackIdentifier);
        }

        feedbackParte1Container.appendChild(labelNomeCurso);
        feedbackParte1Container.appendChild(labelNotaProva);
        feedbackParte1Container.appendChild(botaoExpandir);

        let feedbackParte2Container = document.createElement("div");
        feedbackParte2Container.classList.add("feedbackParte2");

        let comentarioTutorContainer = document.createElement("div");
        comentarioTutorContainer.classList.add("comentarioTutor");

        let labelComentarioTutor = document.createElement("label");
        labelComentarioTutor.textContent = "Comentário do tutor do curso";

        let textAreaComentarioTutor = document.createElement("div");
        textAreaComentarioTutor.textContent = feedback["comentarioTutor"];
        textAreaComentarioTutor.classList.add("textAreaComentarioTutor");

        comentarioTutorContainer.appendChild(labelComentarioTutor);
        comentarioTutorContainer.appendChild(textAreaComentarioTutor);

        let labelEntendimento = document.createElement("label");
        labelEntendimento.textContent = "Seu entendimento do curso, de acordo com o tutor, foi classificado como: ";

        switch (feedback["compreendimento"]) {
            case "1":
                labelEntendimento.textContent += "Péssimo";
                break;

            case "2":
                labelEntendimento.textContent += "Ruim";
                break;

            case "3":
                labelEntendimento.textContent += "Regular";
                break;

            case "4":
                labelEntendimento.textContent += "Ótimo";
                break;

            case "5":
                labelEntendimento.textContent += "Perfeito";
                break;
        
            default:
                break;
        }

        feedbackParte2Container.appendChild(comentarioTutorContainer);
        feedbackParte2Container.appendChild(labelEntendimento);

        feedbackContainer.appendChild(feedbackParte1Container);
        feedbackContainer.appendChild(feedbackParte2Container);

        container.appendChild(feedbackContainer);

        if(i < feedbacksData.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador2");

            container.appendChild(separador);

        }

    }

}

function expandirEsconder(feedbackIdentifier) {
    let container = document.getElementById(feedbackIdentifier);

    let botaoExpandir = container.getElementsByClassName("fa-botaoExpandir")[0];

    if(botaoExpandir.className.includes("left")){
        botaoExpandir.className = "fas fa-chevron-down fa-botaoExpandir";
        container.classList.remove("hideFeedback");
        container.classList.add("showFeedback");

    }else{
        botaoExpandir.className = "fas fa-chevron-left fa-botaoExpandir";
        container.classList.remove("showFeedback");
        container.classList.add("hideFeedback");
        
    }

}

carregarFeedbacks();