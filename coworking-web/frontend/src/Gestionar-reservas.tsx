import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography } from '@mui/material';
import './Gestionar-reservas.css';

function Header() {
  return (
    <nav className='nav2'>
      <img src="/logo.png" alt="Logo" />
      <Link to="/admin-home-page" className="nav-link">Inicio</Link>
      <Link to="/admin-Usermanagement-page" className="nav-link">Gestionar Usuarios</Link>
      <Link to="/admin-reservations-page" className="nav-link">Gestionar reservas</Link>
      <Link to="/login" className="nav-link">Cerrar sesión</Link>
    </nav>
  );
}

interface Reserva {
  id: number;
  userId: number;
  spaceId: string;
  spaceName: string;
  userName: string;
  userEmail: string;
  scheduleTime: string;
  reservationType: string;
  description: string;
  cost: number;
  status: string;
}

function Content() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [, setIsLoading] = useState(true);
 
  const [open, setOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/admin/reservations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar las reservas');
        }

        const data = await response.json();
        setReservas(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err);
        
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleOpenModal = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setReservaSeleccionada(null);
  };

  const handleEliminar = async (reservaId: number) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/admin/reservations/{id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reserva');
      }

      setReservas(reservas.filter(r => r.id !== reservaId));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al eliminar la reserva');
    }
  };

  const handleModificarEstado = async (reservaId: number, nuevoEstado: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/admin/reservations/{id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nuevoEstado })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado de la reserva');
      }

      const reservaActualizada = await response.json();
      setReservas(reservas.map(r => r.id === reservaId ? reservaActualizada : r));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al actualizar el estado de la reserva');
    }
  };

  const handleModificarReserva = (reserva: Reserva) => {
    const params = new URLSearchParams({
      fecha: reserva.scheduleTime,
      espacio: reserva.spaceName,
    });
    window.location.href = `./admin-MyBookings-page?${params.toString()}`;
  };

  return (
    <main>
      <div className="content-container">
        <h1>Gestionar reservas</h1>

        {reservas.map((reserva, reservaIndex) => (
          <div key={reservaIndex} className="user-block">
            <strong>{reserva.userName}</strong>
            <small>{reserva.userEmail}</small>

            <ul className="reservas-list">
              <li className="reserva-item">
                <div className="reserva-info">
                  📅 {reserva.scheduleTime} — 🏢 {reserva.spaceName}
                </div>
                <div className="reserva-actions">
                  <button onClick={() => handleOpenModal(reserva)} className="btn btn-ver">
                    Ver
                  </button>
                  <button onClick={() => handleModificarReserva(reserva)} className="btn btn-modificar">
                    Modificar
                  </button>
                  <button onClick={() => handleEliminar(reserva.id)} className="btn btn-eliminar">
                    Eliminar
                  </button>
                  <button onClick={() => handleModificarEstado(reserva.id, 'NuevoEstado')} className="btn btn-estado">
                    Cambiar Estado
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}

        {/* Modal para detalles de reserva */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box className="modal-box">
            <Typography variant="h6">Detalles de la reserva</Typography>
            {reservaSeleccionada && (
              <>
                <Typography sx={{ mt: 2 }}>
                  <strong>Fecha:</strong> {reservaSeleccionada.scheduleTime}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Espacio:</strong> {reservaSeleccionada.spaceName}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </main>
  );
}

function Footer() {
  return <footer>© 2025 GreenWork · Todos los derechos reservados</footer>;
}

export default function Gestionarreservas() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
