// ...existing code...

const CART_KEY = 'mi_carrito_v1';
let carrito = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// helpers
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  updateCounter();
  renderCartModal();
}

function updateCounter() {
  const el = document.querySelector('.contador-carrito');
  if (!el) return;
  const totalCant = carrito.reduce((s, p) => s + p.cantidad, 0);
  el.textContent = totalCant;
}

// añadir producto (producto debe tener id, nombre, precio, img (opcional))
function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) existente.cantidad += 1;
  else carrito.push({...producto, cantidad: 1});
  saveCart();
}

// eliminar
function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  saveCart();
}

// cambiar cantidad
function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad < 1) eliminarDelCarrito(id);
  else saveCart();
}

// render modal
function renderCartModal() {
  let modal = document.getElementById('carrito-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'carrito-modal';
    modal.className = 'carrito-modal';
    document.querySelector('.navegacion').appendChild(modal);
  }

  if (carrito.length === 0) {
    modal.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  const rows = carrito.map(item => {
    return `
      <div class="carrito-item" data-id="${item.id}">
        <div style="display:flex;gap:10px;align-items:center;">
          ${item.img ? `<img src="${item.img}" alt="${item.nombre}">` : ''}
          <div>
            <div style="font-weight:700;">${item.nombre}</div>
            <div style="font-size:0.9rem;">$ ${Number(item.precio).toFixed(2)}</div>
          </div>
        </div>
        <div class="carrito-actions">
          <button class="carrito-decr" data-id="${item.id}">-</button>
          <span>${item.cantidad}</span>
          <button class="carrito-incr" data-id="${item.id}">+</button>
          <button class="carrito-remove" data-id="${item.id}">✕</button>
        </div>
      </div>
    `;
  }).join('');

  const total = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
  modal.innerHTML = rows + `<div class="carrito-total">Total: $ ${total.toFixed(2)}</div>
    <div style="text-align:right;margin-top:8px;">
      <button id="checkout-btn">Checkout</button>
    </div>`;
}

// toggle modal
function toggleCart() {
  const modal = document.getElementById('carrito-modal');
  if (!modal) renderCartModal();
  document.getElementById('carrito-modal').classList.toggle('open');
}

// inicializar: enlazar botones de productos (delegación por seguridad)
document.addEventListener('click', (e) => {
  // click en botones "Añadir al carrito"
  const boton = e.target.closest('button[data-id][data-nombre][data-precio]');
  if (boton && boton.closest('.productitem')) {
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    // intenta detectar imagen del producto (si existe)
    const prodItem = boton.closest('.productitem');
    const imgEl = prodItem ? prodItem.querySelector('img') : null;
    const img = imgEl ? imgEl.src : null;
    agregarAlCarrito({ id, nombre, precio, img });
    return;
  }

  // abrir/cerrar carrito
  if (e.target.closest('#carrito-btn')) {
    e.preventDefault();
    toggleCart();
    return;
  }

  // eliminar item
  if (e.target.matches('.carrito-remove')) {
    const id = e.target.dataset.id;
    eliminarDelCarrito(id);
    return;
  }

  // incrementar / decrementar
  if (e.target.matches('.carrito-incr')) {
    cambiarCantidad(e.target.dataset.id, +1);
    return;
  }
  if (e.target.matches('.carrito-decr')) {
    cambiarCantidad(e.target.dataset.id, -1);
    return;
  }

  // checkout (solo ejemplo)
  if (e.target.id === 'checkout-btn') {
    alert('Checkout: implementar proceso de pago.');
  }
});

// cargar carrito guardado al inicio
document.addEventListener('DOMContentLoaded', () => {
  updateCounter();
  renderCartModal();
});

// ...existing code...


let currentSlide = 0;
const slides = document.getElementsByClassName('carrusel-item');

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    slides[i].classList.remove('active');
  }
  slides[currentSlide].style.display = 'block';
  slides[currentSlide].classList.add('active');
}

function moveSlide(n) {
  currentSlide += n;
  showSlide(currentSlide);
}


window.onload = function() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  if (slides.length > 0) {
    slides[0].style.display = 'block';
    slides[0].classList.add('active');
  }

  const prevBtn = document.querySelector('.carrusel-control.prev');
  const nextBtn = document.querySelector('.carrusel-control.next');
  if (prevBtn) prevBtn.addEventListener('click', function() { moveSlide(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { moveSlide(1); });
};