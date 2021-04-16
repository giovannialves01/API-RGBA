window.onload = function carregarConteudo () {
    console.log("carregar Conteudo função");
    serverRequester.fazerGet("/cursos").then((res) => {
        let listagemCursos = document.getElementById("listagem-cursos")
        let div = ''
        res.responseJson.map((c)=>{
            let imgTeste = "https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?size=626&ext=jpg"
            let linha = '<div class="linha">'
            let divCurso = `<button class="accordion"><list-curso curso-id="${c.id}" curso-titulo="${c.titulo}" curso-thumb="${imgTeste}"></list-curso></button>`
            let divPilulas = '<div class="panel">'
            c.pilulas.map((p)=>{
                divPilulas+=`<list-pilula pilula-id="${p.id}" pilula-titulo ="${p.titulo}" pilula-conteudo ="${p.arquivo.conteudo}" pilula-formato ="${p.arquivo.formato}" pilula-descricao="${p.descricao}" pilula-id-arquivo="${p.arquivo.id}"></list-pilula>`
            })
            divPilulas+='</div>'
            linha+=divCurso+divPilulas+"</div>"
            div+=linha
        })

        /* res.responseJson.map((c)=>{
            let linha = '<div class="linha">'
            let imgTeste = "https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?size=626&ext=jpg"
            let divPilulas = ''
            c.pilulas.map((p)=>{
                divPilulas+=`<list-pilula pilula-id="${p.id}" pilula-titulo ="${p.titulo}" pilula-conteudo ="${p.arquivo.conteudo}" pilula-formato ="${p.arquivo.formato}" pilula-descricao="${p.descricao}" pilula-id-arquivo="${p.arquivo.id}"></list-pilula>`
            })
            linha += divCurso
            linha+=divPilulas
            linha+='</div><br/><br/>'
            div+=linha
        }) */
        listagemCursos.innerHTML = div

    }).catch((err) => {
        console.log(err);
    }); 
    collapseAccordion()
} 