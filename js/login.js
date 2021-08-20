//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById("submit").addEventListener("click", function() {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === "") {
            camposCompletos = false;
            inputEmail.classList.add("invalid");
        }
        else {
            inputEmail.classList.remove("invalid");
        } 
        if (inputPassword.value === "") {
            camposCompletos = false;
            inputPassword.classList.add("invalid");
        }
        else {
            inputPassword.classList.remove("invalid");
        } 

        if (camposCompletos) {
            window.location = "inicio.html"
        }
        else {
            alert("¡Debes ingresar todos tus datos!")
        }
})});  
