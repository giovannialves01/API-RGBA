class ListTurmaComponent extends HTMLElement {
    constructor(){
        super();
        let cursoId =  this.getAttribute('idCurso');
        let turmaId =  this.getAttribute('idTurma');
        let nomeTurma = this.getAttribute('nomeTurma');

        this.innerHTML = 
        ` 
        <div class="turma">
			<div class="tituloTexto">
				<h1>${nomeTurma}</h1>
                <h3>${idTurma}</h3>
			</div>
		</div>
        `
    }
}
window.customElements.define('list-turma', ListTurmaComponent);