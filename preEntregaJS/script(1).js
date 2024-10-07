const masProducts = document.getElementById('agregarProductoBtn');
const listaProdcts = document.getElementById('productosContainer');
const form = document.getElementById('listaForm');

if (listaForm) {
    masProducts.addEventListener('click', () =>{
        const div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `
            <input type="text" placeholder="Producto" class="producto-nombre" required>
            <input type="number" placeholder="Cantidad" class="producto-cantidad" min="1" required>
        `;

        listaProdcts.appendChild(div);
    })

    form.addEventListener('submit', (objeto)=>{
        objeto.preventDefault();
        const titulo = document.getElementById('nombre').value;
        const dia = document.getElementById('dia').value;
        const producto = obtenerProductos();
        
        agregarLista(titulo, dia, productos);
        window.location.href = 'index.html';
    })
}

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
                <button onclick="Estado(${index})">${lista.completado ? 'Marcar como Pendiente' : 'Marcar como Completado'}</button>
                <button onclick="eliminarLista(${index})">Eliminar</button>
            `;
            listaContainer.appendChild(listaCard);
        });
    }
}

mostrarListas();

function Estado(index) {
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