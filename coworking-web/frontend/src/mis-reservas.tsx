import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mis-reservas.css';

interface Reserva {
  id: number;
  spaceId: string;
  spaceName: string;
  scheduleTime: string;
  reservationType: string;
  description: string;
  cost: number;
  status: string;
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (!token || !user.id) {
          setError('Usuario no autenticado');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/reservations?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar las reservas');
        }

        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar las reservas');
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="app-container">
      <Header />      <main className="main-content1">
        <div className="reservas-box">
          {error ? (
            <p className="error-message">{error}</p>
          ) : reservas.length === 0 ? (
            <p className="empty-message">No tienes reservas</p>
          ) : (
            <ul className="reserva-list">
              {reservas.map((reserva) => (
                <li key={reserva.id} className="reserva-item">
                  <div className="reserva-header">
                    <strong>{reserva.spaceName}</strong>
                    <span className="reserva-status">{reserva.status}</span>
                  </div>
                  <div className="reserva-details">
                    <p><strong>Tipo:</strong> {reserva.reservationType}</p>
                    <p><strong>Fecha:</strong> {new Date(reserva.scheduleTime).toLocaleString()}</p>
                    <p><strong>Costo:</strong> ${reserva.cost.toLocaleString()}</p>
                    <p><strong>Descripción:</strong> {reserva.description}</p>
                  </div>
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
        <Link to="/user-home-page" className="nav-link1">Inicio</Link>
        <Link to="/user-meeting-page" className="nav-link1">Espacios de reuniones</Link>
        <Link to="/user-reservation-page" className="nav-link1">Reservar espacio</Link>
        <Link to="/user-My-reservations-page" className="nav-link1">Mis reservas</Link>
        <Link to="/login" className="nav-link1">Cerrar sesión</Link>
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
