function renderConteudo(tipo,arquivo){
    switch (tipo) {
        case "application/pdf":
            return `<button class="conteudo visualizeMaterial" onclick="openPDF('${getSrc(encodeURI(arquivo),tipo)}')">Visualizar PDF</button>`
            break;
        case "video/mp4":
            return `<video class="conteudo" src="${getSrc(arquivo,tipo)}" type="${tipo}" width="100%" height="100%" controls></video>`
            break;
        case "audio/mpeg":
            return `<audio class="conteudo" autobuffer src="${getSrc(arquivo,tipo)}" type="${tipo}" controls></audio>`
            break;
        case "audio/ogg":
            return `<audio class="conteudo" autobuffer src="${getSrc(arquivo,tipo)}" type="${tipo}" controls></audio>`
            break;
        default:
            return `<img class="conteudo" src="${getSrc(arquivo,tipo)}"></img>`
            break;
    }
}
function openPDF(src){
    let pdfWindow = window.open("");
    pdfWindow.document.write(`<iframe width='100%' height='100%' src='${src}'></iframe>`);
}



