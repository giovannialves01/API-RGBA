async function carregarConteudo() {

console.log("oi");

	let conteudoMaterial = document.getElementById("renderizar");
	conteudoMaterial.innerHTML = "";

	var url = document.URL;
	var url_array = url.split('?id=');
	var id_material = url_array[url_array.length - 1];

	let resposta = await serverRequester.fazerGet("/biblioteca/" + id_material);

	let material = resposta.responseJson;
	var div_tudo = document.createElement("div");
	div_tudo.classList.add("adjust-size");
	var div_pdf = document.createElement("div");

	let button_anterior = document.createElement("button");
	button_anterior.id = "anterior";
	button_anterior.textContent = "Anterior";

	let button_proximo = document.createElement("button");
	button_proximo.id = "proximo";
	button_proximo.textContent = "Próximo";
	
	let br = document.createElement("br");

	let span_pagina_tudo = document.createElement("span");

	let span_pagina_atual = document.createElement("span");
	span_pagina_atual.id = "paginaAtual";

	let span_separador = document.createElement("span");
	span_separador.textContent = "/";

	let span_pagina_total = document.createElement("span");
	span_pagina_total.id = "paginaTotal";

	span_pagina_tudo.appendChild(span_pagina_atual);
	span_pagina_tudo.appendChild(span_separador);
	span_pagina_tudo.appendChild(span_pagina_total);

	let canvas_pdf = document.createElement("canvas");
	canvas_pdf.id = "canvasPdf";

	div_pdf.appendChild(button_anterior);
	div_pdf.appendChild(button_proximo);
	
	divSpan = document.createElement("div");
	divSpan.appendChild(span_pagina_tudo);
	
	div_tudo.appendChild(div_pdf);
	div_tudo.appendChild(divSpan);
	div_tudo.appendChild(canvas_pdf);
	div_tudo.classList.add("size");
	conteudoMaterial.appendChild(div_tudo);

	renderPDF(material.arquivo.conteudo, "canvasPdf", "paginaAtual", "paginaTotal", "anterior", "proximo")

	var download = document.getElementById("download");
	download.onclick = function() {
		downloadFile(material.arquivo.conteudo, material.arquivo.tipoArquivo, material.arquivo.nomeArquivo);
	}

}

carregarConteudo();