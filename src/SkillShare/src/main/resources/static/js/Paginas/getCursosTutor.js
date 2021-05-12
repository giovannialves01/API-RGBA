window.onload = async function carregarConteudo() {

     var divTodosCursos = document.getElementById("cursosTutorShow");
     divTodosCursos.innetHTML = "";

     let resposta = await serverRequester.fazerGet("/turmas/turma/tutor");

     let turmas = resposta.responseJson;

     console.log(turmas);

     for (let i = 0; i < turmas.length; i++) {

          // div que engloba as coisas do curso
          var divCurso = document.createElement("div");
          divCurso.classList.add("curso");

          let imgCurso = document.createElement("img");
          imgCurso.alt = "foto do curso";
          var id_img_curso = "imgCurso" + turmas[i].curso.id;
          imgCurso.id = id_img_curso;
          divCurso.appendChild(imgCurso);

          let pTituloCurso = document.createElement("p");
          pTituloCurso.innerText = turmas[i].curso.titulo;
          divCurso.appendChild(pTituloCurso);

          var aLinkCurso = document.createElement("a");
          aLinkCurso.href = "/tutoriaCurso" + turmas[i].curso.id;
          aLinkCurso.style.textDecoration = "none";
          aLinkCurso.style.color = "black";

          aLinkCurso.appendChild(divCurso);

          divTodosCursos.appendChild(aLinkCurso);

          renderIMG(turmas[i].curso.thumb.arquivo.conteudo, turmas[i].curso.thumb.arquivo.tipoArquivo, id_img_curso);

     }

}
