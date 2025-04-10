// Verifica si ya hay usuario logueado
if (localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
  }
  
  document.getElementById('auth-form').addEventListener('submit', login);
  
  function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }
  
  function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem('currentUser', username);
      window.location.href = 'index.html';
    } else {
      showMessage('Usuario o contraseña incorrectos');
    }
  }
  
  function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!username || !password) return showMessage('Completa todos los campos');
  
    const users = getUsers();
    if (users.some(u => u.username === username)) {
      return showMessage('El usuario ya existe');
    }
  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
  }
  
  function showMessage(msg) {
    document.getElementById('message').textContent = msg;
  }
  