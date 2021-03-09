class PageController{
    constructor(){
        this.setModalBehaviour();

    }

    showModal(modalIdentifier) {
        let modal = document.getElementById("modalMenu-" + modalIdentifier);
        let modalContent = document.getElementById("modalContent-" + modalIdentifier);
        
        modal.style.display = "block";
    
        modalContent.classList.add("showModal");
        modalContent.classList.remove("hideModal");
    
        modalContent.onanimationend = function() {
            modal.style.display = "block";
    
        }
        
    }
    
    hideModal(modalIdentifier) {
        let modal = document.getElementById("modalMenu-" + modalIdentifier);
        let modalContent = document.getElementById("modalContent-" + modalIdentifier);
    
        modalContent.classList.add("hideModal");
        modalContent.classList.remove("showModal");
    
        modalContent.onanimationend = function() {
            modal.style.display = "none";
    
        }
    
    }
    
    setModalBehaviour(){
        window.onclick = function(event) {
            let modals = document.getElementsByClassName("modalBackground");
        
            for (let i = 0; i < modals.length; i++) {
                const modal = modals[i];
                
                if (event.target == modal) {
                    let identifier = modal.id.split("-")[1];
        
                    pageController.hideModal(identifier);
              
                  }
        
            }
        
        }

    }

}

var pageController = new PageController();
