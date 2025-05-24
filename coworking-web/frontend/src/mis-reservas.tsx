import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mis-reservas.css';

interface Reserva {
  id: number;
  space_id: number;
  user_id: number;
  start_time: string;
  end_time: string;
  status: string;
  space_name?: string; // Campo adicional que podríamos necesitar
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay token de autenticación');
          return;
        }

        console.log('Obteniendo reservas...');
        const apiUrl = '/api/reservations';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar las reservas');
        }        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (Array.isArray(data)) {
          setReservas(data);
        } else if (data.data && Array.isArray(data.data)) {
          setReservas(data.data);
        } else {
          console.error('Formato de datos inesperado:', data);
          setError('Error en el formato de los datos');
        }
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
        setError('Error al cargar las reservas. Por favor, intente de nuevo.');
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
            <ul className="reserva-list">              {reservas.map((reserva) => (
                <li key={reserva.id} className="reserva-item">
                  <div className="reserva-header">
                    <strong>Espacio {reserva.space_id}</strong>
                    <span className={`reserva-status ${reserva.status.toLowerCase()}`}>
                      {reserva.status}
                    </span>
                  </div>
                  <div className="reserva-details">
                    <p><strong>Fecha de inicio:</strong> {new Date(reserva.start_time).toLocaleString()}</p>
                    <p><strong>Fecha de fin:</strong> {new Date(reserva.end_time).toLocaleString()}</p>
                    <p><strong>Estado:</strong> {reserva.status}</p>
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
