
let contenedorFrutas = document.getElementById("contenedor")

function crearTarjeta(movies){
    const articulo = document.createElement("article")
    articulo.classList.add("miniTarjeta") 

    const foto = document.createElement("img")
    foto.setAttribute("src", movies.image)
    foto.setAttribute("alt", "foto de " + movies.title)

    const h2 = document.createElement("h2")
    h2.textContent = movies.title  

    console.log(h2)

    const h3 = document.createElement("h3")
    h3.textContent = movies.tagline  

    const parrafoCard = document.createElement("p")
    parrafoCard.textContent = movies.overview

    articulo.append(foto, h2, h3, parrafoCard)

    return articulo
}

let referenciaContenedor = document.getElementById("contenedor")

console.log(crearTarjeta(movies[0]))

function generarTarjeta (movies, elemento, funcion){
   
    for (const iterator of movies) {
        const nuevoArticulo = funcion(iterator)
        elemento.appendChild( nuevoArticulo )    
    }
}
generarTarjeta(movies, referenciaContenedor , crearTarjeta)

for (const element of "object") {
    console.log(element)
}