import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div style={containerStyle}>
      <Header />
      <main style={mainStyle}>
        <div style={responsiveContainer}>
          <EspacioImagen espacio={espacioSeleccionado} />
          <form onSubmit={handleSubmit} style={formularioStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Reserva de Espacio</h2>

            <label>
              Espacio:
              <select
                value={espacioSeleccionado}
                onChange={(e) => setEspacioSeleccionado(e.target.value)}
                required
                style={inputStyle}
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
                style={{ ...inputStyle, backgroundColor: '#e0e0e0' }}
              />
            </label>

            <label>
              Tipo de reserva:
              <select
                value={tipoReserva}
                onChange={(e) => setTipoReserva(e.target.value)}
                required
                style={inputStyle}
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
                style={{ ...inputStyle, height: '80px', resize: 'none' }}
              />
            </label>

            <label>
              Horario:
              <input
                type="datetime-local"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                style={inputStyle}
              />
            </label>

            <button type="submit" style={submitButtonStyle}>
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
    <div style={imagenBoxStyle}>
      {espacio ? (
        <img
          src={`/imagenes/${espacio}.jpg`}
          alt={`Imagen de ${espacio}`}
          style={imagenStyle}
        />
      ) : (
        <span style={{ color: '#888', textAlign: 'center' }}>
          Selecciona un espacio para ver la imagen
        </span>
      )}
    </div>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      <img src="/logo.png" alt="Logo" style={logoStyle} />
      <nav style={navStyle}>
        <Link to="/user-home-page" style={navLinkStyle}>Inicio</Link>
        <Link to="/user-meeting-page" style={navLinkStyle}>Espacios de reuniones</Link>
        <Link to="/user-reservation-page" style={navLinkStyle}>Reservar espacio</Link>
        <Link to="/user-My-reservations-page" style={navLinkStyle}>Mis reservas</Link>
        <Link to="/login" style={navLinkStyle}>Cerrar sesión</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer style={footerStyle}>
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

// --- Estilos en línea ---

const containerStyle = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column' as const,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: 'white',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  borderBottom: '1px solid #ccc',
  backgroundColor: 'white',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  flexWrap: 'wrap' as const,
};

const logoStyle = {
  width: '120px',
  objectFit: 'contain' as const,
};

const navStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '10px',
  marginTop: '10px',
};

const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  fontSize: '14px',
};

const mainStyle = {
  marginTop: '120px',
  flexGrow: 1,
  padding: '20px',
};

const responsiveContainer = {
  display: 'flex',
  flexDirection: 'row' as const,
  gap: '30px',
  flexWrap: 'wrap' as const,
  justifyContent: 'center' as const,
  alignItems: 'stretch' as const,
};

const imagenBoxStyle = {
  flex: '1 1 300px',
  maxWidth: '500px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
};

const imagenStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  borderRadius: '10px',
};

const formularioStyle = {
  flex: '1 1 300px',
  maxWidth: '500px',
  backgroundColor: '#f0f0f0',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#D9D9D9',
};

const submitButtonStyle = {
  padding: '10px',
  backgroundColor: '#D9D9D9',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold' as const,
  cursor: 'pointer',
};

const footerStyle = {
  backgroundColor: '#f2f2f2',
  padding: '15px 30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #ccc',
  fontSize: '14px',
};
