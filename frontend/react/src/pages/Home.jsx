import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="font-sans text-gray-800">
      {/* Hero */}
      <section className="relative">
        <div className="h-72 md:h-96 bg-gray-200 overflow-hidden">
          <img src="/img/doctor-banner.png" alt="Doctor banner" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-16 text-center text-white">
            <h1 className="text-2xl md:text-4xl font-semibold drop-shadow-lg">Tu salud, nuestra prioridad</h1>
            <Link to="/buscar-turnos" className="inline-block mt-6 bg-teal-400 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-md shadow">Sacar turno</Link>
          </div>
        </div>
      </section>

      {/* Services - Card 1 */}
      <section className="p-8 md:p-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:items-center">
            <div className="md:w-1/2">
              <img src="/img/tarjeta1.png" alt="Servicios" className="w-full h-64 object-cover" />
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-xl font-semibold mb-2">Nuestros servicios</h2>
              <p className="text-gray-600">Ofrecemos una amplia gama de especialidades médicas, diagnósticos y atención personalizada para toda la familia. Nuestro equipo de profesionales trabaja con tecnología moderna y enfoque humano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Card 2 (alternate) */}
      <section className="p-8 md:p-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:items-center md:flex-row-reverse">
            <div className="md:w-1/2">
              <img src="/img/tarjeta2.png" alt="Atención" className="w-full h-64 object-cover" />
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-xl font-semibold mb-2">Atención integral</h2>
              <p className="text-gray-600">Contamos con seguimiento clínico, turnos online y protocolos de atención que priorizan la seguridad y comodidad del paciente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Encontranos */}
      <section id="encontranos" className="bg-gray-100 p-8 md:p-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <h3 className="text-2xl font-semibold mb-6">Encontranos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-medium">Dirección</h4>
              <p className="text-sm text-gray-600 mt-2">Calle Falsa 123, Ciudad</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-medium">Teléfono</h4>
              <p className="text-sm text-gray-600 mt-2">(011) 1234-5678</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-medium">Horario</h4>
              <p className="text-sm text-gray-600 mt-2">Lun - Vie 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
