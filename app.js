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


// Funcion para mostrar los productos en la tabla
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
  
  // Funcion para eliminar producto
  function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    showProducts();
  }

// Funcion para editar producto
function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category;
  
    deleteProduct(id); // Eliminamos el producto y lo volveremos a agregar al guardar cambios
  }