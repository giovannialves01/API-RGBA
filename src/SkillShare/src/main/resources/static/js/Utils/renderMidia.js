/**
 * @param {BinaryType} arquivo - conteúdo do arquivo retornado pelo java
 * @param {String} tipo - tipo do arquivo retornado pelo java
 * @param {String} id - id da tag Img que vai renderizar a imagem
 */
 function renderMidia(arquivo,tipo,id){
    document.getElementById(id).setAttribute("src",`data:${tipo};base64,${arquivo}`)
    document.getElementById(id).setAttribute("type",`${tipo}`)
    document.getElementById(id).load()


} 