import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  padding: '10px 15px',
  borderRadius: '8px',
  backgroundColor: '#eee',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
};

function Header() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '220px',
        backgroundColor: '#ddd',
        padding: '30px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: '140px', objectFit: 'contain', marginBottom: '40px' }}
      />
      <Link to="/admin-home-page" style={navLinkStyle}>Inicio</Link>
      <Link to="/admin-Usermanagement-page" style={navLinkStyle}>Gestionar Usuarios</Link>
      <Link to="/admin-reservations-page" style={navLinkStyle}>Gestionar reservas</Link>
      <Link to="/login" style={navLinkStyle}>Cerrar sesión</Link>
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

  const handleEliminar = (usuarioIndex: number, reservaIndex: number) => {
    const updatedUsuarios = [...usuariosConReservas];
    updatedUsuarios[usuarioIndex].reservas.splice(reservaIndex, 1);
    setUsuariosConReservas(updatedUsuarios);
  };

  const handleVerReserva = (reserva: Reserva) => {
    const params = new URLSearchParams({
      fecha: reserva.fecha,
      espacio: reserva.espacio,
    });
    window.location.href = `./ver-reservas.html?${params.toString()}`;
  };

  return (
    <main
      style={{
        marginLeft: '220px', // espacio para el nav fijo
        padding: '30px 30px',
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 80px)',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
        width: '158%', // ocupa todo el ancho disponible a la derecha del sidebar
        
     
        
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: '#333',
          boxSizing: 'border-box',
          margin: '20px auto',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '30px' }}>Gestionar reservas</h1>

        {usuariosConReservas.map((usuario, userIndex) => (
          <div
            key={userIndex}
            style={{
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              textAlign: 'left',
            }}
          >
            <strong>{usuario.nombre}</strong>
            <br />
            <small>{usuario.email}</small>

            <ul style={{ marginTop: '10px', paddingLeft: '0' }}>
              {usuario.reservas.length > 0 ? (
                usuario.reservas.map((reserva, reservaIndex) => (
                  <li
                    key={reservaIndex}
                    style={{
                      listStyle: 'none',
                      marginBottom: '10px',
                      backgroundColor: '#fff',
                      padding: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      📅 {reserva.fecha} — 🏢 {reserva.espacio}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleVerReserva(reserva)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '5px',
                          border: 'none',
                          backgroundColor: '#007bff',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleEliminar(userIndex, reservaIndex)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '5px',
                          border: 'none',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li style={{ color: '#999', listStyle: 'none' }}>
                  No tiene reservas registradas.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginLeft: '220px',
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        width: '151%',
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
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
