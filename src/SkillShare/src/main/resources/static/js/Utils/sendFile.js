/**
 * Necessita da biblioteca axios <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> para funcionar
 * @param {FormData} formData - formdata com as informações da imagem (pode possuir outras informações caso o endpoint precise)
 * @param {String} url - url do endpoint
 * @returns {JSON} JSON
 */
 function sendFile(formData,url){
    return axios({
            method: "post",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data"},
        })
        .then(function (response) {
            console.log("-------------------SUCESSO UPLOAD-------------------");
            console.log(response);
            return response
        })
        .catch(function (response) {
            console.log("-------------------ERRO UPLOAD-------------------");
            console.log(response);
        })
 } 