class ListCursoComponent extends HTMLElement {
    constructor(){
        super();
        let id =  this.getAttribute('curso-id');
        let titulo =  this.getAttribute('curso-titulo');
        let thumb =  this.getAttribute('curso-thumb');

        this.innerHTML = 
        ` 
        <div class="curso">
			<img
				src="${thumb}">
			<div class="tituloTexto">
				<h1>${titulo}</h1>
				<p>Clique aqui para expandir e visualizar todas as pílulas
					referentes a este curso</p>
			</div>
		</div>
        `
    }
}
window.customElements.define('list-curso', ListCursoComponent);