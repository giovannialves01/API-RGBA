window.onload = async function carregarConteudo() {

     let url = window.location.href;
     let quaseid = url.split("tutoriaAlunosTurma");
     let id = quaseid[1];

     console.log(id);

     let divTodasTurmas = document.getElementById("todosAlunos");

     let resposta = await serverRequester.fazerGet("/turmas/turma/" + id);

     let turma = resposta.responseJson;
     let alunos = turma.alunos;

     console.log(alunos);

     for (let i = 0; i < alunos.length; i++) {

          let divTurma = document.createElement("div");
          divTurma.classList.add("turma");

          let icone = document.createElement("i");
          icone.classList.add("fas");
          icone.classList.add("fa-user");

          let pTexto = document.createElement("p");
          pTexto.innerText = alunos[i].nome;

          divTurma.appendChild(icone);
          divTurma.appendChild(pTexto);

          let separador = document.createElement("div");
          separador.classList.add("separador");

          let aLinkAlunos = document.createElement("a");
          aLinkAlunos.classList.add("linkAlunosTurma");
          aLinkAlunos.href = "tutoriaAluno" + alunos[i].cpf;

          aLinkAlunos.appendChild(divTurma);

          divTodasTurmas.appendChild(aLinkAlunos);
          divTodasTurmas.appendChild(separador);

     }

}