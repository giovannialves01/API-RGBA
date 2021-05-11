function deleteAlunoScorm(registrationId,token){
    return axios({
            method: "delete",
            url: `https://cloud.scorm.com/api/v2/registrations/${registrationId}`,
            headers: { "Authorization":`Bearer ${token}` },
        })
        .then(function (response) {
            console.log("-------------------SUCESSO DELETE ALUNO SCORM-------------------");
            return response
        })
        .catch(function (err) {
            console.log("-------------------ERRO DELETE ALUNO SCORM-------------------");
            console.log(err);
        })
}