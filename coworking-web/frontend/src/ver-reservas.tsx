import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  padding: '10px 15px',
  borderRadius: '8px',
  backgroundColor: '#eee',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
};

function Header() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '220px',
        backgroundColor: '#ddd',
        padding: '30px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: '140px', objectFit: 'contain', marginBottom: '40px' }}
      />
      <a href="/inicio-admin.html" style={navLinkStyle}>
        Inicio
      </a>
      <a href="./ver-espacios.html" style={navLinkStyle}>
        Gestionar reservas
      </a>
      <a href="/login.html" style={navLinkStyle}>
        Cerrar sesión
      </a>
    </nav>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginLeft: '220px',
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

interface Reserva {
  fecha: string;
  espacio: string;
}

interface UsuarioConReservas {
  nombre: string;
  email: string;
  reservas: Reserva[];
}

function Content() {
  const [usuariosConReservas] = useState<UsuarioConReservas[]>([
    {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      reservas: [
        { fecha: '2025-05-01', espacio: 'Sala de reuniones A' },
        { fecha: '2025-05-05', espacio: 'Oficina privada 3' },
      ],
    },
    {
      nombre: 'Ana Torres',
      email: 'ana@example.com',
      reservas: [{ fecha: '2025-05-02', espacio: 'Coworking 1' }],
    },
    {
      nombre: 'Luis García',
      email: 'luis@example.com',
      reservas: [],
    },
  ]);

  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);

  const handleVerReserva = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
  };

  return (
    <main
      style={{
        marginLeft: '220px',
        padding: '40px',
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 70px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '30px' }}>
          Gestionar reservas
        </h1>

        {usuariosConReservas.map((usuario, userIndex) => (
          <div
            key={userIndex}
            style={{
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <strong>{usuario.nombre}</strong>
            <br />
            <small>{usuario.email}</small>

            <ul style={{ marginTop: '10px', paddingLeft: '0' }}>
              {usuario.reservas.length > 0 ? (
                usuario.reservas.map((reserva, reservaIndex) => (
                  <li
                    key={reservaIndex}
                    style={{
                      listStyle: 'none',
                      marginBottom: '10px',
                      backgroundColor: '#fff',
                      padding: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleVerReserva(reserva)}
                    title="Haz clic para ver detalles"
                  >
                    📅 {reserva.fecha} — 🏢 {reserva.espacio}
                  </li>
                ))
              ) : (
                <li style={{ color: '#999', listStyle: 'none' }}>No tiene reservas registradas.</li>
              )}
            </ul>
          </div>
        ))}

        {/* Mostrar detalles de reserva seleccionada */}
        {reservaSeleccionada && (
          <div
            style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#e6f0ff',
              borderRadius: '8px',
              boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <h2>Detalles de la reserva seleccionada</h2>
            <p>
              <strong>Espacio:</strong> {reservaSeleccionada.espacio}
            </p>
            <p>
              <strong>Fecha:</strong> {reservaSeleccionada.fecha}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

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
