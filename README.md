CHANGELOG
[0.2.0] - 2025-10-08

Added

LoginScreen.jsx: funcionalidad completa de inicio de sesión conectada con la API de backend (Spring Boot).

RegisterScreen.jsx: creación del componente de registro con conexión a la API (/api/auth/register).

Implementación de almacenamiento de sesión con localStorage para token JWT y datos del usuario (id, nombre, apellido, rolId).

Redirección automática al dashboard tras el login o registro exitoso.

ProtectedRoute.jsx: agregado para proteger rutas y permitir acceso solo con token.

RoleRoute.jsx: agregado para redirigir usuarios según su rol (ADMIN, USER, EMPLEADO).

DashboardScreen.jsx: creación de la vista principal del usuario (nombre y apellido visibles, botón de cierre de sesión funcional).

Changed / Refactor

Reorganización del árbol de carpetas (src/components/Auth/, src/components/Dashboard/) para mantener una estructura modular.

Ajustes en App.jsx para incluir rutas protegidas y redirecciones.

Mejora visual en las pantallas de login y registro: se aplicó fondo con overlay oscuro, tipografía unificada y contenedor “glass”.

Optimización de estilos para DashboardScreen con CSS limpio, distribución full screen y sidebar fija.

vite.config.js: confirmada configuración del proxy /api hacia http://localhost:8080.

Fixed

Solución al problema de centrado en la vista del dashboard (ahora ocupa 100% del ancho de la pantalla).

Corrección de placeholders y alineación de nombres/apellidos en el formulario de registro.

Eliminación de advertencias visuales en inputs de formularios y ajuste de colores de error.

Chore / Config

Limpieza de estilos globales y normalización de index.css para evitar conflictos con el template de Vite.

Commit y sincronización del proyecto con GitHub en la rama development.

Resolución de conflictos en rebase y push forzado exitoso (--force-with-lease) a origin/development.

[Unreleased]

Implementación de dashboard dinámico según rol del usuario.

Módulo de gestión de reservas (listar, crear, cancelar).

Integración de notificaciones y alertas personalizadas.

Componente de perfil de usuario y actualización de datos personales.

[0.1.0] - 2025-09-30

- LoginPage.jsx: creación del componente de la página de login.
- LoginPage.css: agregado de estilos CSS para la página de login (estructura, inputs, labels flotantes, botón y footer).
- Fondo de imagen con overlay aplicado en la vista de login.

Changed / Refactor
- Ajustes en la organización del proyecto para incluir la página de login como módulo independiente.

Fixed
- Corrección menor en la alineación de etiquetas (`label`) flotantes dentro de los campos de login.

 Chore / Config
- Integración inicial de React Router para manejar la ruta de login.
- Configuración de la carpeta `public/` para almacenar la imagen de fondo de la vista.

---

[Unreleased]
- Implementación de validaciones avanzadas en el formulario de login.
- Integración del login con la API de backend.
- Módulo de registro de usuarios.
- Manejo de autenticación y tokens en frontend.
CHANGELOG

[0.1.0] - 2025-09-30

- LoginPage.jsx: creación del componente de la página de login.
- LoginPage.css: agregado de estilos CSS para la página de login (estructura, inputs, labels flotantes, botón y footer).
- Fondo de imagen con overlay aplicado en la vista de login.

Changed / Refactor
- Ajustes en la organización del proyecto para incluir la página de login como módulo independiente.

Fixed
- Corrección menor en la alineación de etiquetas (`label`) flotantes dentro de los campos de login.

 Chore / Config
- Integración inicial de React Router para manejar la ruta de login.
- Configuración de la carpeta `public/` para almacenar la imagen de fondo de la vista.

---

[Unreleased]
- Implementación de validaciones avanzadas en el formulario de login.
- Integración del login con la API de backend.
- Módulo de registro de usuarios.
- Manejo de autenticación y tokens en frontend.
