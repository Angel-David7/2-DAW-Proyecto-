import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [leyAceptada, setLeyAceptada] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leyAceptada) {
      alert('Debes aceptar la Ley de Protección de Datos para registrarte.');
      return;
    }
    alert('Formulario enviado correctamente.');
  };

  return (
    <div className="register-container">
      {/* Imagen a la izquierda */}
      <div>
        <img src="/logo.png" alt="Logo" className="register-logo" />
      </div>

      {/* Formulario a la derecha */}
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Registro</h1>
        <hr />

        {/* Nombre */}
        <div className="field">
          <label htmlFor="fullName">Nombre Completo:</label>
          <input
            id="fullName"
            type="text"
            placeholder="Introduce tu nombre completo"
            required
          />
        </div>

        {/* Teléfono */}
        <div className="field">
          <label htmlFor="phone">Teléfono:</label>
          <input
            id="phone"
            type="tel"
            placeholder="Introduce tu teléfono"
            required
          />
        </div>

        {/* Correo */}
        <div className="field">
          <label htmlFor="email">Correo:</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="field">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            required
          />
        </div>

        {/* Ley de Protección de Datos */}
        <div
          className="register-privacy"
          onClick={() => setMostrarModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setMostrarModal(true)}}
        >
          <input
            type="checkbox"
            checked={leyAceptada}
            readOnly
          />
          <label>
            Acepto la{' '}
            <span className="underline-link">
              Ley de Protección de Datos
            </span>
          </label>
        </div>

        {/* Ya tienes cuenta */}
        <div className="register-login">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login">Entra Aquí</Link>
        </div>

        <button type="submit" className="register-button">
          Registrar
        </button>
      </form>

      {/* Modal */}
      {mostrarModal && (
        <div
          className="modal-backdrop"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Ley de Protección de Datos</h2>
            <p style={{ textAlign: 'justify' }}>
              Tus datos personales serán tratados conforme a la legislación vigente en materia de protección de datos.
              Al aceptar, consientes que tus datos se utilicen con fines administrativos y de comunicación interna.
              Para más detalles, consulta nuestra política de privacidad completa.
            </p>
            <div className="modal-buttons">
              <button
                onClick={() => setMostrarModal(false)}
                className="modal-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setLeyAceptada(true);
                  setMostrarModal(false);
                }}
                className="modal-accept"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
