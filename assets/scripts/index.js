const contenedor = document.getElementById("contenedor");
const inputBuscador = document.getElementById("buscador");
const filtroGenero = document.getElementById("filtroGenero");

// Crear tarjeta
function crearTarjeta(pelicula) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "bg-white rounded-lg shadow-md overflow-hidden w-60 text-center transition-transform hover:scale-105 hover:shadow-xl";

  const img = document.createElement("img");
  img.src = pelicula.image;
  img.alt = `Imagen de ${pelicula.title}`;
  img.className = "w-full h-40 object-contain bg-white";

  const titulo = document.createElement("h3");
  titulo.textContent = pelicula.title;
  titulo.className = "text-black text-md font-bold mt-2";

  const tagline = document.createElement("h4");
  tagline.textContent = pelicula.tagline || "";
  tagline.className = "text-gray-600 text-sm italic mb-1";

  const descripcion = document.createElement("p");
  descripcion.textContent = pelicula.overview;
  descripcion.className = "text-gray-700 text-xs px-2 mb-3 line-clamp-3";

  tarjeta.append(img, titulo, tagline, descripcion);
  return tarjeta;
}

// Generar tarjetas
function generarTarjetas(listaPeliculas, elemento, funcionCrear) {
  elemento.innerHTML = "";

  if (listaPeliculas.length == 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "The film is not in our catalog.";
    mensaje.className = "text-white text-center text-xl";
    elemento.appendChild(mensaje);
  } else {
    const fragmento = document.createDocumentFragment();
    for (const pelicula of listaPeliculas) {
      const nuevaTarjeta = funcionCrear(pelicula);
      fragmento.appendChild(nuevaTarjeta);
    }
    elemento.appendChild(fragmento);
  }
}

// Función para obtener todos los géneros
function obtenerGeneros(movies) {
  const generos = new Set();
  movies.forEach(p => p.genres.forEach(g => generos.add(g)));
  return Array.from(generos).sort();
}

// Llenar el select géneros
function cargarOpcionesGenero() {
  const generos = obtenerGeneros(movies);
  generos.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero;
    option.textContent = genero;
    filtroGenero.appendChild(option);
  });
}

// Filtro 
function filtrarPeliculas() {
  const texto = inputBuscador.value.toLowerCase().trim();
  const generoSeleccionado = filtroGenero.value;

  const filtradas = movies.filter(pelicula => {
    const coincideTitulo = pelicula.title.toLowerCase().includes(texto);
    const coincideGenero = generoSeleccionado === "" || pelicula.genres.includes(generoSeleccionado);
    return coincideTitulo && coincideGenero;
  });

  generarTarjetas(filtradas, contenedor, crearTarjeta);
}

inputBuscador.addEventListener("input", filtrarPeliculas);
filtroGenero.addEventListener("change", filtrarPeliculas);

cargarOpcionesGenero();
generarTarjetas(movies, contenedor, crearTarjeta);