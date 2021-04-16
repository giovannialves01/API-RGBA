class ListPilulaComponent extends HTMLElement {
    constructor(){
        super();
        let id =  this.getAttribute('pilula-id');
        let titulo =  this.getAttribute('pilula-titulo');
        let conteudoArquivo =  this.getAttribute('pilula-conteudo');
        let descricao =  this.getAttribute('pilula-descricao');
        let formatoArquivo =  this.getAttribute('pilula-formato');
        let idArquivo =  this.getAttribute('pilula-id-arquivo');
        let conteudo=""
        this.innerHTML = 
        ` 
        <div class="pilula panel">
			<div class="pilulaTexto accordion">
				<i class="fas fa-capsules"></i>
				<p>${titulo}</p>
				<i class="fas fa-chevron-left"></i>
			</div>
			<div class="conteudoPilula panel">
				${conteudo}
				<p>${descricao}</p>
			</div>
		</div>
        `
    }
}
window.customElements.define('list-pilula', ListPilulaComponent); 