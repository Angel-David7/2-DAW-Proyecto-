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
  user_id: number;
  space_id: number;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  user: string;  // nombre del usuario
  space: string; // nombre del espacio
}

function Content() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
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
        }        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setReservas(data.data);
        } else {
          console.error('Formato de datos inesperado:', data);
          throw new Error('Formato de datos inesperado');
        }
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
      const response = await fetch(`http://localhost:4000/api/admin/reservations/${reservaId}`, {
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
  const handleModificarReserva= (reserva: Reserva) => {
    const params = new URLSearchParams({
      fecha: reserva.start_time,
      espacio: reserva.space,
    });
    window.location.href = `./admin-MyBookings-page?${params.toString()}`;
  };

  return (
    <main>
      <div className="content-container">
        <h1>Gestionar reservas</h1>

        {isLoading ? (
          <div>Cargando reservas...</div>
        ) : reservas.length === 0 ? (
          <div>No hay reservas disponibles</div>
        ) : (
          reservas.map((reserva) => (
            <div key={reserva.id} className="user-block">
              <strong>{reserva.user}</strong>
              <small>ID de Reserva: {reserva.id}</small>

              <ul className="reservas-list">
                <li className="reserva-item">
                  <div className="reserva-info">
                    🏢 Espacio: {reserva.space}<br/>
                    📅 Inicio: {new Date(reserva.start_time).toLocaleString()}<br/>
                    📅 Fin: {new Date(reserva.end_time).toLocaleString()}<br/>
                    📋 Estado: {reserva.status}
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
                  </div>
                </li>
              </ul>
            </div>
          ))
        )}

        {/* Modal para detalles de reserva */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box className="modal-box">
            <Typography variant="h6">Detalles de la reserva</Typography>
            {reservaSeleccionada && (
              <>
                <Typography sx={{ mt: 2 }}>
                  <strong>ID de Reserva:</strong> {reservaSeleccionada.id}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Usuario:</strong> {reservaSeleccionada.user}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Espacio:</strong> {reservaSeleccionada.space}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Fecha y hora de inicio:</strong> {new Date(reservaSeleccionada.start_time).toLocaleString()}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Fecha y hora de fin:</strong> {new Date(reservaSeleccionada.end_time).toLocaleString()}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Estado:</strong> {reservaSeleccionada.status}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Fecha de creación:</strong> {new Date(reservaSeleccionada.created_at).toLocaleString()}
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
