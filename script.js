let usuarioActivo = null;

  function iniciarSesion() {
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const error = document.getElementById("error");

    const usuarioValido = obtenerUsuario(usuario, clave);

    if (usuarioValido) {
      usuarioActivo = usuarioValido;
      localStorage.setItem("usuarioSesion", JSON.stringify(usuarioValido)); 
      mostrarPanel(usuarioValido);
    } else {
      error.textContent = "Usuario o contraseña incorrectos";
    }
  }

  function mostrarPanel(usuario) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    document.getElementById("bienvenida").textContent = `¡Bienvenido, ${usuario.usuario}!`;
    iniciarReloj();
    mostrarAccesos(usuario.rol);

    document.getElementById("darkModeTogglePanel").checked = document.body.classList.contains('dark');
  }

  function mostrarAccesos(rol) {
    const container = document.getElementById("accesos-container");
    container.innerHTML = "";

    if (rolesAccesos[rol]) {
      rolesAccesos[rol].forEach(id => {
        const acceso = accesos.find(a => a.id === id);
        if (acceso) {
          const div = document.createElement("div");
          div.id = acceso.id;
          div.innerHTML = `
            <a href="${acceso.url}" class="button-link" target="_blank">
              <i class="${acceso.icon}"></i> ${acceso.label}
            </a>
          `;
          container.appendChild(div);
        }
      });
    }
  }

  function iniciarReloj() {
    function actualizarReloj() {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');
      const horaActual = `${horas}:${minutos}:${segundos}`;

      const relojLogin = document.getElementById('reloj-login');
      const relojPanel = document.getElementById('reloj');
      if (relojLogin) relojLogin.textContent = horaActual;
      if (relojPanel) relojPanel.textContent = horaActual;
    }
    setInterval(actualizarReloj, 1000);
    actualizarReloj();
  }

  function abrirModalLogout() {
    document.getElementById("logoutModal").style.display = "flex";
    document.getElementById("logoutPassword").value = "";
  }

  function cerrarModalLogout() {
    document.getElementById("logoutModal").style.display = "none";
  }

  function confirmarCerrarSesion() {
    const claveConfirmar = document.getElementById("logoutPassword").value;
    if (usuarioActivo && claveConfirmar === usuarioActivo.clave) {
      localStorage.removeItem("usuarioSesion");
      location.reload();
    } else {
      alert("Contraseña incorrecta. No se cerró la sesión.");
      document.getElementById("logoutPassword").value = "";
    }
  }

// Toggle visibilidad contraseña login
const passwordInput = document.getElementById("clave");
const togglePassword = document.getElementById("togglePassword");

// Mostrar mientras se mantiene presionado
togglePassword.addEventListener("mousedown", () => {
  passwordInput.type = "text";
  togglePassword.classList.remove("fa-eye");
  togglePassword.classList.add("fa-eye-slash");
});

togglePassword.addEventListener("mouseup", () => {
  passwordInput.type = "password";
  togglePassword.classList.remove("fa-eye-slash");
  togglePassword.classList.add("fa-eye");
});

// Para móviles (touch)
togglePassword.addEventListener("touchstart", (e) => {
  e.preventDefault(); // evita doble evento
  passwordInput.type = "text";
  togglePassword.classList.remove("fa-eye");
  togglePassword.classList.add("fa-eye-slash");
});

togglePassword.addEventListener("touchend", () => {
  passwordInput.type = "password";
  togglePassword.classList.remove("fa-eye-slash");
  togglePassword.classList.add("fa-eye");
});


// Toggle visibilidad contraseña modal logout
const logoutPasswordInput = document.getElementById("logoutPassword");
const toggleLogoutPassword = document.getElementById("toggleLogoutPassword");

// Mostrar mientras se mantiene presionado
toggleLogoutPassword.addEventListener("mousedown", () => {
  logoutPasswordInput.type = "text";
  toggleLogoutPassword.classList.remove("fa-eye");
  toggleLogoutPassword.classList.add("fa-eye-slash");
});

toggleLogoutPassword.addEventListener("mouseup", () => {
  logoutPasswordInput.type = "password";
  toggleLogoutPassword.classList.remove("fa-eye-slash");
  toggleLogoutPassword.classList.add("fa-eye");
});

// Para móviles (touch)
toggleLogoutPassword.addEventListener("touchstart", (e) => {
  e.preventDefault();
  logoutPasswordInput.type = "text";
  toggleLogoutPassword.classList.remove("fa-eye");
  toggleLogoutPassword.classList.add("fa-eye-slash");
});

toggleLogoutPassword.addEventListener("touchend", () => {
  logoutPasswordInput.type = "password";
  toggleLogoutPassword.classList.remove("fa-eye-slash");
  toggleLogoutPassword.classList.add("fa-eye");
});






  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('modoOscuro', document.body.classList.contains('dark'));

    document.getElementById("darkModeToggle").checked = document.body.classList.contains('dark');
    const panelSwitch = document.getElementById("darkModeTogglePanel");
    if (panelSwitch) panelSwitch.checked = document.body.classList.contains('dark');
  }

  window.onload = () => {
    const esOscuro = localStorage.getItem('modoOscuro') === 'true';
    if (esOscuro) document.body.classList.add('dark');

    document.getElementById("darkModeToggle").checked = esOscuro;
    const panelSwitch = document.getElementById("darkModeTogglePanel");
    if (panelSwitch) panelSwitch.checked = esOscuro;

    iniciarReloj();

    const sesion = localStorage.getItem("usuarioSesion");
    if (sesion) {
      usuarioActivo = JSON.parse(sesion);
      mostrarPanel(usuarioActivo);
    }
  };