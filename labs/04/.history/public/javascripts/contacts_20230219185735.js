window.onload = (event) => {
    let createModalBtn = document.getElementById("createContactBtn");
    let modal = document.getElementById("createContactModal");
    createModalBtn.addEventListener("click", (e) =>{
        

        modal.classList.toggle('hidden');
    });

    let closeModalBtn = document.getElementById("closeContactModalBtn");

    closeModalBtn.addEventListener('click', (e) =>{
        modal.classList.toggle
    });
};