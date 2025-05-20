import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <nav
      style={{
        position: isMobile ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        bottom: isMobile ? 'auto' : 0,
        width: isMobile ? '100%' : '220px',
        backgroundColor: '#ddd',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        gap: '15px',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: isMobile ? 'space-around' : 'flex-start',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          width: isMobile ? '100px' : '140px',
          objectFit: 'contain',
          marginBottom: isMobile ? 0 : '30px',
        }}
      />
      <a href="/inicio-admin.html" style={navLinkStyle}>Inicio</a>
      <a href="./Gestion-usuarios.html" style={navLinkStyle}>Gestionar Usuarios</a>
      <a href="/Gestionar-reservas.html" style={navLinkStyle}>Gestionar reservas</a>
      <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
    </nav>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

function Content() {
  const params = new URLSearchParams(window.location.search);

  const [editMode, setEditMode] = useState(false);
  const [fecha, setFecha] = useState(params.get("fecha") ?? "");
  const [espacio, setEspacio] = useState(params.get("espacio") ?? "");
  const [nombre, setNombre] = useState(params.get("nombre") ?? "");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [horaInicio, setHoraInicio] = useState(params.get("horaInicio") ?? "");
  const [horaFin, setHoraFin] = useState(params.get("horaFin") ?? "");
  const [descripcion, setDescripcion] = useState(params.get("descripcion") ?? "");

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    alert("Reserva modificada correctamente (simulado).");
  };

  return (
    <main
      style={{
        marginLeft: window.innerWidth >= 768 ? '220px' : '0',
        padding: '40px 20px',
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 70px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
          Detalles de la reserva
        </h1>

        {editMode ? (
          <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Nombre del usuario:
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label> 
            <label>Fecha:
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </label>
            <label>Hora inicio:
              <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
            </label>
            <label>Hora fin:
              <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
            </label>
            <label>Espacio:
              <input type="text" value={espacio} onChange={(e) => setEspacio(e.target.value)} required />
            </label>
            <label>Descripción:
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </label>
           
            <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
              Guardar cambios
            </button>
          </form>
        ) : (
          <>
            <p><strong>👤 Usuario:</strong> {nombre}</p>
            <p><strong>📧 Email:</strong> {email}</p>
            <hr style={{ margin: '20px 0' }} />
            <p><strong>📅 Fecha:</strong> {fecha}</p>
            <p><strong>🕒 Horario:</strong> {horaInicio} - {horaFin}</p>
            <p><strong>🏢 Espacio:</strong> {espacio}</p>
            <p><strong>📝 Descripción:</strong> {descripcion}</p>
            
            

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Modificar
              </button>

              <a
                href="/Gestionar-reservas.html"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#757575',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Volver
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'");
}
