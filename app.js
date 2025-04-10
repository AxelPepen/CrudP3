// Verificar si hay un usuario logueado
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  window.location.href = 'login.html';
} else {
  document.getElementById('welcome-user').textContent = `Hola, ${currentUser}`;
}

// Al cargar la página, mostrar productos del usuario
document.addEventListener('DOMContentLoaded', showProducts);

// Evento al enviar formulario
document.getElementById('product-form').addEventListener('submit', addProduct);

// Función para agregar producto
function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const category = document.getElementById('category').value.trim();

  if (!name || !price || !category) return alert('Completa todos los campos');

  const product = {
    id: Date.now(),
    name,
    price,
    category
  };

  const products = getProducts();
  products.push(product);
  saveProducts(products);

  e.target.reset();
  showProducts();
}

// Función para obtener productos del usuario logueado
function getProducts() {
  const allData = JSON.parse(localStorage.getItem('products')) || {};
  return allData[currentUser] || [];
}

// Función para guardar productos para el usuario actual
function saveProducts(products) {
  const allData = JSON.parse(localStorage.getItem('products')) || {};
  allData[currentUser] = products;
  localStorage.setItem('products', JSON.stringify(allData));
}

// Función para mostrar productos en la tabla
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
  let products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
  showProducts();
}

// Función para editar producto
function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);

  if (product) {
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category;
    deleteProduct(id);
  }
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
