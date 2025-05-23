import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {      const response = await fetch('http://localhost:4000/api/auth/login', {
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
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <div className="register-link-wrapper">
          <span>¿Es tu primera vez?</span>
          <Link to="/register" className="register-link">Regístrate</Link>
        </div>

        <button type="submit" className="submit-btn">Iniciar Sesión</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
