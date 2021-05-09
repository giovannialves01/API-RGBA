function getProgressoAluno(registrationId,t){
    return axios({
        method: "get",
        url: `https://cloud.scorm.com/api/v2/registrations/${registrationId}?includeChildResults=true&includeInteractionsAndObjectives=true&includeRuntime=true`,
        headers: {"Content-Type": "application/json","Authorization": `Bearer ${t}`},
    })
    .then(function (response) {
      console.log("-------------------SUCESSO ALUNO PROGRESSO-------------------");
      return response.data

    })
    .catch(function (err) {
      console.log("-------------------ERRO ALUNO PROGRESSO-------------------");
      console.log(err);
    });
}