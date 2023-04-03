window.onload = (event) => {
    let createModalBtn = document.getElementById("createContactBtn");

    createModalBtn.addEventListener("click", (e) =>{
        let modal = document.getElementById("createContactModal");

        modal.classList.toggle('hidden');
    });

    let closeModalBtn = document.getElementById
};