import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Definimos el componente App aquí directamente
function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#C2BEBE',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          maxWidth: '50%',
          height: '50%',
          objectFit: 'contain',
          position: 'relative',
          top: '-110px',
        }}
      />
      <a
        href="/login.html"
       
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: '50%',
          top: '70%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '9999px',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        Login
      </a>
    </div>
  );
}

// Montamos la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
