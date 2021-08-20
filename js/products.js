//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productosArray = [];

function mostrarProductos(array) {

    let contenido = "<br>";

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        contenido += ` 
        <div class="row">
                    <div class="col-3"> 
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <p class="mb-1">` + producto.cost + ` USD </p>
                    </div>
                </div>`
    }

    document.getElementById("productos").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productosArray = resultado.data;

            mostrarProductos(productosArray);
        }
    }
    )
});
