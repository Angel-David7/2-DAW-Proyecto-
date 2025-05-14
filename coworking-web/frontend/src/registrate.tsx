import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
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
            imageRendering: 'crisp-edges', // evita desenfoque
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Formulario a la derecha */}
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '500px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            color: 'black',
            marginBottom: '30px',
            textAlign: 'center',
            marginLeft: '10px',
          }}
        >
          Registrar
        </h1>

        <hr
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'black',
            border: 'none',
            marginBottom: '40px',
          }}
        />

        {/* Campo Nombre Completo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="fullName"
            style={{
              fontWeight: 'bold',
              color: 'black',
              
            }}
          >
            Nombre Completo:
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Introduce tu nombre completo"
            style={{
              backgroundColor: '#D9D9D9',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Campo Teléfono */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="phone"
            style={{
              fontWeight: 'bold',
              color: 'black',
              
            }}
          >
            Teléfono:
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Introduce tu teléfono"
            style={{
              backgroundColor: '#D9D9D9',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Campo Correo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="email"
            style={{
              fontWeight: 'bold',
              color: 'black',
             
            }}
          >
            Correo:
          </label>
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
          <label
            htmlFor="password"
            style={{
              fontWeight: 'bold',
              color: 'black',
              
            }}
          >
            Contraseña:
          </label>
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
            marginTop: '150px',
            marginLeft: '40px',
          }}
        >
          <span>¿Ya tienes una cuenta?</span>
          <a
            href="/login.html"
            rel="noopener noreferrer"
            style={{
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Entra Aquí?
          </a>
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
          Registrar
        </button>
      </form>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
