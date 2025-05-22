import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
  };
  token: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [leyAceptada, setLeyAceptada] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leyAceptada) {
      alert('Debes aceptar la Ley de Protección de Datos para registrarte.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
  
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div>
        <img src="/logo.png" alt="Logo" className="register-logo" />
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <h1>Registro</h1>
        <hr />

        <div className="field">
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Introduce tu nombre"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="surname">Apellido:</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Introduce tu apellido"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Correo:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Introduce tu correo"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>

        <div
          className="register-privacy"
          onClick={() => setMostrarModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMostrarModal(true) }}
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

        <div className="register-login">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login">Entra Aquí</Link>
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

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
              Tus datos personales serán tratados conforme a la legislación vigente...
            </p>
            <div className="modal-buttons">
              <button onClick={() => setMostrarModal(false)} className="modal-cancel">
                Cancelar
              </button>
              <button onClick={() => {
                setLeyAceptada(true);
                setMostrarModal(false);
              }} className="modal-accept">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
