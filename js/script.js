const catalogo = document.getElementById("catalogo");
const listaLibros = document.getElementById("lista-libros");
const formularioAgregar = document.getElementById("form-agregar-libro");
const buscador = document.getElementById("titulo-buscar");
let ultimoId = 0;

function crearTarjeta(libro){
    return `<article id="tarjeta-libro">
                <h3> ${libro.titulo} </h3>
                <p> Id: ${libro.id}</p>
                <p> Autor: ${libro.autor}</p>
                <p> Genero: ${libro.genero}</p>
                <p> Año: ${libro.anio}</p>
                <label for="favorito"> Marcar como fav </label>
                <input type="checkbox" name="favorito" id="favorito">
            </article>
            `;
} 

function mostrarLibros(librosAMostrar) {
    listaLibros.innerHTML = "";

    librosAMostrar.forEach(function (libro) {
        listaLibros.innerHTML += crearTarjeta(libro);
        ultimoId = libro.id;
    });
}

mostrarLibros(libros);

formularioAgregar.addEventListener("submit", function(evento){
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const anio = document.getElementById("anio").value;
    const autor = document.getElementById("autor").value;
    ultimoId = ultimoId + 1;

    const libroNuevo = {
        "id": ultimoId,
        "titulo": titulo, 
        "autor": autor, 
        "genero": genero, 
        "anio": anio, 
        disponible: true,
    };
    libros.push(libroNuevo);

    localStorage.setItem("libros", JSON.stringify(libros));

    mostrarLibros(libros);

    formularioAgregar.reset();
});

buscador.addEventListener("input", function(evento){
    const textoBuscado = document.getElementById("titulo-buscar").value.toLowerCase();

    const librosFiltrados = libros.filter(function(libro){
        return libro.titulo.toLowerCase().includes(textoBuscado)
            || libro.autor.toLowerCase().includes(textoBuscado);
    });

    mostrarLibros(librosFiltrados);
});

