function uploadScorm(courseId,token,formData){
    return axios({
            method: "post",
            url: `https://cloud.scorm.com/api/v2/courses/importJobs/upload?courseId=${courseId}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data","Authorization":`Bearer ${token}` },
        })
        .then(function (response) {
            console.log("-------------------SUCESSO UPLOAD-------------------");
            return response.data.result
        })
        .catch(function (err) {
            console.log("-------------------ERRO UPLOAD-------------------");
            console.log(err);
        })
}