// JavaScript (main.js)

// Arreglo para almacenar los libros
let libros = [];

// Función para renderizar la lista de libros
function renderizarListaLibros() {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `Título: ${libro.titulo}, Autor: ${libro.autor}`;

        listaLibros.appendChild(li);
    });
}

// Función para cargar libros desde el archivo JSON
function cargarLibros() {
    fetch('libros.json')
        .then(response => response.json())
        .then(data => {
            libros = data;
            renderizarListaLibros();
        })
        .catch(error => console.error('Error al cargar el archivo JSON', error));
}

// Función para agregar un nuevo libro al arreglo y al JSON
function agregarLibro() {
    const inputTitulo = document.getElementById('tituloLibro');
    const inputAutor = document.getElementById('autorLibro');

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();

    if (titulo !== '' && autor !== '') {
        const nuevoLibro = {
            titulo: titulo,
            autor: autor,
        };

        libros.push(nuevoLibro);
        renderizarListaLibros();
        guardarLibrosEnJson(); 
    }

    inputTitulo.value = '';
    inputAutor.value = '';
}

// Función para guardar los libros en el archivo JSON
function guardarLibrosEnJson() {
    const jsonLibros = JSON.stringify(libros, null, 2);

    fetch('libros.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonLibros,
    })
        .then(response => response.json())
        .catch(error => console.error('Error al guardar el archivo JSON', error));
}

// Función para consultar y mostrar el JSON de libros
function consultarLibros() {
    const jsonContainer = document.getElementById('jsonContainer');
    jsonContainer.style.display = 'block';

    const jsonLibros = document.getElementById('jsonLibros');
    jsonLibros.textContent = JSON.stringify(libros, null, 2);
}

// Inicializar la lista de libros
cargarLibros();

// Evento al hacer clic en el botón "Agregar Libro"
document.getElementById('agregarLibro').addEventListener('click', agregarLibro);

// Evento al hacer clic en el botón "Consultar Libros"
document.getElementById('consultarLibros').addEventListener('click', consultarLibros);

