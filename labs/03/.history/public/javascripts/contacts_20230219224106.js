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

    var editHandler = function(){
        var attribute = this.getAttribute("data-id");
        console.log(attribute);
        fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', editHandler, false);
    }

    
};

