async function loadMaisConteudo() {
    let responseEventos = await serverRequester.fazerGet("/eventos");
    let responseDestaques = await serverRequester.fazerGet("/destaques");

    let eventosData = responseEventos["responseJson"];
    let noticiasData = responseDestaques["responseJson"];

    console.log(eventosData);
    console.log(noticiasData);

    buildContent("sideEventos", eventosData, false);
    buildContent("sideNoticias", noticiasData, true);
    preloadContent();

}

function buildContent(divToAppend, data, noticiaEvento) {
    let container = document.getElementById(divToAppend);

    for (let i = 0; i < data.length; i++) {
        const entity = data[i];

        let div = document.createElement("div");
        div.classList.add("noticiaExtra");
        if(noticiaEvento){
            div.onclick = async function(){
                await showNoticia(entity["id"]);
            }
        }else{
            div.onclick = async function(){
                await showEvento(entity["id"]);
            }
        }


        let img = document.createElement("img");
        let imgTipo = entity["thumb"]["arquivo"]["tipoArquivo"];
        let imgArquivo = entity["thumb"]["arquivo"]["conteudo"];
        img.setAttribute("src", `data:` + imgTipo + `;base64,` + imgArquivo);
        img.classList.add("imagemNoticiaMaisConteudo");

        let p = document.createElement("p");
        p.textContent = entity["titulo"];

        div.appendChild(img);
        div.appendChild(p);
        
        container.appendChild(div);

    }

}

async function showNoticia(idNoticia) {
    let container = document.getElementById("noticiaEventoDisplayer");

    let response = await serverRequester.fazerGet("/destaques", idNoticia);

    let data = response["responseJson"];

    let noticia = new Destaque(data);

    container.innerHTML = "";

    let header = document.createElement("div");
    header.classList.add("noticiaHeader");

    let headerThumbnail = document.createElement("img");
    headerThumbnail.classList.add("imagemNoticiaHeader");
    let imgTipo = noticia.getArquivo().arquivo.tipoArquivo;
    let imgArquivo = noticia.getArquivo().arquivo.conteudo;
    headerThumbnail.setAttribute("src", `data:` + imgTipo + `;base64,` + imgArquivo);

    let headerTexts = document.createElement("div");
    headerTexts.classList.add("noticiaHeaderTitulo");

    let headerTitle = document.createElement("h1");
    headerTitle.textContent = noticia.getTitulo();

    let headerDescription = document.createElement("p");
    headerDescription.textContent = noticia.getSinopse();

    let bodyText = document.createElement("p");
    bodyText.classList.add("noticiaText")
    bodyText.textContent = noticia.getConteudo();

    headerTexts.appendChild(headerTitle);
    headerTexts.appendChild(headerDescription);

    header.appendChild(headerThumbnail);
    header.appendChild(headerTexts);

    container.appendChild(header);
    container.appendChild(bodyText);
    
}

async function showEvento(idEvento){
    let container = document.getElementById("noticiaEventoDisplayer");

    let response = await serverRequester.fazerGet("/eventos", idEvento);

    let data = response["responseJson"];

    let evento = new Evento(data);

    container.innerHTML = "";

    let header = document.createElement("div");
    header.classList.add("noticiaHeader");

    let headerThumbnail = document.createElement("img");
    headerThumbnail.classList.add("imagemNoticiaHeader");
    let imgTipo = evento.getArquivo().arquivo.tipoArquivo;
    let imgArquivo = evento.getArquivo().arquivo.conteudo;
    headerThumbnail.setAttribute("src", `data:` + imgTipo + `;base64,` + imgArquivo);

    let headerTexts = document.createElement("div");
    headerTexts.classList.add("noticiaHeaderTitulo");

    let headerTitle = document.createElement("h1");
    headerTitle.textContent = evento.getTitulo();

    let headerDescription = document.createElement("p");
    headerDescription.textContent = evento.getSinopse();

    let bodyText = document.createElement("p");
    bodyText.classList.add("noticiaText")
    bodyText.textContent = evento.getConteudo();

    headerTexts.appendChild(headerTitle);
    headerTexts.appendChild(headerDescription);

    header.appendChild(headerThumbnail);
    header.appendChild(headerTexts);

    container.appendChild(header);
    container.appendChild(bodyText);
}

async function preloadContent() {
    let noticiaId = window.sessionStorage.getItem("noticia");
    let eventoId = window.sessionStorage.getItem("evento");

    if(noticiaId != 0){
        showNoticia(noticiaId);

    }else{
        showEvento(eventoId);

    }

}

loadMaisConteudo();
