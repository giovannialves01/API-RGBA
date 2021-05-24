async function getProva() {
    let idCurso = localStorage.getItem("idCurso");

    let response = await serverRequester.fazerGetWithData("/cursos/getProva", {"idCurso": idCurso});

    return response["responseJson"];
}

async function buildProva() {
    let provaData = await getProva();

    let questoesData = provaData["questoes"];

    let container = document.getElementById("questoesProva");

    for (let i = 0; i < questoesData.length; i++) {
        const questaoData = questoesData[i];
        

    }

}

buildProva();
