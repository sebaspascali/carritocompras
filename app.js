// Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const variarCarritoBtn = document.querySelector ('#vaciar-carrito');
const listaCursos = document.querySelector ('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    // Cuando agregas un curso apretando "agregar carrito"
    listaCursos.addEventListener ('click', agregarCurso);

    //emiliminar cursos del carrito
    
    carrito.addEventListener('click', eliminarCurso);

    variarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        LimpiarHTML();
    })
}

// Funciones

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

// Elimina cursos del carrito 

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId); 
        
        carritoHTML();
    }
}

function leerDatosCurso(curso) {
  //console.log(curso);

  //objeto contenido curso
  const infoCurso = {
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector ('.precio span').textContent,
      id:curso.querySelector ('a').getAttribute('data-id'),
      cantidad: 1
  }

  // Sumar curso 1 x 1 

  const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
  if(existe) {

    // actualizar cantidaad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
               curso.cantidad++;
               return curso;
            } else {
                return curso;
            }

        } );
        articulosCarrito = [...cursos];
    } else {
          // Agrega elementos al arreglo de carrito
     articulosCarrito = [...articulosCarrito, infoCurso];

    }
  
      

  
  

  

  console.log(articulosCarrito);

  carritoHTML();
}

// mUestra carrito compra html

function carritoHTML() {

    // Limpiar el HTML
    LimpiarHTML();

    // recorre carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td> ${titulo}</td>  
            <td> ${precio}</td> 
            <td> ${cantidad}</td>    
            
            <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"  > X </a>
            </td>
        `;

        // Agraga html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// elimina los cursos del tbody

function LimpiarHTML () {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}