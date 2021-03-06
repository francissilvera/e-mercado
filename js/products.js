//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

redirigirAlLogin();

var productosArray = [];

var minCost;
var maxCost;


function verProducto(id) {
    localStorage.setItem("producto", JSON.stringify({ productoId: id }));
    window.location = "product-info.html"
}

function sortProductos(criterio, array) {
    let result = [];

    if (criterio == 1) { //Criterio de ordenamiento 1: los elementos del array se ordenan de forma descendente en función del precio (product.cost).
        result = array.sort(
            function (a, b) { //Función de comparación: recibe dos elementos del array como parámetros. Va recorriendo el array comparando pares de elementos entre sí y devolviendo el valor correspondiente (1,-1 o 0) según lo que hayamos determinado como criterio de ordenamiento.
                if (a.cost > b.cost) {
                    return -1;
                }
                if (a.cost < b.cost) {
                    return 1;
                }
                return 0;
            });
    }

    else if (criterio == 2) { //Criterio de ordenamiento 2: los elementos del array se ordenan de forma ascendente en función del precio (product.cost).
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) {
                    return 1;
                }
                if (a.cost < b.cost) {
                    return -1;
                }
                return 0;
            });
    }

    else if (criterio == 3) { //Criterio de ordenamiento 3: los elementos del array se ordenan de forma descendente en función de la relevanacia; en este caso, la relevancia se mide según la cantidad de artículos vendidos (product.soldCount)
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) {
                    return -1;
                }
                if (a.soldCount < b.soldCount) {
                    return 1;
                }
                return 0;
            });
    }

    return result;

}

function mostrarProductos(array) {

    let contenido = "<br>";

    let buscar = document.getElementById("buscador").value.toLowerCase();

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))) { //Se cargan solamente aquellos productos que se encuentran dentro del rango de precios definido. Si el usuario no define un rango de precios (minCount == undefined / maxCount == undefined), se le muestran todos los productos.

            if ((buscar == undefined) || (producto.name.toLowerCase().includes(buscar))
                || (producto.description.toLowerCase().includes(buscar))) { //Se cargan solamente aquellos productos cuyo nombre o descripción incluyan la cadena de caracteres ingresada por el usuario en el buscador. Si el usuario no ingresa ningún caracter, se le muestran todos los productos.

                contenido += `<div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card">
                <img class="card-img-top" src="${producto.imgSrc}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${producto.name}</h5>
                  <p class="card-text">${producto.description}</p>
                  <p class="card-text"><small class="text-muted">${producto.soldCount} artículos vendidos</small></p>
                  <p class="card-text">${producto.cost} USD</p>
                  <button type="button" class="btn btn-info" onclick="verProducto(` + producto.id + `)">Ver producto</button>
                </div>
                </div>
                <br>
              </div>`

            }
        }
    }
  
    document.getElementById("productos").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productosArray = resultado.data;

            productosArray = sortProductos(1, productosArray); // Cuando la página carga por primera vez, el listado se ordena por defecto de forma ascendente. 

            mostrarProductos(productosArray);
        }
    }
    )
});

document.getElementById("descendentePrecio").addEventListener("click", function () {
    productosArray = sortProductos(1, productosArray);

    mostrarProductos(productosArray);

});

document.getElementById("ascendentePrecio").addEventListener("click", function () {
    productosArray = sortProductos(2, productosArray);

    mostrarProductos(productosArray);

});

document.getElementById("descendenteRelevancia").addEventListener("click", function () {
    productosArray = sortProductos(3, productosArray);

    mostrarProductos(productosArray);
});

document.getElementById("botonFiltro").addEventListener("click", function () {

    minCost = document.getElementById("rango-min").value;
    maxCost = document.getElementById("rango-max").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }

    else {
        minCost = undefined;
    }


    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost) >= 0)) {
        maxCost = parseInt(maxCost);
    }

    else {
        maxCost = undefined;
    }

    mostrarProductos(productosArray);

});

document.getElementById("botonLimpiar").addEventListener("click", function () {

    document.getElementById("rango-min").value = "";

    document.getElementById("rango-max").value = "";

    minCost = undefined;

    maxCost = undefined;

    mostrarProductos(productosArray);

});

document.getElementById("buscador").addEventListener('input', function () { //El evento input sirve para que la búsqueda sea en tiempo real, ya que dispara el evento en el instante en que apretamos una tecla.

    buscar = document.getElementById("buscador").value.toLowerCase(); //Trae lo que el usuario escribió en el buscador. La función toLowerCase hace que el string ingresado se convierta automáticamente a minúsculas.

    mostrarProductos(productosArray);

});

document.getElementById("limpiarBusqueda").addEventListener("click", function () {

    document.getElementById("buscador").value = "";

    buscar = undefined;

    mostrarProductos(productosArray);

});
