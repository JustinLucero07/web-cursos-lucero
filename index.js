//"Proyecto Completado"
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

//Se modifica este metodo para agregarle una animacion al elinimar un curso de la lista
function eliminarCurso(cursoId) {
    const cursoElemento = document.getElementById(cursoId);
    if (cursoElemento) {
        const li = cursoElemento.parentElement;  // El elemento li del curso
        
        // Añadir la animación de salida
        li.style.animation = 'slideOut 0.5s forwards';
        
        // Esperar a que termine la animación antes de eliminar el elemento
        li.addEventListener('animationend', function() {
            li.remove();  // Eliminar el li del DOM
            
            // Actualizar el localStorage después de eliminar el curso del DOM
            let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos = cursos.filter(curso => curso.id !== cursoId);
            localStorage.setItem('cursos', JSON.stringify(cursos));
        });
    }
}


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre');
    const docente = document.getElementById('docente');
    const fecha = document.getElementById('fecha');
    const duracion = document.getElementById('duracion');
    const descripcion = document.getElementById('descripcion');

    limpiarErrores();
    let errores = [];

    // Validaciones de todos los inputs
    if (nombre.value.trim() === '') {
        marcarError(nombre, "El campo 'Nombre' es obligatorio.");
        errores.push("nombre");
    }
    if (docente.value.trim() === '') {
        marcarError(docente, "El campo 'Docente' es obligatorio.");
        errores.push("docente");
    }
    if (fecha.value.trim() === '') {
        marcarError(fecha, "El campo 'Fecha de inicio' es obligatorio.");
        errores.push("fecha");
    }
    const fechaRegex = /^([0-2][0-9]|(3)[0-1])\/((0)[1-9]|(1)[0-2])\/\d{4}$/;
    if (!fecha.value.match(fechaRegex)) {
        marcarError(fecha, "El formato de la fecha es incorrecto. Use el formato dd/mm/yyyy.");
        errores.push("fecha");
    }
    if (duracion.value.trim() === '') {
        marcarError(duracion, "El campo 'Duración' es obligatorio.");
        errores.push("duracion");
    } else if (!/^\d+$/.test(duracion.value.trim())) {
        marcarError(duracion, "La duración debe ser un número.");
        errores.push("duracion");
    } else {
        // Agregar "semanas" automáticamente si no está presente
        if (!duracion.value.includes('semanas')) {
            duracion.value += ' semanas';
        }
    }
    if (descripcion.value.trim() === '') {
        marcarError(descripcion, "El campo 'Descripción' es obligatorio.");
        errores.push("descripcion");
    }
    if (errores.length === 0) {
        // Crear un ID basado en el nombre
        const id = nombre.value.replace(/\s+/g, '');

        // Crear el objeto curso
        const nuevoCurso = {
            nombre: nombre.value,
            docente: docente.value,
            fecha: fecha.value,
            duracion: duracion.value,
            descripcion: descripcion.value,
            id: id
        };

        // Guardar en LocalStorage
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        cursos.push(nuevoCurso);
        localStorage.setItem('cursos', JSON.stringify(cursos));

        // Agregar el curso al DOM
        agregarCursoDOM(nuevoCurso);

        // Resetear el formulario
        document.getElementById('formulario').reset();
    }
});

// Función para marcar un campo con error
function marcarError(campo, mensaje) {
    campo.classList.add('error');
    const errorMensaje = document.createElement('span');
    errorMensaje.classList.add('error-message');
    errorMensaje.textContent = mensaje;
    campo.parentNode.insertBefore(errorMensaje, campo.nextSibling); // Insertar mensaje de error
}

// Función para limpiar los errores visuales
function limpiarErrores() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(function(campo) {
        campo.classList.remove('error');
    });
    const mensajesError = document.querySelectorAll('.error-message');
    mensajesError.forEach(function(mensaje) {
        mensaje.remove(); // Eliminar los mensajes de error
    });
}

window.onload = cargarCursos;

//Animaciones ver detalles
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

// Animacion para trancision entre enlaces
document.addEventListener("DOMContentLoaded", function() {
    const enlaces = document.querySelectorAll('nav a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); 
            const destino = document.querySelector(this.getAttribute('href')); 
            destino.scrollIntoView({ behavior: 'smooth' }); // Desplazarse suavemente al destino
        });
    });
});
