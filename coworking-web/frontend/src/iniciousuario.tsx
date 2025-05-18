import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Estilo común para enlaces de navegación
const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
};

// Header responsivo
function Header() {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
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
        flexWrap: 'wrap',
      }}
    >
      <img src="/logo.png" alt="Logo" style={{ width: '120px', objectFit: 'contain' }} />
      <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <a href="/iniciousuario.html" style={navLinkStyle}>Inicio</a>
        <a href="./ver-espacios.html" style={navLinkStyle}>Espacios de reuniones</a>
        <a href="/Reservar-espacio.html" style={navLinkStyle}>Reservar espacio</a>
        <a href="/mis-reservas.html" style={navLinkStyle}>Mis reservas</a>
        <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
      </nav>
    </header>
  );
}

// Footer sencillo
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        marginTop: 'auto',
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

// Tarjeta para cada espacio destacado
function EspacioCard({ nombre, descripcion }: { nombre: string; descripcion: string }) {
  return (
    <div
      style={{
        width: '250px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{nombre}</h3>
      <p style={{ fontSize: '14px', lineHeight: 1.4, color: '#555' }}>{descripcion}</p>
      <a href="/Reservar-espacio.html" style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button
          style={{
            padding: '8px 12px',
            backgroundColor: '#D9D9D9',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Reservar espacio
        </button>
      </a>
    </div>
  );
}

// Contenido principal, con bienvenida, reservas y espacios destacados en tarjetas
function Contenido({ nombreUsuario }: { nombreUsuario: string }) {
  const espacios = [
    { nombre: 'Escritorio Flex', descripcion: 'Ideal para trabajo individual y flexible.' },
    { nombre: 'Cabina Privada', descripcion: 'Perfecta para videollamadas y máxima concentración.' },
    { nombre: 'Sala Creativa', descripcion: 'Espacio amplio para reuniones de equipo y sesiones de ideas.' },
  ];

  return (
    <main
      style={{
        marginTop: '120px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 200px - 20px)', // header + footer aprox
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', color: '#333', textAlign: 'center' }}>
        ¡Bienvenido/a, {nombreUsuario}!
      </h1>

      <section
        style={{
          width: '90%',
          maxWidth: '900px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '60px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: '15px', color: '#222' }}>Tus reservas activas</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#555' }}>
          Aquí puedes ver un resumen de tus reservas actuales. Si no tienes ninguna, te invitamos a realizar una nueva desde la sección “Reservar espacio”.
        </p>
      </section>

      <section
        style={{
          width: '90%',
          maxWidth: '900px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {espacios.map((espacio, idx) => (
          <EspacioCard key={idx} nombre={espacio.nombre} descripcion={espacio.descripcion} />
        ))}
      </section>
    </main>
  );
}

// App principal
function App() {
  const usuarioReal = 'Belinda';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
      }}
    >
      <Header />
      <Contenido nombreUsuario={usuarioReal} />
      <Footer />
    </div>
  );
}

// Renderizado
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
