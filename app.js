// Al cargar la página, mostramos los productos guardados
document.addEventListener('DOMContentLoaded', showProducts);

document.getElementById('product-form').addEventListener('submit', addProduct);

// Funcion para agregar producto
function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const category = document.getElementById('category').value.trim();

  if (!name || !price || !category) return alert('Completa todos los campos');

  const product = { id: Date.now(), name, price, category };
  const products = getProducts();
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));

  e.target.reset();
  showProducts();
}

// Funcion para obtener productos del Local Storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }