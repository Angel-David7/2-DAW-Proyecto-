import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: 'white',
            }}
        >
            {/* Encabezado */}
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 30px',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: 'white',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                        width: '120px',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />
                <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <a href="/iniciousuario.html" style={navLinkStyle}>Inicio</a>
                    <a href='./ver-espacios.html'style={navLinkStyle}>Espacios de reuniones</a>
                    <a href="/Reservar-espacio.html" style={navLinkStyle}>Reservar espacio</a>
                    <a href="/mis-reservas.html" style={navLinkStyle}>Mis reservas</a>
                    <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
                </nav>
            </header>

            {/* Contenido con caja */}
            <main
                style={{
                    marginTop: '100px',
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        width: '300px',
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#333',
                    }}
                >
                    Caja de contenido
                </div>
            </main>

            {/* Pie de página */}
            <footer
                style={{
                    backgroundColor: '#f2f2f2',
                    padding: '15px 30px',
                    textAlign: 'center',
                    borderTop: '1px solid #ccc',
                    fontSize: '14px',
                }}
            >
                © 2025 GreenWork · Todos los derechos reservados
            </footer>
        </div>
    );
}

const navLinkStyle = {
    padding: '8px 12px',
    backgroundColor: '#D9D9D9',
    borderRadius: '8px',
    color: 'black',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '14px',
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
