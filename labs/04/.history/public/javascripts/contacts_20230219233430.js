window.onload = (event) => {
    let createModalBtn = document.getElementById("createContactBtn");
    let modal = document.getElementById("createContactModal");
    let closeModalBtn = document.getElementById("closeContactModalBtn");

    createModalBtn.addEventListener("click", (e) =>{
        modal.classList.toggle('hidden');
    });

    closeModalBtn.addEventListener('click', (e) =>{
        modal.classList.toggle('hidden');
    });


    

    let viewBtns = document.getElementsByClassName("viewBtn");

    var viewHandler = function(){
        var attribute = this.getAttribute("data-id");
        //window.location.replace(`/contacts/edit/${attribute}`);
        window.location.replace(`/contacts/edit/${attribute}`);
    }

    for (var i = 0; i < viewBtns.length; i++) {
        viewBtns[i].addEventListener('click', viewHandler, false);
    }

    
};

