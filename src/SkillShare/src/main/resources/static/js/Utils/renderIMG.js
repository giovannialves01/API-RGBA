/**
 * Necessita da biblioteca da Jquery <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> para funcionar 
 * @param {BinaryType} arquivo - conteúdo do arquivo retornado pelo java
 * @param {String} tipo - tipo do arquivo retornado pelo java
 * @param {String} idImg - id da tag Img que vai renderizar a imagem
 */
function renderIMG(arquivo,tipo,idImg){
    document.getElementById(idImg).setAttribute("src",`data:${tipo};base64,${arquivo}`)
}