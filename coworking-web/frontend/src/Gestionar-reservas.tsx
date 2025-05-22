import { useState } from 'react';
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
  fecha: string;
  espacio: string;
}

interface UsuarioConReservas {
  nombre: string;
  email: string;
  reservas: Reserva[];
}

function Content() {
  const [usuariosConReservas, setUsuariosConReservas] = useState<UsuarioConReservas[]>([
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

  const [open, setOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);

  const handleOpenModal = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setReservaSeleccionada(null);
  };

  const handleEliminar = (usuarioIndex: number, reservaIndex: number) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (!confirmar) return;

    const updatedUsuarios = [...usuariosConReservas];
    updatedUsuarios[usuarioIndex].reservas.splice(reservaIndex, 1);
    setUsuariosConReservas(updatedUsuarios);
  };

  const handleModificarReserva = (reserva: Reserva) => {
    const params = new URLSearchParams({
      fecha: reserva.fecha,
      espacio: reserva.espacio,
    });
    window.location.href = `./admin-MyBookings-page?${params.toString()}`;
  };

  return (
    <main>
      <div className="content-container">
        <h1>Gestionar reservas</h1>

        {usuariosConReservas.map((usuario, userIndex) => (
          <div key={userIndex} className="user-block">
            <strong>{usuario.nombre}</strong>
            <small>{usuario.email}</small>

            <ul className="reservas-list">
              {usuario.reservas.length > 0 ? (
                usuario.reservas.map((reserva, reservaIndex) => (
                  <li key={reservaIndex} className="reserva-item">
                    <div className="reserva-info">
                      📅 {reserva.fecha} — 🏢 {reserva.espacio}
                    </div>
                    <div className="reserva-actions">
                      <button onClick={() => handleOpenModal(reserva)} className="btn btn-ver">
                        Ver
                      </button>
                      <button onClick={() => handleModificarReserva(reserva)} className="btn btn-modificar">
                        Modificar
                      </button>
                      <button onClick={() => handleEliminar(userIndex, reservaIndex)} className="btn btn-eliminar">
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="no-reservas">No tiene reservas registradas.</li>
              )}
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
                  <strong>Fecha:</strong> {reservaSeleccionada.fecha}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Espacio:</strong> {reservaSeleccionada.espacio}
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
