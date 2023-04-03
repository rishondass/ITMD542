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
        window.fe
        window.fetch(url).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log(data);
          }).catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
    }

    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', editHandler, false);
    }

    
};

