import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const apiUrl = '/api/auth/login';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) {
      setEmailError('El correo es obligatorio.');
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError('El correo no es válido.');
      valid = false;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    if (!validateForm()) return;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error al iniciar sesión');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/admin-home-page');
      } else {
        navigate('/user-home-page');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Iniciar sesión</h1>
        <hr className="divider" />

        <div className="input-group">
          <label htmlFor="email">Correo:</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setError('');
            }}
            required />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
              setError('');
            }}
            required />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>

        <div className="register-link-wrapper">
          <span>¿Es tu primera vez?</span>
          <Link to="/register" className="register-link">Regístrate</Link>
        </div>

        <button type="submit" className="submit-btn">Iniciar Sesión</button>

        {error && !emailError && !passwordError && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
