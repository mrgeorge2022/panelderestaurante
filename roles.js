// Configuración de accesos por rol
const rolesAccesos = {
  cocinero: ["acceso-cocina"],
  cajero: ["acceso-caja"],
  mesero: ["acceso-web"],
  admin: [
    "acceso-cocina",
    "acceso-inventario",
    "acceso-caja",
    "acceso-web",
    "acceso-admin"
  ]
};
