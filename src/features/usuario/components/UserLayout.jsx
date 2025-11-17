import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/reservar", label: "Reservar", icon: "📅" },
    { path: "/mis-reservas", label: "Mis reservas", icon: "📋" },
    { path: "/notificaciones", label: "Notificaciones", icon: "🔔" },
    { path: "/perfil", label: "Perfil", icon: "👤" },
  ];

  const NavItem = ({ to, label, icon }) => (
    <NavLink
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white font-semibold shadow-lg"
            : "text-gray-200 hover:bg-white/10"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </NavLink>
  );

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#2F3542] text-white border-b border-black/20 flex items-center justify-between px-4 md:px-6 z-50">
        
        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl">🍽️</span>
            <span>Reservas</span>
          </div>
          <span className="text-sm text-gray-300 hidden sm:inline">
            Hola, <span className="text-white font-medium">{user.nombre}</span>
          </span>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
        >
          <span className="hidden sm:inline">Cerrar sesión</span>
          <span className="sm:hidden">Salir</span>
          <span>🚪</span>
        </button>
      </header>

      {/* ===== SIDEBAR OVERLAY (móvil) ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-16 left-0 w-64 h-[calc(100vh-4rem)]
          bg-[#2F3542] text-white border-r border-black/20
          p-4 z-40 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="h-full flex flex-col">
          <ul className="space-y-2 flex-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavItem to={item.path} label={item.label} icon={item.icon} />
              </li>
            ))}
          </ul>

          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                {user.nombre?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium truncate">{user.nombre}</p>
                <p className="text-xs text-gray-300 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
     <main className="flex-1 mt-16 md:ml-64 p-4 md:p-6 bg-[#F5F6FA]">
        <div className="max-w-7xl mx-auto bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
