//Se modifica para el nuevo diseño y mostrar todo los detalles
function mostrarDetalles(id) {
    var detalles = document.getElementById(id);
    if (detalles.classList.contains('show')) {
        detalles.classList.remove('show');
    } else {
        detalles.classList.add('show');
    }
}

//Se modifica este metodo para agregarle una animacion al elinimar un curso de la lista
function eliminarCurso(cursoId) {
    const cursoElemento = document.getElementById(cursoId);
    if (cursoElemento) {
        // Aplicar animación de salida
        cursoElemento.style.animation = 'fadeOut 0.3s forwards';
        
        // Esperar a que termine la animación para eliminar el elemento
        setTimeout(() => {
            cursoElemento.parentElement.remove();
        }, 300); // Coincide con la duración de la animación (0.3s)
    }

    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos = cursos.filter(curso => curso.id !== cursoId);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}




function cargarCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.forEach(curso => agregarCursoDOM(curso));
}
//Se realiza un cambio en este metodo debido al nuevo diseño que se realiza
function agregarCursoDOM(curso) {
    const nuevoCurso = document.createElement('li');
    nuevoCurso.innerHTML = `
        <strong>${curso.nombre}</strong><br>
        <button onclick="mostrarDetalles('${curso.id}')">Ver más detalles</button>
        <button onclick="eliminarCurso('${curso.id}')" class="eliminar">x</button>
        <div id="${curso.id}" class="detalles" style="display:none;">
            <p><strong>Docente:</strong> ${curso.docente}</p>
            <p><strong>Fecha de Inicio:</strong> ${curso.fecha}</p>
            <p><strong>Duración:</strong> ${curso.duracion}</p>
            <p>${curso.descripcion}</p>
        </div>
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
