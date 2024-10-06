document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    //display success message upon submission
    document.getElementById("successMessage").style.display = "block";
});

