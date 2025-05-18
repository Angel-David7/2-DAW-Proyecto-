import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

interface Reserva {
  id: number;
  espacio: string;
  fecha: string;
}

const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
};

function App() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const nombreUsuario = 'Belinda';

  // Cargar reservas del localStorage
  useEffect(() => {
    const reservasGuardadas = localStorage.getItem(`reservas_${nombreUsuario}`);
    if (reservasGuardadas) {
      setReservas(JSON.parse(reservasGuardadas));
    }
  }, []);

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
          <a href="/iniciousuario.html" style={navLinkStyle}>Inicio</a>
          <a href="./ver-espacios.html" style={navLinkStyle}>Espacios de reuniones</a>
          <a href="/Reservar-espacio.html" style={navLinkStyle}>Reservar espacio</a>
          <a href="/mis-reservas.html" style={navLinkStyle}>Mis reservas</a>
          <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
        </nav>
      </header>

      {/* Contenido con caja */}
      <main
        style={{
          marginTop: '100px',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '200px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            fontSize: '14px',
            color: '#333',
            overflowY: 'auto',
          }}
        >
          {reservas.length === 0 ? (
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>No tienes reservas</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {reservas.map((reserva) => (
                <li key={reserva.id} style={{ marginBottom: '10px' }}>
                  <strong>{reserva.espacio}</strong><br />
                  <span>{new Date(reserva.fecha).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
