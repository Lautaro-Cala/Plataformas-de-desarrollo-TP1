
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
        let totalProductos = lista.productos.length;
        let completados = lista.productos.filter(producto => producto.completado).length;
        let porcentaje = (completados / totalProductos) * 100;

        const listaCard = document.createElement('button');
        listaCard.className = `card`;
        listaCard.onclick = function() {
            window.location.href = `products.html?listaIndex=${index}`;
        };
        listaCard.innerHTML = `
        <div class="card-content">
            <h3>${lista.dia}: ${lista.nombre}</h3>
            <div class="progress-bar-section">
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progressBar${index}" style="width: ${porcentaje}%"></div>
                </div>
                <span class="product-count">${completados}/${totalProductos}</span>
            </div>
        </div>
    `;
    
        listaContainer.appendChild(listaCard);
    });
}
}


function updateProgressBar(percentage) {
const progressBar = document.getElementById('progressBar');
progressBar.style.width = percentage + '%'; 
}
