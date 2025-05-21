import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gestion-usuarios.css';

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
    <main className="admin-main">
      <div className="admin-content-box">
        <h1 className="admin-title">Bienvenido, Administrador</h1>

        {mensaje && <div className="admin-mensaje">{mensaje}</div>}

        <section className="admin-section">
          <h2 className="admin-section-title">Gestión de Usuarios</h2>
          <p className="admin-paragraph">
            A continuación puedes aprobar o rechazar los usuarios registrados. Este control es esencial para mantener el acceso ordenado y seguro en el sistema.
          </p>

          {usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-card">
              <div>
                <strong>{usuario.nombre}</strong><br />
                <span className="usuario-email">{usuario.email}</span>
              </div>
              <div className="usuario-actions">
                <button className="btn-aprobar" onClick={() => manejarAccion(usuario.nombre, 'aprobado')}>Aprobar</button>
                <button className="btn-rechazar" onClick={() => manejarAccion(usuario.nombre, 'rechazado')}>Rechazar</button>
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
    <footer className="admin-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

export default function GestionUsuarios() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
