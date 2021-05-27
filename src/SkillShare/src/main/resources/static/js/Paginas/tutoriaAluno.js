window.onload = async function carregarConteudo() {

     let url = window.location.href;
	let quaseid = url.split("feedback");
	let id = quaseid[1];

     let cpfAluno = id;
     let idCurso = localStorage.getItem("idCursoTutoria", id);

     alert("Tutoria do aluno " + cpfAluno + " no curso " + idCurso);
}