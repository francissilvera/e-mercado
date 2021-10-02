//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submit").addEventListener("click", function () {

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
            localStorage.setItem("UserLogged", JSON.stringify({ email: inputEmail.value })); //Al valor contenido en el input "email" (lo que el usuario escribió en el campo del email) se lo transforma en un JSON para poder guardarlo como un string. En LocalStorage se le da un nombre ("User-Logged") y se guarda el JSON como su valor (mediante el método "setItem" de localStorage).
            window.location = "index.html";
        }
        else {
            document.getElementById("alerta").innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show mt-0" role="alert">
                <strong>¡Recuerda ingresar todos tus datos!</strong>
             </div>`
        }
    })
});
