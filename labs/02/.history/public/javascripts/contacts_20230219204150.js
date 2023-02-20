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
    var 
    let editBtns = document.getElementsByClassName("editBtn");

    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', editHandler, false);
    }

    
};

const editHandler = () => {
    var attribute = this.getAttribute("data-id");
    console.log(attribute);
}