async function carregarOpcao3 () {

    let conteudoOpcao = document.getElementById("conteudo-opcao");
    conteudoOpcao.innerHTML = "";

    let resposta = await serverRequester.fazerGet("/biblioteca/findAll");
    let livros = resposta.responseJson;

    for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        
        let biblioteca = new Biblioteca(livro);

        let row_material = document.createElement("div");
        row_material.classList.add("divConteudo");

        let icon = document.createElement("div");
        icon.classList.add("icone");
        let icone = document.createElement("i");
        icone.className = "fas fa-book";
        icon.appendChild(icone);

        let infos = document.createElement("div");
        infos.classList.add("infos");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        p1.textContent = biblioteca.getNome();
        p2.textContent = biblioteca.getAutor();
        infos.appendChild(p1);
        infos.appendChild(p2);

        let botao = document.createElement("div");
        let botaoVdd = document.createElement("button");
        botao.classList.add("botao");
        botaoVdd.textContent = "Visualizar"
        botaoVdd.onclick = function () {
            console.log("Mostrando livro");
        }
        botao.appendChild(botaoVdd);

        row_material.appendChild(icon);
        row_material.appendChild(infos);
        row_material.appendChild(botao);

        conteudoOpcao.appendChild(row_material);

        if(i < livros.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            conteudoOpcao.appendChild(separador);
        }
    }
}