function auth(){
    let atual = new Date()
    let expirar = new Date(atual.getTime()+36000000).toISOString()//+10 horas
    let appID = "FFA7M3WY3R"
    let secretKey = "SUcSGTKy8MPOuKo39nFD7X0ZkruHseeTx9jUTIHi"
    let credenciais = btoa(`${appID}:${secretKey}`)
    return axios({
        method: "post",
        url: "https://cloud.scorm.com/api/v2/appManagement/token",
        data: {
            permissions: {
                scopes: [ "read","write","delete","admin","read:course","write:course","delete:course","read:dispatch","write:dispatch","delete:dispatch","read:invitation","write:invitation","delete:invitation","read:ping","read:registration","write:registration","delete:registration","read:reporting","read:xapicredential","write:xapicredential","delete:xapicredential","read:xapipipe","write:xapipipe","delete:xapipipe","read:appmgmt","write:appmgmt","delete:appmgmt"]
            },
            expiry: expirar
        },
        headers: {"Content-Type": "application/json","Authorization": `Basic ${credenciais}`},
    })
    .then(function (response) {
      console.log("-------------------SUCESSO AUTH SCORM-------------------");
      return response.data.result

    })
    .catch(function (err) {
      console.log("-------------------ERRO AUTH SCORM-------------------");
      console.log(err);
    });
}