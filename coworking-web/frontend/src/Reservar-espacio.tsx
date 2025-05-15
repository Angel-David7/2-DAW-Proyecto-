import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  const [espacio, setEspacio] = useState('');
  const [costo, setCosto] = useState('');
  const [tipoReserva, setTipoReserva] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');

  // Mapa de espacios a costos
  const costosPorEspacio: Record<string, string> = {
    'Sala A': '200',
    'Sala B': '150',
    'Auditorio': '300',
    'Sala de Conferencias': '250',
  };

  useEffect(() => {
    if (espacio && costosPorEspacio[espacio]) {
      setCosto(costosPorEspacio[espacio]);
    } else {
      setCosto('');
    }
  }, [espacio]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reserva enviada correctamente:
Espacio: ${espacio}
Costo: $${costo}
Tipo de reserva: ${tipoReserva}
Descripción: ${descripcion}
Horario: ${horario}`);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
      }}
    >
      {/* Encabezado */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 30px',
          borderBottom: '1px solid #ccc',
          backgroundColor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '120px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
        <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/iniciousuario.html" style={navLinkStyle}>
            Inicio
          </a>
          <a href="./ver-espacios.html" style={navLinkStyle}>
            Espacios de reuniones
          </a>
          <a href="/Reservar-espacio.html" style={navLinkStyle}>
            Reservar espacio
          </a>
          <a href="/mis-reservas.html" style={navLinkStyle}>
            Mis reservas
          </a>
          <a href="/login.html" style={navLinkStyle}>
            Cerrar sesión
          </a>
        </nav>
      </header>

      {/* Contenido con formulario */}
      <main
        style={{
          marginTop: '120px',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: '400px',
            backgroundColor: '#f0f0f0',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#333' }}>Reserva de Espacio</h2>

          <label>
            Espacio:
            <select
              value={espacio}
              onChange={(e) => setEspacio(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecciona un espacio</option>
              <option value="Sala A">Sala A</option>
              <option value="Sala B">Sala B</option>
              <option value="Auditorio">Auditorio</option>
              <option value="Sala de Conferencias">Sala de Conferencias</option>
            </select>
          </label>

          <label>
            Costo del espacio:
            <input
              type="text"
              value={costo ? `$${costo}` : ''}
              readOnly
              placeholder="Seleccione un espacio"
              style={{ ...inputStyle, backgroundColor: '#e0e0e0', cursor: 'not-allowed' }}
            />
          </label>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Tipo de reserva</label>
            <select
              value={tipoReserva}
              onChange={(e) => setTipoReserva(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecciona tipo de reserva</option>
              <option value="Reunión breve">Reunión breve</option>
              <option value="Presentación">Presentación</option>
              <option value="Videollamada">Videollamada</option>
              <option value="Sesión creativa">Sesión creativa</option>
            </select>
          </div>

          <label>
            Descripción del espacio:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{ ...inputStyle, height: '80px', resize: 'none' }}
              required
            />
          </label>

          <label>
            Horario de la reserva:
            <input
              type="datetime-local"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              style={inputStyle}
              required
            />
          </label>

          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#D9D9D9',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Reservar
          </button>
        </form>
      </main>

      {/* Pie de página */}
      <footer
        style={{
          backgroundColor: '#f2f2f2',
          padding: '15px 30px',
          textAlign: 'center',
          borderTop: '1px solid #ccc',
          fontSize: '14px',
        }}
      >
        © 2025 GreenWork · Todos los derechos reservados
      </footer>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#D9D9D9',
};

const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
};

// Evitar error si no existe el div#root
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'");
}
