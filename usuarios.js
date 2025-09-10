// Lista de empleados con su nombre, clave y rol asignado
const usuariosAutorizados = [
  { usuario: "Juan", clave: "1234", rol: "cocinero" },
  { usuario: "Maria", clave: "5678", rol: "cajero" },
  { usuario: "Pedro", clave: "9999", rol: "mesero" },
  { usuario: "Luisaadmin", clave: "1002198019", rol: "admin" },
  { usuario: "Jorgeadmin", clave: "1002198494", rol: "admin" }
];

// Función para validar login
function obtenerUsuario(usuario, clave) {
  return usuariosAutorizados.find(
    u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.clave === clave
  );
}
