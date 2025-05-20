import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Imagen a la izquierda */}
      <div style={{ marginRight: '300px', marginBottom: '120px' }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '700px',
            height: 'auto',
            imageRendering: 'crisp-edges',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Formulario */}
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '500px',
        }}
      >
        <h1 style={{ fontSize: '32px', color: 'black', marginBottom: '50px', textAlign: 'center', marginLeft: '35px' }}>
          Iniciar sesión
        </h1>

        <hr style={{ width: '100%', height: '2px', backgroundColor: 'black', border: 'none', marginBottom: '80px' }} />

        {/* Campo Correo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold', color: 'black' }}>Correo:</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo"
            style={{
              backgroundColor: '#D9D9D9',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Campo Contraseña */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password" style={{ fontWeight: 'bold', color: 'black' }}>Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            style={{
              backgroundColor: '#D9D9D9',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            fontSize: '17px',
            color: 'black',
            marginBottom: '0px',
            marginTop: '200px',
            marginLeft: '40px',
          }}
        >
          <span>¿Es tu primera vez?</span>
          <Link
            to="/register"
            style={{
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Regístrate
          </Link>
        </div>

        <button
          type="submit"
          style={{
            width: '200px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#D9D9D9',
            color: 'black',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            marginLeft: '170px',
          }}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
