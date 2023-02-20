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

    let editBtns = document.getElementsByClassName("editBtn");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', myFunction, false);
    }

    editBtns.addEventListener("click",)
};