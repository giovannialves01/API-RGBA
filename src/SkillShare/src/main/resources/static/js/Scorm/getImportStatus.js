function getImportStatus(importJobId,token){
    return axios({
        method: "get",
        url: `https://cloud.scorm.com/api/v2/courses/importJobs/${importJobId}`,
        headers: {"Content-Type": "application/json","Authorization": `Bearer ${token}`},
    })
    .then(function (response) {
      console.log("-------------------SUCESSO STATUS-------------------");
      return response.data

    })
    .catch(function (err) {
      console.log("-------------------ERRO STATUS-------------------");
      console.log(err);
    });
}