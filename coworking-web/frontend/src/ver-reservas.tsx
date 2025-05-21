import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ver-reservas.css';

export default function Verreservas() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // 👈 Hook para navegación
  const handleVolver = () => {
    navigate('/admin-reservations-page'); // 👈 Ruta a la que quieres volver
  };

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  function Header() {
    return (
      <nav className={isMobile ? "verres-nav-mobile" : "verres-nav-desktop"}>
        <img
          src="/logo.png"
          alt="Logo"
          className={isMobile ? "verres-logo-mobile" : "verres-logo-desktop"}
        />
        <Link to="/admin-home-page" className="nav-link">Inicio</Link>
              <Link to="/admin-Usermanagement-page" className="nav-link">Gestionar Usuarios</Link>
              <Link to="/admin-reservations-page" className="nav-link">Gestionar reservas</Link>
              <Link to="/login" className="nav-link">Cerrar sesión</Link>
      </nav>
    );
  }

  function Footer() {
    return (
      <footer className="verres-footer">
        © 2025 GreenWork · Todos los derechos reservados
      </footer>
    );
  }

  function Content() {
    const params = new URLSearchParams(window.location.search);

    const [editMode, setEditMode] = useState(false);
    const [fecha, setFecha] = useState(params.get("fecha") ?? "");
    const [espacio, setEspacio] = useState(params.get("espacio") ?? "");
    const [nombre] = useState(params.get("nombre") ?? "");
    const [email] = useState(params.get("email") ?? "");
    const [horaInicio, setHoraInicio] = useState(params.get("horaInicio") ?? "");
    const [horaFin, setHoraFin] = useState(params.get("horaFin") ?? "");
    const [descripcion, setDescripcion] = useState(params.get("descripcion") ?? "");

    const handleGuardar = (e: React.FormEvent) => {
      e.preventDefault();
      setEditMode(false);
    };

    return (
      <main className={isMobile ? "verres-main-mobile" : "verres-main-desktop"}>
        <div className="verres-content-container">
          <h1>Detalles de la reserva</h1>

          {editMode ? (
            <form onSubmit={handleGuardar} className="verres-form">
              <label>Nombre del usuario:
                <input type="text" value={nombre} disabled />
              </label>
              <label>Email:
                <input type="email" value={email} disabled />
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

              <button type="submit" className="verres-submit-btn">Guardar cambios</button>
              
            </form>
          ) : (
            <>
              <div className="verres-details">
                <p><strong>👤 Usuario:</strong> {nombre}</p>
                <p><strong>📧 Email:</strong> {email}</p>
                <hr />
                <p><strong>📅 Fecha:</strong> {fecha}</p>
                <p><strong>🕒 Horario:</strong> {horaInicio} - {horaFin}</p>
                <p><strong>🏢 Espacio:</strong> {espacio}</p>
                <p><strong>📝 Descripción:</strong> {descripcion}</p>
              </div>

              <div className="verres-actions">
                <button onClick={() => setEditMode(true)} className="verres-edit-btn">
                  Modificar
                </button>
                <button onClick={handleVolver} className="verres-back-btn"> Volver</button>

              </div>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <div className="verres-page-container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
