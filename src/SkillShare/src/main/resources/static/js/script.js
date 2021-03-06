function showModal() {
    let modal = document.getElementById("modalMenu");
    let modalContent = document.getElementById("modalContent");
    
    modal.style.display = "block";

    modalContent.onanimationend = function() {
        modal.style.display = "block";
        modalContent.classList.remove("animate");

    }
    
}

function hideModal() {
    let modal = document.getElementById("modalMenu");
    let modalContent = document.getElementById("modalContent");

    modalContent.classList.add("animate");

    modalContent.onanimationend = function() {
        modal.style.display = "none";
        modalContent.classList.remove("animate");

    }

}
