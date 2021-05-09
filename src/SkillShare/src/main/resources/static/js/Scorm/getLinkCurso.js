function getLinkCurso(registrationId,token){
    return axios({
            method: "post",
            url: `https://cloud.scorm.com/api/v2/registrations/${registrationId}/launchLink`,
            data: {
                redirectOnExitUrl: "http://localhost:8080/scorm"//aqui da pra definir um link pra quando o usuario apertar o botao exit para sair do curso
            },
            headers: { "Content-Type": "application/json","Authorization":`Bearer ${token}` },
        })
        .then(function (response) {
            console.log("-------------------SUCESSO BUILD REGISTRATION LINK-------------------");
            return response.data.launchLink
        })
        .catch(function (err) {
            console.log("-------------------ERRO CREATE BUILD REGISTRATION LINK-------------------");
            console.log(err);
        })
}