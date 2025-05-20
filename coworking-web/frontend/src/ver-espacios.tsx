import { Link } from 'react-router-dom';
import './ver-espacios.css';

function Header() {
  return (
    <header className="espacio-header">
      <img src="/logo.png" alt="Logo" />
      <nav className="nav">
        <Link to="/user-home-page" className="nav-link">Inicio</Link>
        <Link to="/user-meeting-page" className="nav-link">Espacios de reuniones</Link>
        <Link to="/user-reservation-page" className="nav-link">Reservar espacio</Link>
        <Link to="/user-My-reservations-page" className="nav-link">Mis reservas</Link>
        <Link to="/login" className="nav-link">Cerrar sesión</Link>
      </nav>
    </header>
  );
}



function EspacioCard({ nombre, imagen }: { nombre: string; imagen: string }) {
  return (
    <div className="espacio-card">
      <img src={imagen} alt={nombre} className="espacio-img" />
      <div className="espacio-info">
        <h3>{nombre}</h3>
        <Link to="/user-reservation-page">
          <button className="btn-reservar">Reservar espacio</button>
        </Link>
      </div>
    </div>
  );
}

export default function EspaciosReuniones() {
  const espacios = [
    { nombre: 'Sala A', imagen: '/imagenes/SalaA.jpg' },
    { nombre: 'Sala B', imagen: '/imagenes/SalaB.jpg' },
    { nombre: 'Auditorio', imagen: '/imagenes/Auditorio.jpg' },
    { nombre: 'Sala de Conferencias', imagen: '/imagenes/Conferencia.jpg' },
  ];

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h1>Espacios de reuniones</h1>
        <div className="espacios-container">
          {espacios.map((espacio, index) => (
            <EspacioCard key={index} nombre={espacio.nombre} imagen={espacio.imagen} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
function Footer() {
  return (
    <footer className="espacio-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}