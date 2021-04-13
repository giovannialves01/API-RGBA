function downloadFile(arquivo,tipo,nomeArquivo){
    
    const blob = b64toBlob(arquivo, tipo);

    const link= window.document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
    window.URL.revokeObjectURL(link.href);
}

/**
 * 
 * @param {*} b64Data - Arquivo em base64 
 * @param {string} contentType - tipo do arquivo
 * @param {*} sliceSize - tamanho pra dividir a fatia na hora de converter de base 64 pra blob, favor NÃO modificar a não ser que saiba o que está fazendo 
 * @returns {Blob}
 */
const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}