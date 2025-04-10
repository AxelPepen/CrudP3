// Variables globales
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    window.location.href = 'login.html';
  }

  document.getElementById('welcome-user').textContent = `Bienvenido, ${user}`;
  showProducts();
});

document.getElementById('product-form').addEventListener('submit', addProduct);

// Función para agregar producto
function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const category = document.getElementById('category').value.trim();

  if (!name || !price || !category) {
    alert('Completa todos los campos');
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    category
  };

  const products = getProducts();
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));

  e.target.reset();
  showProducts();
}

// Función para obtener productos del Local Storage
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Función para mostrar los productos en la tabla
function showProducts() {
  const products = getProducts();
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td>
        <button class="edit" onclick="editProduct(${product.id})">Editar</button>
        <button class="delete" onclick="deleteProduct(${product.id})">Eliminar</button>
      </td>
    `;
    list.appendChild(row);
  });
}

// Función para eliminar producto
function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  showProducts();
}

// Función para editar producto
function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);

  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('category').value = product.category;

  // Lo quitamos para reemplazarlo al guardar cambios
  deleteProduct(id);
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
