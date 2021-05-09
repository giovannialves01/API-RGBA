function uploadAluno(courseId,token,usuario){
    return axios({
            method: "post",
            url: 'https://cloud.scorm.com/api/v2/registrations',
            data: {
                courseId: courseId,
                registrationId: usuario.id,
                learner: {
                    id: usuario.id,
                    firstName: usuario.nome,
                    lastName: usuario.sobrenome,
                    email: usuario.email
                }
            },
            headers: { "Content-Type": "application/json","Authorization":`Bearer ${token}` },
        })
        .then(function (response) {
            console.log("-------------------SUCESSO CRIAR ALUNO-------------------");
            return response
        })
        .catch(function (err) {
            console.log("-------------------ERRO CRIAR ALUNO-------------------");
            console.log(err);
        })
}