/**
 * Esconde qualquer janela que estiver aberta na área de exibição de conteúdo da página
 * 
 * @author Rafael Furtado
 * @returns undefined
 */
 function hideAllContent() {
     let showedContents = document.getElementsByClassName("show");
 
     for (let i = 0; i < showedContents.length; i++) {
         const content = showedContents[i];
         
         content.classList.remove("show");
         content.classList.add("hide");
 
     }
 
 }
 
 /**
  * Exibe um conteúdo específico na área de exibição de conteúdo da página
  * 
  * @author Rafael Furtado
  * @param {string} contentId ID do elemento que contém o conteúdo a ser exibido
  * @returns undefined
  */
 function showContent(contentId) {
     let optionContent = document.getElementById(contentId);
     optionContent.classList.add("show");
     optionContent.classList.remove("hide");
 
 }