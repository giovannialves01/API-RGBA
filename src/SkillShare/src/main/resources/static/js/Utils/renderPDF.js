/**
 * Necessita da biblioteca da Mozilla <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> para funcionar 
 * @param {BinaryType} pdf - conteúdo do PDF retornado do java
 * @param {String} idCanvas - id do canvas que vai renderizar o PDF na tela
 * @param {String} idPaginaAtual - id do elemento que vai exibir a página atual do PDF
 * @param {String} idTotalPagina - id do elemento que vai exibir o total de páginas do pdf
 * @param {String} idBtnAnt - id do botão para avançar página
 * @param {String} idBtnProx - id do botão para retornar a página anterior do PDF
 */
 function renderPDF(pdf,idCanvas,idPaginaAtual,idTotalPagina,idBtnAnt,idBtnProx){
    var pdfData = atob(pdf);
    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.getElementById(idCanvas),
        ctx = canvas.getContext('2d');

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          pageRendering = false;
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });

      // Update page counters
      document.getElementById(idPaginaAtual).textContent = num;
    }

    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    /**
     * Displays previous page.
     */
    function onPrevPage() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      queueRenderPage(pageNum);
    }
    document.getElementById(idBtnAnt).addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    }
    document.getElementById(idBtnProx).addEventListener('click', onNextPage);

    /**
     * Asynchronously downloads PDF.
     */
    pdfjsLib.getDocument({data: pdfData}).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById(idTotalPagina).textContent = pdfDoc.numPages;

      // Initial/first page rendering
      renderPage(pageNum);
    });
} 
