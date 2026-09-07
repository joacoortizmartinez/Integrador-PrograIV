const catalogo = document.getElementById("catalogo");
const listaLibros = document.getElementById("lista-libros");
const formularioAgregar = document.getElementById("form-agregar-libro");
const genero = document.getElementById("genero-buscar");
const buscador = document.getElementById("titulo-buscar");
let ultimoId = 0;

function crearTarjeta(libro){
    return `<article class="tarjeta-libro ${libro.favorito ? "fav" : ""}">
                <h3> ${libro.titulo} </h3>
                <p> Id: ${libro.id}</p>
                <p> Autor: ${libro.autor}</p>
                <p> Genero: ${libro.genero}</p>
                <p> Año: ${libro.anio}</p>
                <label for="favorito"> Marcar como fav </label>
                <input type="checkbox" class="checkbox-favorito" data-id="${libro.id}">
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

function cargarGeneros(libros){
    const generos = new Set();

    libros.forEach(function(libro){
        generos.add(libro.genero);
        
        
    });

    generos.forEach(function(g){
            genero.innerHTML += `<option value="${g}">${g}</option>`;
        });
};

cargarGeneros(libros);


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
        "disponible": true,
        "favorito": false
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


listaLibros.addEventListener("change", function(evento) {
    if (evento.target.classList.contains("checkbox-favorito")) {
        
        const id = Number(evento.target.dataset.id);

        const libro = libros.find(function(libro) {
            return libro.id === id;
        });

        

        const tarjeta = evento.target.parentElement;

        if (evento.target.checked) {
            libro.favorito = true;
            tarjeta.classList.add("fav");
        } else {
            libro.favorito = false;
            tarjeta.classList.remove("fav");
        }

        localStorage.setItem("libros", JSON.stringify(libros));
    }
});