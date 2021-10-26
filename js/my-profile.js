//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
redirigirAlLogin();

document.getElementById("guardarDatos").addEventListener("click", function () {

    localStorage.setItem("PrimerNombre", JSON.stringify({nombre: nombre1.value}));

    localStorage.setItem("SegundoNombre", JSON.stringify({nombre: nombre2.value}));

    localStorage.setItem("PrimerApellido", JSON.stringify({apellido: apellido1.value}));

    localStorage.setItem("SegundoApellido", JSON.stringify({apellido: apellido2.value}));

    localStorage.setItem("Edad", JSON.stringify({edad: edad.value}));

    localStorage.setItem("Correo", JSON.stringify({correo: correo.value}));

    localStorage.setItem("Telefono", JSON.stringify({telefono: telContacto.value}));

});

document.addEventListener("DOMContentLoaded", function(e){

    // ALMACENAR DATOS DE LOS NOMBRES //

    let nombre1Guardado = localStorage.getItem("PrimerNombre");
    let inputNombre1 = document.getElementById("nombre1");

    nombre1Guardado = JSON.parse(nombre1Guardado);
    inputNombre1.value = nombre1Guardado.nombre;

    let nombre2Guardado = localStorage.getItem("SegundoNombre");
    let inputNombre2 = document.getElementById("nombre2");
  
    nombre2Guardado = JSON.parse(nombre2Guardado);
    inputNombre2.value = nombre2Guardado.nombre;;

    // ALMACENAR DATOS DE LOS APELLIDOS //

    let apellido1Guardado = localStorage.getItem("PrimerApellido");
    let inputApellido1 = document.getElementById("apellido1");

    apellido1Guardado = JSON.parse(apellido1Guardado);
    inputApellido1.value = apellido1Guardado.apellido;

    let apellido2Guardado = localStorage.getItem("SegundoApellido");
    let inputApellido2 = document.getElementById("apellido2");

    apellido2Guardado = JSON.parse(apellido2Guardado);
    inputApellido2.value = apellido2Guardado.apellido;

    // ALMACENAR DATOS DE LA EDAD //

    let edadGuardada = localStorage.getItem("Edad");
    let inputEdad = document.getElementById("edad");

    edadGuardada = JSON.parse(edadGuardada );
    inputEdad.value = edadGuardada.edad;

    // ALMACENAR DATOS DEL CORREO //
    
    let correoGuardado = localStorage.getItem("Correo");
    let inputCorreo = document.getElementById("correo");

    correoGuardado = JSON.parse(correoGuardado);
    inputCorreo.value = correoGuardado.correo;

    // ALMACENAR DATOS DEL TELEFONO //

    let telGuardado = localStorage.getItem("Telefono");
    let inputTel = document.getElementById("telContacto");

    telGuardado = JSON.parse(telGuardado);
    inputTel.value = telGuardado.telefono;

  });
  
  document.getElementById("cerrarSesion").addEventListener("click", function () {

    localStorage.removeItem("PrimerNombre");
    localStorage.removeItem("SegundoNombre");
    localStorage.removeItem("PrimerApellido");
    localStorage.removeItem("SegundoApellido");
    localStorage.removeItem("Edad");
    localStorage.removeItem("Correo");
    localStorage.removeItem("Telefono");

  });
