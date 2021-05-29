async function loadCertificados() {
    let containerCertificados = document.getElementById("certificadosToShow");
	
	let cpfAluno = localStorage.getItem("cpfUser");

    let response = await serverRequester.fazerGetWithData("/alunos/certificados", {"cpfAluno": cpfAluno});

    let certificados = response["responseJson"];
	
    for (let i = 0; i < certificados.length; i++) {
        const data = certificados[i];
		
        let entityIdentifier = "certificado" + (i + 1);

        let entityContainer = document.createElement("div");
        entityContainer.classList.add("contentBox");
        entityContainer.id = 'certificado ' + (i + 1);
        let containerCadaCertificados = document.getElementById('certificado-' + (i + 1));       
        
        let showContentLabel = document.createElement("label");
		showContentLabel.textContent = data["nomeCurso"];
		
		let showContentButton = document.createElement("button");
		showContentButton.textContent = "Baixar Certificado";
        showContentButton.classList.add("greenButton");
        showContentButton.onclick = function (){
                now = new Date
    			monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");

    			var doc = new jsPDF("l", 'mm', 'a4');
    			var nomeCursoFormatado = doc.splitTextToSize(data["nomeCurso"], (70));
    			var nomeAluno = 'Giovanni dos Santos Alves';
   				var tmp = nomeAluno.split(' ');
    			var nomeAlunoFormatado = tmp[0] + ' ' + tmp[tmp.length-1] + ',';
    
				let img = getImageBase64(data["imagemDeFundo"]["conteudo"], data["imagemDeFundo"]["tipoArquivo"]);
    			doc.addImage(img, 'PNG', 0, 0, 297, 210);
    			doc.setFontSize(20);
    			
    			doc.text(55, 95, data["mensagem"]);

    			doc.save("Certificado.pdf");
        }
		
		containerCertificados.appendChild(entityContainer);
		entityContainer.appendChild(showContentLabel);
		entityContainer.appendChild(showContentButton);	
		
        let fieldsContainer = document.createElement("div");
        fieldsContainer.style.width = "60%";
            

		

		if(i < certificados.length - 1){
			let separador = document.createElement("div");
			separador.classList.add("separador");

			containerCertificados.appendChild(separador);
		}


    }
    
}

function getImageBase64(arquivo, tipo){
    return "data:" + tipo + ";base64," + arquivo;
}

loadCertificados();