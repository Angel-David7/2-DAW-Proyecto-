import React from 'react';
import { Link } from 'react-router-dom';
import './inicio-admin.css';

function Header() {
  return (
    <nav className="admin-nav">
      <img src="/logo.png" alt="Logo" className="admin-logo" />
      <Link to="/admin-home-page" className="admin-link">Inicio</Link>
      <Link to="/admin-Usermanagement-page" className="admin-link">Gestionar Usuarios</Link>
      <Link to="/admin-reservations-page" className="admin-link">Gestionar reservas</Link>
      <Link to="/login" className="admin-link">Cerrar sesión</Link>
    </nav>
  );
}

function Content() {
  return (
    <main className="admin-main">
      <div className="admin-content-box">
        <h1 className="admin-title">Bienvenido, Administrador</h1>
        <br />
        <section className="admin-section">
          <h2 className="admin-section-title">Gestión de Usuarios</h2>
          <p className="admin-paragraph">
            En esta sección puedes administrar toda la información relacionada con los usuarios registrados en el sistema. 
            Tendrás la capacidad de otorgar o denegar permisos a los usuarios, permitiendo controlar qué funcionalidades pueden acceder.
            Esta gestión es fundamental para mantener la seguridad y el orden en el acceso al sistema, asegurando que solo usuarios autorizados puedan utilizar las funciones disponibles.
          </p>
        </section>

        <section className="admin-section">
          <h2 className="admin-section-title">Gestión de Reservas</h2>
          <p className="admin-paragraph">
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

function Footer() {
  return (
    <footer className="admin-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}
export default function InicioAdmin() {
  return (
    <div className="inicio-admin-wrapper">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

