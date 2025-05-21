import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './iniciousuario.css';
import { Link } from 'react-router-dom';

const navLinkClass = "nav-link1";

function Header() {
  return (
    <header className="inicio-header">
      <img src="/logo.png" alt="Logo" />
      <nav className="nav">
        <Link to="/user-home-page" className={navLinkClass}>Inicio</Link>
        <Link to="/user-meeting-page" className={navLinkClass}>Espacios de reuniones</Link>
        <Link to="/user-reservation-page" className={navLinkClass}>Reservar espacio</Link>
        <Link to="/user-My-reservations-page" className={navLinkClass}>Mis reservas</Link>
        <Link to="/login" className={navLinkClass}>Cerrar sesión</Link>
      </nav>
    </header>
  );
}



function EspacioCard({ nombre, descripcion }: { nombre: string; descripcion: string }) {
  return (
    <div className="espacio-card">
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <Link to="/user-reservation-page" style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button>Reservar espacio</button>
      </Link>
    </div>
  );
}

function Contenido({ nombreUsuario }: { nombreUsuario: string }) {
  const espacios = [
    { nombre: 'Escritorio Flex', descripcion: 'Ideal para trabajo individual y flexible.' },
    { nombre: 'Cabina Privada', descripcion: 'Perfecta para videollamadas y máxima concentración.' },
    { nombre: 'Sala Creativa', descripcion: 'Espacio amplio para reuniones de equipo y sesiones de ideas.' },
  ];

  return (
    <main className="main-content1">
      <h1>¡Bienvenido/a, {nombreUsuario}!</h1>

      <section className="section">
        <h2>Tus reservas activas</h2>
        <p>
          Aquí puedes ver un resumen de tus reservas actuales. Si no tienes ninguna, te invitamos a realizar una nueva desde la sección “Reservar espacio”.
        </p>
      </section>

      <section className="section espacios-container">
        {espacios.map((espacio, idx) => (
          <EspacioCard key={idx} nombre={espacio.nombre} descripcion={espacio.descripcion} />
        ))}
      </section>
    </main>
  );
}

export default function InicioUsuario() {
  const usuarioReal = 'Belinda';

  return (
    <div className="app-container">
      <Header />
      <Contenido nombreUsuario={usuarioReal} />
      <Footer />
    </div>
  );
}
function Footer() {
  return (
    <footer className="inicio-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <InicioUsuario />
    </StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'");
}