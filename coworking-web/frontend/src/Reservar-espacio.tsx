import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './reservarEspacio.css';

const apiUrl = '/api/reservations';
const apiSpacesUrl = '/api/spaces';

interface Espacio {
  id: number;
  name: string;
  location: string;
  description: string;
  capacity: number;
  price: number;
}

export default function ReservarEspacio() {
  // Utilidad para obtener la fecha/hora actual redondeada a los próximos 5 minutos
  function getNowRounded() {
    const now = new Date();
    now.setSeconds(0, 0);
    const min = now.getMinutes();
    now.setMinutes(min + (5 - (min % 5)));
    return toDatetimeLocal(now.toISOString());
  }

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<number | ''>('');
  const [tipoReserva, setTipoReserva] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [startTime, setStartTime] = useState(getNowRounded());
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiSpacesUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al cargar espacios');
        const data = await response.json();
        setEspacios(data.data || []);
      } catch (error) {
        setEspacios([]);
      }
    };
    fetchEspacios();
  }, []);

  // Cambia la lógica para no forzar la hora de fin si el usuario la cambia manualmente
  useEffect(() => {
    // Solo autollenar si endTime está vacío
    if (!endTime && startTime) {
      const start = new Date(startTime);
      start.setHours(start.getHours() + 1);
      setEndTime(toDatetimeLocal(start.toISOString()));
    }
  }, [startTime]);

  // Validación visual de hora de fin
  const isEndTimeInvalid = endTime && startTime && endTime <= startTime;

  // Utilidad para formatear a 'YYYY-MM-DDTHH:mm' para datetime-local
  function toDatetimeLocal(date: string) {
    if (!date) return '';
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  // Obtener el precio real del espacio seleccionado
  const precioEspacio = espacios.find(e => e.id === espacioSeleccionado)?.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado.');
        return;
      }
      if (!espacioSeleccionado) {
        alert('Selecciona un espacio.');
        return;
      }
      if (!startTime || !endTime) {
        alert('Debes seleccionar hora de inicio y fin.');
        return;
      }
      if (endTime <= startTime) {
        alert('La hora de fin debe ser posterior a la de inicio.');
        return;
      }
      // Formatear fechas a ISO (YYYY-MM-DDTHH:mm:ss)
      const start_time = new Date(startTime).toISOString();
      const end_time = new Date(endTime).toISOString();
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          space_id: espacioSeleccionado,
          start_time,
          end_time
        })
      });
      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }
      await response.json();
      alert('Reserva creada exitosamente');
    } catch (error) {
      alert('Error al crear la reserva. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="reservar-container">
      <Header />
      <main className="reservar-main">
        <div className="reservar-content">
          <EspacioImagen espacio={espacios.find(e => e.id === espacioSeleccionado)?.name || ''} />
          <form className="reservar-formulario" onSubmit={handleSubmit}>
            <h2>Reserva de Espacio</h2>

            <label>
              Espacio:
              <select
                value={espacioSeleccionado}
                onChange={(e) => setEspacioSeleccionado(Number(e.target.value))}
                required
                className="reservar-input"
              >
                <option value="">Selecciona un espacio</option>
                {espacios.map((espacio) => (
                  <option key={espacio.id} value={espacio.id}>
                    {espacio.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Precio:
              <input
                type="text"
                value={precioEspacio !== undefined ? `$${Number(precioEspacio).toLocaleString()}` : ''}
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
              Hora de inicio:
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                required
                className="reservar-input"
                step="300"
                min={toDatetimeLocal(new Date().toISOString())}
                max="2099-12-31T23:59"
              />
            </label>

            <label>
              Hora de fin:
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                required
                className="reservar-input"
                step="300"
                min={startTime}
                max="2099-12-31T23:59"
                style={isEndTimeInvalid ? { border: '2px solid red' } : {}}
              />
              {isEndTimeInvalid && <span className="error-message">La hora de fin debe ser posterior a la de inicio.</span>}
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
  // Mapear imágenes de assets (Vite)
  const assets = import.meta.glob('/src/assets/*', { eager: true, as: 'url' }) as Record<string, string>;
  // Normalizar nombre para buscar imagen
  function normalizarNombre(nombre: string) {
    if (!nombre) return '';
    const n = nombre.toLowerCase();
    if (n.includes('sala a')) return 'sala-a.jpg';
    if (n.includes('sala b')) return 'sala-b.jpg';
    if (n.includes('auditorio')) return 'auditorio.jpg';
    if (n.includes('conferencia')) return 'sala-conferencias.jpg';
    return '';
  }
  const clave = normalizarNombre(espacio);
  // Buscar primero en assets, luego en public
  let src = '';
  if (clave && assets[`/src/assets/${clave}`]) {
    src = assets[`/src/assets/${clave}`];
  } else if (clave) {
    // fallback a public
    if (clave === 'sala-a.jpg') src = '/descargar.jpeg';
    else if (clave === 'sala-b.jpg') src = '/images (1).jpeg';
    else if (clave === 'auditorio.jpg') src = '/images (2).jpeg';
    else if (clave === 'sala-conferencias.jpg') src = '/images.jpeg';
    else src = '/logo.png';
  } else {
    src = '/logo.png';
  }
  return (
    <div className="reservar-imagen">
      <img 
        src={src}
        alt={`Imagen de ${espacio}`}
        className="espacio-preview-img"
        style={src.endsWith('logo.png') ? { opacity: 0.3 } : {}}
      />
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
