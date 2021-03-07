function showModal() {
    let modal = document.getElementById("modalMenu");
    let modalContent = document.getElementById("modalContent");
    
    modal.style.display = "block";

    modalContent.classList.add("showModal");
    modalContent.classList.remove("hideModal");

    modalContent.onanimationend = function() {
        modal.style.display = "block";

    }
    
}

function hideModal() {
    let modal = document.getElementById("modalMenu");
    let modalContent = document.getElementById("modalContent");

    modalContent.classList.add("hideModal");
    modalContent.classList.remove("showModal");

    modalContent.onanimationend = function() {
        modal.style.display = "none";

    }

}

window.onclick = function(event) {
    let modal = document.getElementById("modalMenu");

    if (event.target == modal) {
      hideModal();

    }

}
