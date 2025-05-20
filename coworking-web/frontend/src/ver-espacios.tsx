import { Link } from 'react-router-dom';

const navLinkStyle = {
  padding: '8px 12px',
  backgroundColor: '#D9D9D9',
  borderRadius: '8px',
  color: 'black',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
};

function Header() {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
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
        flexWrap: 'wrap',
      }}
    >
      <img src="/logo.png" alt="Logo" style={{ width: '120px', objectFit: 'contain' }} />
      <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/user-home-page" style={navLinkStyle}>Inicio</Link>
        <Link to="/user-meeting-page" style={navLinkStyle}>Espacios de reuniones</Link>
        <Link to="/user-reservation-page" style={navLinkStyle}>Reservar espacio</Link>
        <Link to="/user-My-reservations-page" style={navLinkStyle}>Mis reservas</Link>
        <Link to="/login" style={navLinkStyle}>Cerrar sesión</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f2f2f2',
        padding: '15px 30px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        marginTop: 'auto',
      }}
    >
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

function EspacioCard({ nombre, imagen }: { nombre: string; imagen: string }) {
  return (
    <div
      style={{
        width: '250px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={imagen} alt={nombre} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <h3 style={{ margin: '10px 0', color: '#333' }}>{nombre}</h3>
        <Link to="/reservar-espacio">
          <button
            style={{
              padding: '8px 12px',
              backgroundColor: '#D9D9D9',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Reservar espacio
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function EspaciosReuniones() {
  const espacios = [
    { nombre: 'Sala A', imagen: '/imagenes/SalaA.jpg' },
    { nombre: 'Sala B', imagen: '/imagenes/SalaB.jpg' },
    { nombre: 'Auditorio', imagen: '/imagenes/Auditorio.jpg' },
    { nombre: 'Sala de Conferencias', imagen: '/imagenes/Conferencia.jpg' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
      }}
    >
      <Header />
      <main
        style={{
          marginTop: '120px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
          Espacios de reuniones
        </h1>
        <div
          style={{
            width: '90%',
            maxWidth: '1200px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {espacios.map((espacio, index) => (
            <EspacioCard key={index} nombre={espacio.nombre} imagen={espacio.imagen} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
