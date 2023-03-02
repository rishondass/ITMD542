window.onload = (event) => {
    let createModalBtn = document.getElementById("createContactBtn");
    let modal = document.getElementById("createContactModal");
    let closeModalBtn = document.getElementById("closeContactModalBtn");
    createModalBtn.addEventListener("click", (e) =>{
        

        modal.classList.toggle('hidden');
    });

    

    closeModalBtn.addEventListener('click', (e) =>{
        modal.classList.toggle
    });
};