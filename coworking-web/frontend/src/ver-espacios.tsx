import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Estilo común para los enlaces de navegación
const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
};

// Componente Header (responsive, igual que tu ejemplo)
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
                    <a href='./ver-espacios.html'style={navLinkStyle}>Espacios de reuniones</a>
                    <a href="/Reservar-espacio.html" style={navLinkStyle}>Reservar espacio</a>
                    <a href="/mis-reservas.html" style={navLinkStyle}>Mis reservas</a>
                    <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
                </nav>
    </header>
  );
}

// Componente Footer
function Footer() {
  return (
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
  );
}

// Componente para cada espacio
function EspacioCard({ nombre, imagen }: { nombre: string; imagen: string }) {
  return (
    <div
      style={{
        width: '250px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={imagen} alt={nombre} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <h3 style={{ margin: '10px 0', color: '#333' }}>{nombre}</h3>
        <a href="/Reservar-espacio.html">
          <button
            style={{
              padding: '8px 12px',
              backgroundColor: '#D9D9D9',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Reservar espacio
          </button>
        </a>
      </div>
    </div>
  );
}

// Componente Contenido principal
function Contenido() {
  const espacios = [
    { nombre: 'Sala A', imagen: '/imagenes/SalaA.jpg' },
    { nombre: 'Sala B', imagen: '/imagenes/SalaB.jpg' },
    { nombre: 'Auditorio', imagen: '/imagenes/Auditorio.jpg' },
    { nombre: 'Sala de Conferencias', imagen: '/imagenes/Conferencia.jpg' },
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
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
        Espacios de reuniones
      </h1>
      <div
        style={{
          width: '90%',
          maxWidth: '1200px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {espacios.map((espacio, index) => (
          <EspacioCard key={index} nombre={espacio.nombre} imagen={espacio.imagen} />
        ))}
      </div>
    </main>
  );
}

// Componente principal App
function App() {
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
      <Contenido />
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
