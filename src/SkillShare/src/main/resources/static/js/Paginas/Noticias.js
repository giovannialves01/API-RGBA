async function loadMaisConteudo() {
    let responseEventos = await serverRequester.fazerGet("/eventos");
    let responseDestaques = await serverRequester.fazerGet("/destaques");

    let eventosData = responseEventos["responseJson"];
    let noticiasData = responseDestaques["responseJson"];

    buildContent("sideEventos", eventosData);
    buildContent("sideNoticias", noticiasData);

}

function buildContent(divToAppend, data) {
    let container = document.getElementById(divToAppend);

    for (let i = 0; i < data.length; i++) {
        const entity = data[i];

        let div = document.createElement("div");
        div.classList.add("noticiaExtra");
        div.onclick = function(){
            alert("clicado na noticia: " + entity["titulo"]);
        }

        let img = document.createElement("img");
        let imgTipo = entity["thumb"]["tipoArquivo"];
        let imgArquivo = entity["thumb"]["conteudo"];
        img.setAttribute("src", `data:` + imgTipo + `;base64,` + imgArquivo);
        img.classList.add("imagemNoticiaMaisConteudo");

        let p = document.createElement("p");
        p.textContent = entity["titulo"];

        div.appendChild(img);
        div.appendChild(p);
        
        container.appendChild(div);
    }
}

loadMaisConteudo();
