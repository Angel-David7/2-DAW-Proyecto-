import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login-container">
      {/* Imagen a la izquierda */}
      <div className="logo-wrapper">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      {/* Formulario a la derecha */}
      <form className="form">
        <h1 className="form-title">Iniciar sesión</h1>

        <hr className="divider" />

        <div className="input-group">
          <label htmlFor="email">Correo:</label>
          <input id="email" type="email" placeholder="Introduce tu correo" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input id="password" type="password" placeholder="Introduce tu contraseña" />
        </div>

        <div className="register-link-wrapper">
          <span>¿Es tu primera vez?</span>
          <Link to="/register" className="register-link">
            Regístrate
          </Link>
        </div>

        <button type="submit" className="submit-btn">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
