import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mis-reservas.css';

interface Reserva {
  id: number;
  espacio: string;
  fecha: string;
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const nombreUsuario = 'Belinda';

  useEffect(() => {
    const reservasGuardadas = localStorage.getItem(`reservas_${nombreUsuario}`);
    if (reservasGuardadas) {
      setReservas(JSON.parse(reservasGuardadas));
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="reservas-box">
          {reservas.length === 0 ? (
            <p className="empty-message">No tienes reservas</p>
          ) : (
            <ul className="reserva-list">
              {reservas.map((reserva) => (
                <li key={reserva.id} className="reserva-item">
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

function Footer() {
  return (
    <footer className="espacio-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}
