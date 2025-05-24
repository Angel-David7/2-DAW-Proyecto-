import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
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
    // Limpiar error al modificar el campo correspondiente
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio.');
      return false;
    }
    if (!formData.surname.trim()) {
      setError('El apellido es obligatorio.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El correo es obligatorio.');
      return false;
    }
    // Validación básica de email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setError('El correo no es válido.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leyAceptada) {
      alert('Debes aceptar la Ley de Protección de Datos para registrarte.');
      return;
    }
    setError('');
    if (!validateForm()) return;
    setLoading(true);
    const apiUrl = '/api/auth/register';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          setError('El correo ya está registrado. Usa otro o inicia sesión.');
        } else {
          setError(data.message || 'Error en el registro');
        }
        return;
      }
      // Limpiar localStorage y mostrar mensaje de éxito
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
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
          {error.includes('nombre') && <span className="error-message">{error}</span>}
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
          {error.includes('apellido') && <span className="error-message">{error}</span>}
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
          {error.includes('correo') && <span className="error-message">{error}</span>}
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
          {error.includes('contraseña') && <span className="error-message">{error}</span>}
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

        {/* Mensaje de error general si no es de campo específico */}
        {error && !(
          error.includes('nombre') ||
          error.includes('apellido') ||
          error.includes('correo') ||
          error.includes('contraseña')
        ) && <p className="error-message">{error}</p>}
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
             La Ley de Protección de Datos protege la privacidad de las personas, 
             regulando cómo se recopilan, usan y guardan sus datos personales.
              Exige consentimiento, uso responsable y permite al usuario acceder, 
              corregir o eliminar su información.
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
