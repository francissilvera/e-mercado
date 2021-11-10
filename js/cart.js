//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

redirigirAlLogin();

const CART_INFO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

function mostrarCarrito(productos) {

    let contenido = "";

for (let i = 0; i < productos.articles.length; i++) {

    let articulo = productos.articles[i]; 

    let sub = articulo.unitCost * articulo.count

  contenido += `
  </tr>
  <td><img src=${articulo.src} alt="" width="150px"></td>
  <td><h5>${articulo.name}</h5></td>
  <td><h5><input type="number" class="form-control cant" id="cantidad${i}" value="${articulo.count}" aria-label="" aria-describedby="basic-addon2" 
  min="1" max="10" onchange="calcSubtotal(${articulo.unitCost}, ${i})"></h5></td>
  <td><div class="row"><h5>${articulo.unitCost}</h5><h5>${articulo.currency}</h5></div></td>
  <td><div class="row"><h5 id="artSubtotal${i}" class="subtotal">${sub}</h5><h5>${articulo.currency}</h5></div></td>
</tr>` 

document.getElementById("carrito").innerHTML = contenido;

if (articulo.currency === "USD") {
  let element = document.getElementById(`artSubtotal${i}`)
  element.classList.add("dolares");
};
};

calcTotal();

};

function calcSubtotal(costo, i) {
  let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
  subtotal = cantidad * costo;
  document.getElementById(`artSubtotal${i}`).innerHTML = subtotal;
  
  calcTotal();
}

function calcTotal() {
  let total = 0;
  let subtotales = document.getElementsByClassName("subtotal");

  for (let i=0; i < subtotales.length; i++) {

    let resultado = parseInt(subtotales[i].innerHTML) 

    if (subtotales[i].classList.contains("dolares")) {
      resultado *= 40;
    };

    total += resultado;

  };
   
  document.getElementById("total").innerHTML = total + `<span> UYU </span>`;
  document.getElementById("subtotal").innerHTML = total + `<span> UYU </span>`;
  calcEnvio() 

};

function calcEnvio() {
  let total = parseInt(document.getElementById("subtotal").innerHTML);
  let envio;

  let elements = document.getElementsByName("inputEnvio");
    for (var i=0; i < elements.length; i++) {
      if (elements[i].checked){
        envio = parseInt(total*(elements[i].value)/100);
      };
    };

    let totalConEnvio = total + envio;

    document.getElementById("totalEnvio").innerHTML = envio + ` UYU`;
    document.getElementById("total").innerHTML = totalConEnvio + ` UYU`;
};

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO).then(function (resultado) {
        if (resultado.status === "ok") {
            productosCarrito = resultado.data;

            mostrarCarrito(productosCarrito);
            calcEnvio();
        }
    }
    )
});

let elements = document.getElementsByName("inputEnvio");
for (var i=0; i < elements.length; i++) {
  elements[i].addEventListener("change", function(e){
    calcEnvio()
});
};


///////////////// DESHABILITAR OPCIONES MODAL /////////////////

document.addEventListener("change", function (e) {

  let opcionTarjeta = document.getElementById("tarjetaDeCredito")
  let opcionTransferencia = document.getElementById("transferenciaBancaria")
  let inputNumCuenta = document.getElementById("numCuenta")
  let inputNumTarjeta = document.getElementById("numTarjeta")
  let inputCVV = document.getElementById("CVV")
  let inputVencimiento = document.getElementById("vencimiento")


  if (opcionTarjeta.checked) {
    inputNumCuenta.disabled=true;
    inputNumCuenta.value="";
    inputNumTarjeta.disabled=false;
    inputCVV.disabled=false;
    inputVencimiento.disabled=false;
  };

  if (opcionTransferencia.checked) {
    inputNumTarjeta.disabled=true;
    inputNumTarjeta.value="";
    inputCVV.disabled=true;
    inputCVV.value="";
    inputVencimiento.disabled=true;
    inputVencimiento.value="";
    inputNumCuenta.disabled=false;
  }

});

function validarCampos () {

  let pais = document.getElementById("pais");
  let ciudad = document.getElementById("ciudad");
  let calle = document.getElementById("calle");
  let esquina = document.getElementById("esquina");
  let numero = document.getElementById("numPuerta");

  let opcionTarjeta = document.getElementById("tarjetaDeCredito");
  let numTarjeta = document.getElementById("numTarjeta");
  let vencimiento = document.getElementById("vencimiento");
  let CVV = document.getElementById("CVV");

  let opcionTransferencia = document.getElementById("transferenciaBancaria");
  let numCuenta = document.getElementById("numCuenta");

  let cantidadProductos = document.getElementsByClassName("cant");
  
    
    if (pais.value === "" || ciudad.value === "" || calle.value === "" || esquina.value === "" || numero.value === "") {
        let divDireccion = document.getElementById("validarDireccion")
        divDireccion.classList.add("was-validated")
        alert("faltan datos de la dirección");
      }

      else if (!opcionTransferencia.checked && !opcionTarjeta.checked){
        document.getElementById("feedback").innerHTML= `<br>Debe seleccionar una forma de pago`
        alert("falta la forma de pago")
          }

        else if ((opcionTarjeta.checked) && (numTarjeta.value === "" || vencimiento.value === "" || CVV.value === "")){
          let divPago = document.getElementById("validarPago")
          divPago.classList.add("was-validated")
         alert("faltan datos de la tarjeta")
        }

        else if ((opcionTransferencia.checked) && (numCuenta.value === "")){
          let divPago = document.getElementById("validarPago")
          divPago.classList.add("was-validated")
          alert("faltan datos de la transferencia")
          }

            else if (cantidadProductos.value === ""){
              alert("debe completar la cantidad de productos") // esta es la que no funciona
                }

              else {
                document.getElementById("alerta").innerHTML= `
                <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">¡Has ralizado tu compra con éxito!</h4>
                <p>Ya puedes seguir navegando por nuestro sitio</p>
                <hr>
                <button type="button" class="btn btn-light" onclick= window.location="products.html">Ver otros productos</button>
                </div>`
      
      document.getElementById("total").innerHTML = "";
      document.getElementById("subtotal").innerHTML = "";
      document.getElementById("totalEnvio").innerHTML = "";
      document.getElementById("carrito").innerHTML = "";
      document.getElementById("pais").value = "";
      document.getElementById("ciudad").value = "";
      document.getElementById("calle").value = "";
      document.getElementById("esquina").value ="";
      document.getElementById("numPuerta").value = "";
      
  }
};

document.getElementById("botonComprar").addEventListener("click", function (e){
  validarCampos();
});



/* ///////////////// VALIDAR MODAL /////////////////

let form = document.getElementById("needs-validation");

form.addEventListener('submit', function(e){
  if (form.checkValidity() === false){
    e.preventDefault();
    e.stopPropagation();
  }
  else
  form.classList.add('was-validated');
});
*/