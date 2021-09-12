//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
redirigirAlLogin();

var producto;

function mostrarProducto(producto){
    
   document.getElementById("productName").innerHTML = producto.name;
   document.getElementById("productDescription").innerHTML = producto.description;
   document.getElementById("productCategory").innerHTML = producto.category;
   document.getElementById("productCost").innerHTML = producto.cost + ` ` + producto.currency;
   document.getElementById("productSoldCount").innerHTML = producto.soldCount;
   document.getElementById("productImages").innerHTML = producto.images;

};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL+"/"+id+".json").then(function (resultado) {
        if (resultado.status === "ok") {
            resultado.data.forEach(producto => {
                if(producto.id == JSON.parse(localStorage.getItem("producto")).productoId){
            producto = resultado.data
        mostrarProducto(producto);
        }
        });
        };
    });
});
            
 // ENLACES:
  // https://francissilvera.github.io/e-mercado/js/productos-info/1.json
  // https://francissilvera.github.io/e-mercado/js/productos-info/2.json
  // https://francissilvera.github.io/e-mercado/js/productos-info/3.json
  // https://francissilvera.github.io/e-mercado/js/productos-info/4.json