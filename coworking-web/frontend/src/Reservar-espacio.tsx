import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import'./reservarespacio.css';

export default function ReservarEspacio() {
  const [espacioSeleccionado, setEspacioSeleccionado] = useState('');
  const [costo, setCosto] = useState('');
  const [tipoReserva, setTipoReserva] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');

  const costosPorEspacio: Record<string, string> = {
    'Sala A': '200',
    'Sala B': '150',
    'Auditorio': '300',
    'Sala de Conferencias': '250',
  };

  useEffect(() => {
    if (espacioSeleccionado && costosPorEspacio[espacioSeleccionado]) {
      setCosto(costosPorEspacio[espacioSeleccionado]);
    } else {
      setCosto('');
    }
  }, [espacioSeleccionado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reserva enviada correctamente:
Espacio: ${espacioSeleccionado}
Costo: $${costo}
Tipo: ${tipoReserva}
Descripción: ${descripcion}
Horario: ${horario}`);
  };

  return (
    <div className="reservar-container">
      <Header />
      <main className="reservar-main">
        <div className="reservar-content">
          <EspacioImagen espacio={espacioSeleccionado} />
          <form className="reservar-formulario" onSubmit={handleSubmit}>
            <h2>Reserva de Espacio</h2>

            <label>
              Espacio:
              <select
                value={espacioSeleccionado}
                onChange={(e) => setEspacioSeleccionado(e.target.value)}
                required
                className="reservar-input"
              >
                <option value="">Selecciona un espacio</option>
                {Object.keys(costosPorEspacio).map((espacio) => (
                  <option key={espacio} value={espacio}>
                    {espacio}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Costo:
              <input
                type="text"
                value={costo ? `$${costo}` : ''}
                readOnly
                className="reservar-input"
              />
            </label>

            <label>
              Tipo de reserva:
              <select
                value={tipoReserva}
                onChange={(e) => setTipoReserva(e.target.value)}
                required
                className="reservar-input"
              >
                <option value="">Selecciona tipo</option>
                <option value="Reunión breve">Reunión breve</option>
                <option value="Presentación">Presentación</option>
                <option value="Videollamada">Videollamada</option>
                <option value="Sesión creativa">Sesión creativa</option>
              </select>
            </label>

            <label>
              Descripción:
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                className="reservar-input"
              />
            </label>

            <label>
              Horario:
              <input
                type="datetime-local"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                className="reservar-input"
              />
            </label>

            <button type="submit" className="reservar-boton">
              Reservar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EspacioImagen({ espacio }: { espacio: string }) {
  return (
    <div className="reservar-imagen">
      {espacio ? (
        <img src={`/imagenes/${espacio}.jpg`} alt={`Imagen de ${espacio}`} />
      ) : (
        <span>Selecciona un espacio para ver la imagen</span>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="reservar-header">
      <img src="/logo.png" alt="Logo" className="reservar-logo" />
      <nav className="reservar-nav1">
        <Link to="/user-home-page" className="reservar-link">Inicio</Link>
        <Link to="/user-meeting-page" className="reservar-link">Espacios de reuniones</Link>
        <Link to="/user-reservation-page" className="reservar-link">Reservar espacio</Link>
        <Link to="/user-My-reservations-page" className="reservar-link">Mis reservas</Link>
        <Link to="/login" className="reservar-link">Cerrar sesión</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="reservar-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}
