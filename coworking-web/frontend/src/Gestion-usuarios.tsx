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
        width: 220,
        backgroundColor: '#ddd',
        padding: '30px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'flex-start',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,

        /* Responsive */
        // En pantallas pequeñas, barra arriba
        '@media (max-width: 768px)': {
          position: 'relative',
          width: '100%',
          height: 'auto',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: '15px 10px',
          bottom: 'auto',
          alignItems: 'center',
        }
      } as React.CSSProperties}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          width: 140,
          objectFit: 'contain',
          marginBottom: 40,
          // Responsive: reducir logo y margen en móvil
          // Esto no funciona en CSSProperties, luego te doy alternativa
        }}
      />
      <Link to="/admin-home-page" style={navLinkStyle}>
        Inicio
      </Link>
      <Link to="/admin-Usermanagement-page" style={navLinkStyle}>
        Gestionar Usuarios
      </Link>
      <Link to="/admin-reservations-page" style={navLinkStyle}>
        Gestionar reservas
      </Link>
      <Link to="/login" style={navLinkStyle}>
        Cerrar sesión
      </Link>
    </nav>
  );
}

function Content() {
  const [usuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, nombre: 'Ana Torres', email: 'ana@example.com' },
    { id: 3, nombre: 'Luis García', email: 'luis@example.com' },
  ]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const manejarAccion = (nombre: string, accion: 'aprobado' | 'rechazado') => {
    setMensaje(`El usuario ${nombre} ha sido ${accion}.`);
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <main
      style={{
        marginLeft: 220,
        padding: 40,
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 80px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        width: '97%',

        /* Responsive */
        '@media (max-width: 768px)': {
          marginLeft: 0,
          padding: 20,
          width: '100%',
        }
      } as React.CSSProperties}
    >
      <div
        style={{
          width: '92%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 40,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: '#333',
          textAlign: 'center',
          marginLeft: '1.5%',
          marginTop: '2%',

          /* Responsive */
          '@media (max-width: 768px)': {
            width: '100%',
            padding: 20,
            marginLeft: 0,
            marginTop: 10,
          }
        } as React.CSSProperties}
      >
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>Bienvenido, Administrador</h1>

        {mensaje && (
          <div
            style={{
              backgroundColor: '#e0f7fa',
              color: '#00796b',
              padding: '12px 16px',
              borderRadius: 6,
              fontWeight: 'bold',
              transition: 'opacity 0.3s',
              marginBottom: 20,
            }}
          >
            {mensaje}
          </div>
        )}

        <section style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: 24, color: '#444', marginBottom: 20 }}>
            Gestión de Usuarios
          </h2>

          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#555', marginBottom: 25 }}>
            A continuación puedes aprobar o rechazar los usuarios registrados. Este control es
            esencial para mantener el acceso ordenado y seguro en el sistema.
          </p>

          {usuarios.map(usuario => (
            <div
              key={usuario.id}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '15px 20px',
                borderRadius: 8,
                marginBottom: 15,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <strong>{usuario.nombre}</strong>
                <br />
                <span style={{ fontSize: 14, color: '#555' }}>{usuario.email}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => manejarAccion(usuario.nombre, 'aprobado')}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  Aprobar
                </button>
                <button
                  onClick={() => manejarAccion(usuario.nombre, 'rechazado')}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginLeft: 220,
        width: '92%',
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',

        /* Responsive */
        '@media (max-width: 768px)': {
          marginLeft: 0,
          width: '100%',
        }
      } as React.CSSProperties}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

function GestionUsuarios() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default GestionUsuarios;
