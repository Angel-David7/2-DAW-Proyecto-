import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gestion-usuarios.css';

interface Usuario {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  validated: boolean;
  created_at: string;
}

function Header() {
  return (
    <nav className="admin-nav">
      <img src="/logo.png" alt="Logo" className="admin-logo" />
      <Link to="/admin-home-page" className="admin-link">Inicio</Link>
      <Link to="/admin-Usermanagement-page" className="admin-link">Gestionar Usuarios</Link>
      <Link to="/admin-reservations-page" className="admin-link">Gestionar reservas</Link>
      <Link to="/login" className="admin-link">Cerrar sesión</Link>
    </nav>
  );
}

function Content() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay token de autenticación. Por favor, inicia sesión de nuevo.');
          return;
        }

        console.log('Token:', token); // Para depuración
        const response = await fetch('http://localhost:4000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }

        const data = await response.json();
        setUsuarios(data.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar los usuarios. Por favor, intente de nuevo.');
      }
    };

    fetchUsuarios();
  }, []);  const manejarAccion = async (id: number, nombre: string, accion: 'aprobado' | 'rechazado') => {
    try {
      const token = localStorage.getItem('token');
      
      // Solo permitimos cambiar el estado si:
      // 1. El usuario está pendiente (validated es null)
      // 2. El usuario está rechazado (validated es false) y la acción es aprobar
      // 3. El usuario está validado (validated es true) y la acción es rechazar
      const usuario = usuarios.find(u => u.id === id);
      if (!usuario) return;

      if (accion === 'rechazado' && usuario.validated === false) {
        // Ya está rechazado, no hacemos nada
        return;
      }

      // Actualizamos el usuario en el estado local primero
      setUsuarios(usuarios.map(u => {
        if (u.id === id) {
          return { ...u, validated: accion === 'aprobado' ? true : false };
        }
        return u;
      }));

      const response = await fetch(`http://localhost:4000/api/admin/users/${id}/validate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          validated: accion === 'aprobado'
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      // Refrescar la lista de usuarios
      const responseUsers = await fetch('http://localhost:4000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!responseUsers.ok) {
        throw new Error('Error al recargar usuarios');
      }      const data = await responseUsers.json();
      console.log('Datos actualizados recibidos:', data);
      setUsuarios(data.data);
      setMensaje(`El usuario ${nombre} ha sido ${accion}.`);
      setTimeout(() => setMensaje(null), 4000);
    } catch (err) {
      console.error('Error:', err);
      setError(`Error al ${accion === 'aprobado' ? 'aprobar' : 'rechazar'} el usuario.`);
      setTimeout(() => setError(null), 4000);
    }
  };

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <main className="admin-main">
      <div className="admin-content-box">
        <h1 className="admin-title">Bienvenido, Administrador</h1>

        {mensaje && <div className="admin-mensaje">{mensaje}</div>}

        <section className="admin-section">
          <h2 className="admin-section-title">Gestión de Usuarios</h2>
          <p className="admin-paragraph">
            A continuación puedes aprobar o rechazar los usuarios registrados. Este control es esencial para mantener el acceso ordenado y seguro en el sistema.
          </p>

          {usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-card">              <div>
                <strong>{usuario.name} {usuario.surname}</strong><br />
                <span className="usuario-email">{usuario.email}</span>                <span className={`usuario-status ${usuario.validated === false ? 'rechazado' : usuario.validated ? 'validado' : 'pendiente'}`}>
                  Estado: {usuario.validated === false ? 'Rechazado' : usuario.validated ? 'Validado' : 'Pendiente'}
                </span>
              </div>
              <div className="usuario-actions">                <button 
                  className="btn-aprobar" 
                  onClick={() => manejarAccion(usuario.id, usuario.name, 'aprobado')}
                  disabled={usuario.validated}
                >
                  Aprobar
                </button>                <button 
                  className="btn-rechazar" 
                  onClick={() => manejarAccion(usuario.id, usuario.name, 'rechazado')}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="admin-footer">
      © 2025 GreenWork · Todos los derechos reservados
    </footer>
  );
}

export default function GestionUsuarios() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
