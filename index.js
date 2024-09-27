function mostrarDetalles(cursoId) {
    const detalles = document.querySelectorAll('.detalles');
    detalles.forEach(detalle => {
        detalle.style.display = 'none';
    });

    const detalleSeleccionado = document.getElementById(cursoId);
    if (detalleSeleccionado) {
        detalleSeleccionado.style.display = 'block';
    }
}

function eliminarCurso(cursoId) {
    const cursoElemento = document.getElementById(cursoId);
    if (cursoElemento) {
        cursoElemento.parentElement.remove(); 
    }

    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos = cursos.filter(curso => curso.id !== cursoId);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}



function cargarCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.forEach(curso => agregarCursoDOM(curso));
}

function agregarCursoDOM(curso) {
    const nuevoCurso = document.createElement('li');
    nuevoCurso.innerHTML = `
        <strong>${curso.nombre}</strong><br>
        Docente: ${curso.docente}<br>
        Fecha de Inicio: ${curso.fecha}<br>
        Duración: ${curso.duracion}<br>
        <button onclick="mostrarDetalles('${curso.id}')">Ver más detalles</button>
        <button onclick="eliminarCurso('${curso.id}')" class="eliminar">x</button>
        <div id="${curso.id}" class="detalles">${curso.descripcion}</div>
    `;
    document.getElementById('listacursos').querySelector('ul').appendChild(nuevoCurso);
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const docente = document.getElementById('docente').value;
    const fecha = document.getElementById('fecha').value;
    const duracion = document.getElementById('duracion').value;
    const descripcion = document.getElementById('descripcion').value;
    const id = nombre.replace(/\s+/g, '');

    const nuevoCurso = { nombre, docente, fecha, duracion, descripcion, id };
    
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.push(nuevoCurso);
    localStorage.setItem('cursos', JSON.stringify(cursos));

    agregarCursoDOM(nuevoCurso);

    document.getElementById('formulario').reset();
});

window.onload = cargarCursos;

/*Animaciones*/ 
function mostrarDetalles(id) {
    const detalles = document.getElementById(id);
    if (detalles.style.display === "none" || detalles.style.display === "") {
        detalles.classList.add('show'); 
        detalles.style.display = "block";
    } else {
        detalles.classList.remove('show'); 
        setTimeout(() => {
            detalles.style.display = "none"; 
        }, 300); 
    }
}

// animacion para trancision entre enlaces
document.addEventListener("DOMContentLoaded", function() {
    const enlaces = document.querySelectorAll('nav a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const destino = document.querySelector(this.getAttribute('href')); // Obtener el destino
            destino.scrollIntoView({ behavior: 'smooth' }); // Desplazarse suavemente al destino
        });
    });
});
