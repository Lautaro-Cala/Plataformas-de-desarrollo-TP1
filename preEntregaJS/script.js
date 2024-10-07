
    const listaForm = document.getElementById('listaForm');
    const agregarProductoBtn = document.getElementById('agregarProductoBtn');
    const productosContainer = document.getElementById('productosContainer');
    
    if (listaForm) {
        agregarProductoBtn.addEventListener('click', () => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <input type="text" placeholder="Producto" class="producto-nombre" required>
                <input type="number" placeholder="Cantidad" class="producto-cantidad" min="1" required>
            `;
            productosContainer.appendChild(productoDiv);
        });

        listaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const dia = document.getElementById('dia').value;
            const productos = obtenerProductos();
            agregarLista(nombre, dia, productos);
            window.location.href = 'index.html';
        });
    }

    mostrarListas();


function obtenerProductos() {
    const productosDivs = document.querySelectorAll('.producto');
    const productos = [];

    productosDivs.forEach(div => {
        const nombre = div.querySelector('.producto-nombre').value;
        const cantidad = div.querySelector('.producto-cantidad').value;
        productos.push({ nombre, cantidad });
    });
    
    return productos;
}

function agregarLista(nombre, dia, productos) {
    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    listas.push({ nombre, dia, productos, completado: false });
    localStorage.setItem('listas', JSON.stringify(listas));
}

function mostrarListas() {
    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    const listaContainer = document.getElementById('lista-compras');
    
    if (listaContainer) {
        listaContainer.innerHTML = '';
        listas.forEach((lista, index) => {
            const listaCard = document.createElement('div');
            listaCard.className = `card ${lista.completado ? 'completado' : 'pendiente'}`;
            listaCard.innerHTML = `
                <h3>${lista.nombre}</h3>
                <p>Día: ${lista.dia}</p>
                <ul>
                    ${lista.productos.map(producto => `<li>${producto.nombre}: ${producto.cantidad}</li>`).join('')}
                </ul>
                <button onclick="toggleEstado(${index})">${lista.completado ? 'Marcar como Pendiente' : 'Marcar como Completado'}</button>
                <button onclick="eliminarLista(${index})">Eliminar</button>
            `;
            listaContainer.appendChild(listaCard);
        });
    }
}

function toggleEstado(index) {
    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    listas[index].completado = !listas[index].completado;
    localStorage.setItem('listas', JSON.stringify(listas));
    mostrarListas();
}

function eliminarLista(index) {
    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    listas.splice(index, 1);
    localStorage.setItem('listas', JSON.stringify(listas));
    mostrarListas();
}
