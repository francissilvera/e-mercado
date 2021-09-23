//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
redirigirAlLogin();

var producto;
var comentariosArray = [];
let PRODUCTO_INFO_URL;

let idProducto = JSON.parse(localStorage.getItem("producto")).productoId

const TODOS_LOS_URL=[
  {id:1, link:"https://francissilvera.github.io/e-mercado/js/productos-info/1.json"},
  {id:2, link:"https://francissilvera.github.io/e-mercado/js/productos-info/2.json"},
  {id:3, link:"https://francissilvera.github.io/e-mercado/js/productos-info/3.json"},
  {id:4, link:"https://francissilvera.github.io/e-mercado/js/productos-info/4.json"}
];

function filtrarProducto(id){
  for(let i=0; i<TODOS_LOS_URL.length;i++){
    if(id===TODOS_LOS_URL[i].id){
      PRODUCTO_INFO_URL=TODOS_LOS_URL[i].link;
    }
  }
}

function mostrarProducto(producto){

  document.getElementById("productName").innerHTML = producto.name
  document.getElementById("productDescription").innerHTML = producto.description
  document.getElementById("productCategory").innerHTML = producto.category
  document.getElementById("productCost").innerHTML = producto.category
  document.getElementById("productCost").innerHTML = producto.cost + ` ` + producto.currency;
  document.getElementById("productSoldCount").innerHTML = producto.soldCount;


  let cajaImagenes = document.getElementById("productImages");
  let imagenes = "";
  
  for (let i=0; i<producto.images.length; i++) {
    imagenes +=`
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="${producto.images[i]}" alt="">
          </div>
        </div>`
  }

  cajaImagenes.innerHTML += imagenes;

}; 

function mostrarComentarios(comentarios) {

    let contenido="";
    let cajaComentarios = document.getElementById("cat-list-container");
    

    for(let i=0; i<comentarios.length; i++){
        let comentario = comentarios[i];

        contenido += 
        `
        <div class="list-group-item">
          <div class="d-flex w-100 justify-content-between">
          <h6> <strong style="color: coral">`+ comentario.user +`</strong>  dice:</h6>
          <small class="text-muted">`+ comentario.dateTime +`</small>
        </div><br>
            <p>`+ comentario.description +`</p>
            <div class="rating" style="text-align: right"> `+ mostrarRating(comentario.score) + `
         </div>
         </div>`
      
      }

    cajaComentarios.innerHTML = contenido;


  function mostrarRating (puntos) {

     let estrellas = "";
  
     for(let i=0; i<5; i++){

      if(i<puntos){
          estrellas += `<span class="fa fa-star checked"></span>`
      } 
    };
      return estrellas;

    };
  };

  function mostrarProductosRelacionados(arrayProductos) {

    for (let i=0; i<arrayProductos.relatedProducts.length; i++) {
      let producto = arrayProductos[i];

      if (producto.relatedProducts===1) {
        document.getElementById("relatedProducts").innerHTML = producto[1].name;
      }
    }
  };

document.addEventListener("DOMContentLoaded", function(e){

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
    if (result.status === "ok") {
        comentariosArray = result.data;
    }

    filtrarProducto(idProducto);
    getJSONData(PRODUCTO_INFO_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            producto = resultado.data;
        }
    getJSONData(PRODUCTS_URL).then(function(resultado){
        if (resultado.status === "ok") {
          arrayProductos = resultado.data; 
        }
   
        mostrarProducto(producto);
        mostrarProductosRelacionados(arrayProductos);
        mostrarComentarios(comentariosArray);
      });
    });
});
});

document.getElementById("enviarComentario").addEventListener("click", function() {
  let newComment = {
    score: getRating(),
    description: document.getElementById("nuevoComentario").value,
    user: JSON.parse(localStorage.getItem("UserLogged")).email,
    dateTime: Date()
  };

comentariosArray.push(newComment);
mostrarComentarios(comentariosArray);
document.getElementById("nuevoComentario").value="";

});
