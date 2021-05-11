function deleteScorm(courseId,token){
    return axios({
            method: "delete",
            url: `https://cloud.scorm.com/api/v2/courses/${courseId}`,
            headers: { "Authorization":`Bearer ${token}` },
        })
        .then(function (response) {
            console.log("-------------------SUCESSO DELETE SCORM-------------------");
            return response.data
        })
        .catch(function (err) {
            console.log("-------------------ERRO DELETE SCORM-------------------");
            console.log(err);
        })
}