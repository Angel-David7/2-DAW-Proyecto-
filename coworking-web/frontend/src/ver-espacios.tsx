import { Link } from 'react-router-dom';
import './ver-espacios.css';
import { useState, useEffect } from 'react';

function Header() {
  return (
    <header className="espacio-header">
      <img src="/logo.png" alt="Logo" />
      <nav className="nav1">
        <Link to="/user-home-page" className="nav-link1">Inicio</Link>
        <Link to="/user-meeting-page" className="nav-link1">Espacios de reuniones</Link>
        <Link to="/user-reservation-page" className="nav-link1">Reservar espacio</Link>
        <Link to="/user-My-reservations-page" className="nav-link1">Mis reservas</Link>
        <Link to="/login" className="nav-link1">Cerrar sesión</Link>
      </nav>
    </header>
  );
}



function EspacioCard({ nombre, imagen }: { nombre: string; imagen: string }) {
  return (
    <div className="espacio-card">
      <img src={imagen} alt={nombre} className="espacio-img" />
      <div className="espacio-info">
        <h3>{nombre}</h3>
        <Link to="/user-reservation-page">
          <button className="btn-reservar">Reservar espacio</button>
        </Link>
      </div>
    </div>
  );
}

interface Espacio {
  nombre: string;
  imagen: string;
}

interface EspacioAPI {
  name: string;
  location: string;
  description: string;
  capacity: number;
}

export default function EspaciosReuniones() {
  const espaciosIniciales: Espacio[] = [
    { nombre: 'Sala A', imagen: '/descargar.jpeg' },
    { nombre: 'Sala B', imagen: '/images (1).jpeg' },
    { nombre: 'Auditorio', imagen: '/images (2).jpeg' },
    { nombre: 'Sala de Conferencias', imagen: '/images.jpeg' }
  ];

  const [espacios, setEspacios] = useState<Espacio[]>(espaciosIniciales);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/spaces', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al cargar espacios');
        const data = await response.json();
        
        // Mapear los datos del servidor al formato que necesitamos
        const espaciosFormateados = data.data.map((espacio: EspacioAPI, index: number) => ({
          nombre: espacio.name || `Sala ${index + 1}`,
          imagen: espaciosIniciales[index % espaciosIniciales.length].imagen // Reutilizar imágenes cíclicamente
        }));
        
        setEspacios(espaciosFormateados);
      } catch (error) {
        console.error('Error:', error);
        // En caso de error, mantener los espacios iniciales
        setEspacios(espaciosIniciales);
      }
    };

    fetchEspacios();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content2">
        <h1>Espacios de reuniones</h1>
        <div className="espacios-container">
          {espacios.map((espacio, index) => (
            <EspacioCard key={index} nombre={espacio.nombre} imagen={espacio.imagen} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
function Footer() {
  return (
    <footer className="espacio-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}