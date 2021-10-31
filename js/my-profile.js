//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
redirigirAlLogin();

document.getElementById("guardarDatos").addEventListener("click", function () {

  localStorage.setItem("PrimerNombre", JSON.stringify({ nombre: nombre1.value }));

  localStorage.setItem("SegundoNombre", JSON.stringify({ nombre: nombre2.value }));

  localStorage.setItem("PrimerApellido", JSON.stringify({ apellido: apellido1.value }));

  localStorage.setItem("SegundoApellido", JSON.stringify({ apellido: apellido2.value }));

  localStorage.setItem("Edad", JSON.stringify({ edad: edad.value }));

  localStorage.setItem("Correo", JSON.stringify({ correo: correo.value }));

  localStorage.setItem("Telefono", JSON.stringify({ telefono: telContacto.value }));

  document.getElementById("alerta").innerHTML = `
  <div class="alert alert-success" role="alert">
  ¡Sus datos personales han sido guardados con éxito!
  </div>`

});

document.addEventListener("DOMContentLoaded", function (e) {

  // NOMBRES //

  let nombre1Guardado = localStorage.getItem("PrimerNombre");
  let inputNombre1 = document.getElementById("nombre1");

  nombre1Guardado = JSON.parse(nombre1Guardado);
  inputNombre1.value = nombre1Guardado.nombre;

  let nombre2Guardado = localStorage.getItem("SegundoNombre");
  let inputNombre2 = document.getElementById("nombre2");

  nombre2Guardado = JSON.parse(nombre2Guardado);
  inputNombre2.value = nombre2Guardado.nombre;;

  // APELLIDOS //

  let apellido1Guardado = localStorage.getItem("PrimerApellido");
  let inputApellido1 = document.getElementById("apellido1");

  apellido1Guardado = JSON.parse(apellido1Guardado);
  inputApellido1.value = apellido1Guardado.apellido;

  let apellido2Guardado = localStorage.getItem("SegundoApellido");
  let inputApellido2 = document.getElementById("apellido2");

  apellido2Guardado = JSON.parse(apellido2Guardado);
  inputApellido2.value = apellido2Guardado.apellido;

  // EDAD //

  let edadGuardada = localStorage.getItem("Edad");
  let inputEdad = document.getElementById("edad");

  edadGuardada = JSON.parse(edadGuardada);
  inputEdad.value = edadGuardada.edad;

  // CORREO //

  let correoGuardado = localStorage.getItem("Correo");
  let inputCorreo = document.getElementById("correo");

  correoGuardado = JSON.parse(correoGuardado);
  inputCorreo.value = correoGuardado.correo;

  // TELEFONO //

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
  localStorage.removeItem("Imagen");

});

function mostrarFoto() {
  let foto = document.getElementById("foto");
  let archivo = document.getElementById("inputFile").files[0];

  let reader = new FileReader();

  reader.onload = function () {
    foto.src = reader.result;
  }

  if (archivo) {
    reader.readAsDataURL(archivo);
  }
  else {
    foto.src = "img/avatar.png"
  }
};

function guardarImagen() {

  let foto = document.getElementById("foto");

  localStorage.setItem("Imagen", JSON.stringify(foto.src));
};

document.addEventListener("DOMContentLoaded", () => {

  let foto = document.getElementById("foto");
  let imagen = JSON.parse(localStorage.getItem("Imagen"));

  if (imagen != null) {
    foto.src = imagen;
  }
  else {
    foto.src = "img/avatar.png";
  }
});
