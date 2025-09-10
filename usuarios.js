// Lista de empleados con su nombre, clave y rol asignado
const usuariosAutorizados = [
  { usuario: "juan", clave: "1234", rol: "cocinero" },
  { usuario: "maria", clave: "5678", rol: "cajero" },
  { usuario: "pedro", clave: "9999", rol: "mesero" },
  { usuario: "admin", clave: "1002198019", rol: "admin" },
  { usuario: "admin", clave: "1002198494", rol: "admin" }
];

// Función para validar login
function obtenerUsuario(usuario, clave) {
  return usuariosAutorizados.find(
    u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.clave === clave
  );
}
