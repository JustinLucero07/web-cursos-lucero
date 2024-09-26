document.addEventListener('DOMContentLoaded', () => {
    const listaCursos = document.getElementById('lista-cursos');
    const formCurso = document.getElementById('form-curso');

    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    function mostrarCursos() {
        listaCursos.innerHTML = '';
        cursos.forEach((curso, index) => {
            const cursoDiv = document.createElement('div');
            cursoDiv.classList.add('curso');
            cursoDiv.innerHTML = `
                <h3>${curso.nombre}</h3>
                <p>Instructor: ${curso.instructor}</p>
                <p>Fecha de inicio: ${curso.fecha}</p>
                <p>Duración: ${curso.duracion} semanas</p>
                <button onclick="mostrarDetalles(${index})">Ver más detalles</button>
                <div class="detalles" id="detalles-${index}" style="display:none;">
                    <p>${curso.descripcion}</p>
                </div>
            `;
            listaCursos.appendChild(cursoDiv);
        });
    }

    window.mostrarDetalles = function(index) {
        const detalles = document.getElementById(`detalles-${index}`);
        if (detalles.style.display === 'none') {
            detalles.style.display = 'block';
        } else {
            detalles.style.display = 'none';
        }
    };

    formCurso.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoCurso = {
            nombre: document.getElementById('nombre').value,
            instructor: document.getElementById('instructor').value,
            fecha: document.getElementById('fecha').value,
            duracion: document.getElementById('duracion').value,
            descripcion: document.getElementById('descripcion').value,
        };
        
        cursos.push(nuevoCurso);
        localStorage.setItem('cursos', JSON.stringify(cursos));
        formCurso.reset();
        mostrarCursos();
    });

    mostrarCursos();
});

