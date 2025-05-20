import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Reserva {
  id: number;
  espacio: string;
  fecha: string;
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const nombreUsuario = 'Belinda'; // Esto normalmente vendría de autenticación

  useEffect(() => {
    const reservasGuardadas = localStorage.getItem(`reservas_${nombreUsuario}`);
    if (reservasGuardadas) {
      setReservas(JSON.parse(reservasGuardadas));
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Header />
      <main style={mainStyle}>
        <div style={reservasBoxStyle}>
          {reservas.length === 0 ? (
            <p style={emptyMessageStyle}>No tienes reservas</p>
          ) : (
            <ul style={listStyle}>
              {reservas.map((reserva) => (
                <li key={reserva.id} style={itemStyle}>
                  <strong>{reserva.espacio}</strong><br />
                  <span>{new Date(reserva.fecha).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
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

// --- Estilos ---

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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
};

const reservasBoxStyle = {
  width: '320px',
  maxHeight: '300px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '20px',
  fontSize: '14px',
  color: '#333',
  overflowY: 'auto' as const,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const emptyMessageStyle = {
  textAlign: 'center' as const,
  fontWeight: 'bold' as const,
  color: '#666',
};

const listStyle = {
  listStyle: 'none' as const,
  padding: 0,
  margin: 0,
};

const itemStyle = {
  marginBottom: '15px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
};

const footerStyle = {
  backgroundColor: '#f2f2f2',
  padding: '15px 30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #ccc',
  fontSize: '14px',
};
