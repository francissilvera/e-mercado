//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

redirigirAlLogin();

document.addEventListener("DOMContentLoaded", function(e){

});

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
  <td><h5><input type="number" class="form-control" id="cantidad${i}" value="${articulo.count}" aria-label="" aria-describedby="basic-addon2" 
  min="1" max="10" onchange="calcSubtotal(${articulo.unitCost}, ${i})"></h5></td>
  <td><h5>${articulo.unitCost}</h5><span>${articulo.currency}</span></td>
  <td><h5 id="artSubtotal${i}" class="subtotal">${sub}</h5><span>${articulo.currency}</span></td>
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

};

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO).then(function (resultado) {
        if (resultado.status === "ok") {
            productosCarrito = resultado.data;

            mostrarCarrito(productosCarrito);
        }
    }
    )
});

/* PARA PRÓXIMAS ENTREGAS

document.getElementById("botonComprar").addEventListener("click", function (e) {

  document.getElementById("alerta").innerHTML= `
  <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">¡Has ralizado tu compra con éxito!</h4>
  <p>Ya puedes seguir navegando por nuestro sitio</p>
  <hr>
<button type="button" class="btn btn-light" onclick=window.location="products.html">Ver otros productos</button>
</div>`

document.getElementById("total").innerHTML = "";
document.getElementById("subtotal").innerHTML = "";
document.getElementById("carrito").innerHTML = "";

});

*/