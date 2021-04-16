window.onload = function carregarConteudo () {
    console.log("carregar Conteudo função");
    serverRequester.fazerGet("/cursos").then((res) => {
        let listagemCursos = document.getElementById("listagem-cursos")
        let div = '<hr>'
        res.responseJson.map((c)=>{
            let imgTeste = "https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?size=626&ext=jpg"
            let linha =`
            <div class="linha tab">
                <input type="checkbox" id="${c.id}">
                <label class="curso tab-label" for="${c.id}"><list-curso curso-id="${c.id}" curso-titulo="${c.titulo}" curso-thumb="${imgTeste}"></list-curso><i class="fas fa-chevron-left"></i></label>
                <div class="tab-content">
                 `
            let divPilulas ='<hr><br/ >'
            c.pilulas.map((p)=>{
                divPilulas+=`
                <div class="pilula tab">
                    <input type="checkbox" id="${p.id}">
                    <label class="pilulaTexto tab-label" for="${p.id}"><i class="fas fa-capsules"></i>${p.titulo}<i class="fas fa-chevron-left"></i></label>
                    <div class="tab-content">
                    <div class="conteudoPilula">
                        ${renderConteudo(p.arquivo.tipoArquivo,p.arquivo.conteudo)}
                        <p>${p.descricao}</p>
                    </div>
                    </div>
                </div><hr>`
            })
            linha+=divPilulas
            linha+=`</div></div>`
            div+=linha
        })
        listagemCursos.innerHTML = div

    }).catch((err) => {
        console.log(err);
    }); 
} 