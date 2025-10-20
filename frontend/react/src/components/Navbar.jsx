import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo-medigestion.png" alt="Medigestión" className="h-10 w-auto" />
              <span className="font-medium text-gray-800">Medigestión</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="text-gray-700 hover:text-teal-600">Iniciar sesión</Link>
            <Link to="/register" className="text-gray-700 hover:text-teal-600">Registrarse</Link>
            <a href="#encontranos" className="text-gray-700 hover:text-teal-600">Ubicaciones</a>
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <Link to="/login" className="text-gray-700">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
