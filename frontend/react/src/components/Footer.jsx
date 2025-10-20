import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3">
              <img src="/logo-medigestion.png" alt="Medigestión" className="h-10 w-auto" />
              <div>
                <p className="font-semibold">Medigestión</p>
                <p className="text-sm text-gray-500">Atención médica personalizada</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-600">Inicio</Link></li>
              <li><a href="#profesionales" className="hover:text-teal-600">Profesionales</a></li>
              <li><a href="#turnos" className="hover:text-teal-600">Turnos</a></li>
              <li><a href="#contacto" className="hover:text-teal-600">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <p className="text-sm">Calle Falsa 123, Ciudad</p>
            <p className="text-sm mt-1">Tel: (011) 1234-5678</p>
            <p className="text-sm mt-1">Horario: Lun - Vie 9:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-4 text-sm text-gray-600 text-center">
          © 2025 Medigestión | <a href="#" className="underline">Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
}
