CHANGELOG

Versión 0.3.0 – 2025-11-19
Módulo del Empleado completamente implementado

Added
- Nuevo módulo completo Empleado.
- EmpleadoLayout.jsx con sidebar, header y navegación.
- EmpleadoDashboard.jsx con reservas filtradas por fecha, métricas y búsqueda manual.
- EmpleadoReservaDetalle.jsx para visualizar el detalle de una reserva con acciones futuras.
- Componentes UI agregados: CardReserva.jsx, CardMesa.jsx, StatBox.jsx, FechaSelector.jsx.
- Nuevo servicio empleadoApi con métodos:
- getReservasByFecha
- getReservaDetalle
- Integración total en rutas:
- Actualización de AppRouter.jsx
- Ajustes en RoleRoute.jsx
- Actualización de roleRouting.js

Changed
- Diseño general mejorado para soportar dashboards por rol.
- Ajustes en controles de autenticación y navegación.

Fixed
- Corrección de bugs menores al cargar reservas.
- Corrección de redirecciones incorrectas.

Chore
- Limpieza interna de archivos y preparación del módulo administrador.


Versión 0.2.0 – 2025-11-17
Módulo de Usuarios + configuración del entorno del Frontend

Added
- Nuevo módulo Users.
- Componentes en src/features/usuario/.
- Componentes reutilizables en src/shared/components/.
- Integración completa de TailwindCSS y PostCSS:
- postcss.config.js
- tailwind.config.js
- Nuevas rutas y estructura en AppRouter.
- Nuevas pantallas y componentes de usuario (perfil, dashboard usuario, listados, etc.).

Changed
- Ajustes generales en:
- App.jsx
- PrivateGuard.jsx
- Capa HTTP (interceptor, base URL, headers)
- Limpieza y unificación del diseño:
- auth.css
- estilos globales

Fixed
- Correcciones de navegación, contexto de sesión y rol.

Chore
- Actualización de dependencias (package.json y package-lock.json).
- Configuración optimizada de Vite y jsconfig.json.
- Reorganización de carpetas base (estructura modular).



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
