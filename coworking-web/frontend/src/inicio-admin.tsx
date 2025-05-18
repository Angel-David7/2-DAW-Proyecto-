import React, { StrictMode } from 'react';
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
      <a href="/inicio-admin.html" style={navLinkStyle}>
        Inicio
      </a>
      <a href="./Gestion-usuarios.html" style={navLinkStyle}>
        Gestionar Usuarios
      </a>
      <a href="./Gestionar-reservas.html" style={navLinkStyle}>
        Gestionar reservas
      </a>
      <a href="/login.html" style={navLinkStyle}>
        Cerrar sesión
      </a>
    </nav>
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
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

function Content() {
  return (
    <main
      style={{
        marginLeft: '220px',
        padding: '40px',
        backgroundColor: '#fafafa',
        minHeight: 'calc(100vh - 60px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: '#333',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>
          Bienvenido, Administrador
        </h1>
       <br/>
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', color: '#444', marginBottom: '15px' }}>
            Gestión de Usuarios
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
            En esta sección puedes administrar toda la información relacionada con los usuarios registrados en el sistema. 
            Tendrás la capacidad de otorgar o denegar permisos a los usuarios, permitiendo controlar qué funcionalidades pueden acceder.
            Esta gestión es fundamental para mantener la seguridad y el orden en el acceso al sistema, asegurando que solo usuarios autorizados puedan utilizar las funciones disponibles.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', color: '#444', marginBottom: '15px' }}>
            Gestión de Reservas
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
            Aquí podrás supervisar todas las reservas realizadas por los usuarios para diferentes espacios o recursos. 
            Puedes ver la lista completa de reservas, eliminar las reservas que consideres necesarias, y acceder a la información detallada de cada una al pulsar el botón "Ver".
            Además, tienes la posibilidad de modificar cualquier reserva para ajustar fechas, horarios u otros detalles relevantes.
            Este control te permite optimizar el uso de los recursos disponibles, evitar conflictos de horarios y garantizar una experiencia fluida y organizada para todos los usuarios.
          </p>
        </section>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
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
