import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: '#eee',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
};

function Header() {
    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '220px',
                backgroundColor: '#ddd',
                padding: '30px 20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'flex-start',
                fontFamily: 'Arial, sans-serif',
                zIndex: 1000,
            }}
        >
            <img
                src="/logo.png"
                alt="Logo"
                style={{ width: '140px', objectFit: 'contain', marginBottom: '40px' }}
            />
            <a href="/inicio-admin.html" style={navLinkStyle}>Inicio</a>
            <a href="./Gestion-usuarios.html" style={navLinkStyle}>Gestionar Usuarios</a>
            <a href="./Gestionar-reservas.html" style={navLinkStyle}>Gestionar reservas</a>
            <a href="/login.html" style={navLinkStyle}>Cerrar sesión</a>
        </nav>
    );
}

function Footer() {
    return (
        <footer
            style={{
                marginLeft: '220px',
                backgroundColor: '#f2f2f2',
                padding: '15px 30px',
                textAlign: 'center',
                borderTop: '1px solid #ccc',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            © 2025 GreenWork · Todos los derechos reservados
        </footer>
    );
}

function Content() {
    const [usuarios] = useState([
        { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, nombre: 'Ana Torres', email: 'ana@example.com' },
        { id: 3, nombre: 'Luis García', email: 'luis@example.com' },
    ]);
    const [mensaje, setMensaje] = useState<string | null>(null);

    const manejarAccion = (nombre: string, accion: 'aprobado' | 'rechazado') => {
        setMensaje(`El usuario ${nombre} ha sido ${accion}.`);
        setTimeout(() => setMensaje(null), 4000);
    };

    return (
        <main
            style={{
                marginLeft: '220px',
                padding: '40px',
                backgroundColor: '#fafafa',
                minHeight: 'calc(100vh - 60px)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    width: '100%',
                    minHeight: '400px', // altura aumentada
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '40px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    fontFamily: 'Arial, sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333' }}>
                    Bienvenido, Administrador
                </h1>

                {mensaje && (
                    <div
                        style={{
                            backgroundColor: '#e0f7fa',
                            color: '#00796b',
                            padding: '12px 16px',
                            borderRadius: '6px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {mensaje}
                    </div>
                )}

                <div>
                    <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#444' }}>
                        Gestionar los usuarios
                    </h2>

                    {usuarios.map(usuario => (
                        <div
                            key={usuario.id}
                            style={{
                                backgroundColor: '#f5f5f5',
                                padding: '15px 20px',
                                borderRadius: '8px',
                                marginBottom: '15px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <strong>{usuario.nombre}</strong><br />
                                <span style={{ fontSize: '14px', color: '#555' }}>{usuario.email}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => manejarAccion(usuario.nombre, 'aprobado')}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Aprobar
                                </button>
                                <button
                                    onClick={() => manejarAccion(usuario.nombre, 'rechazado')}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

function App() {
    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    console.error("No se encontró el elemento con id 'root'");
}
