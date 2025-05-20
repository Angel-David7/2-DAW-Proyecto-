import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Register() {
  const [leyAceptada, setLeyAceptada] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leyAceptada) {
      alert('Debes aceptar la Ley de Protección de Datos para registrarte.');
      return;
    }
    alert('Formulario enviado correctamente.');
  };

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

      {/* Formulario a la derecha */}
      <form
        onSubmit={handleSubmit}
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

        {/* Nombre */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="fullName" style={{ fontWeight: 'bold', color: 'black' }}>
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
            required
          />
        </div>

        {/* Teléfono */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="phone" style={{ fontWeight: 'bold', color: 'black' }}>
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
            required
          />
        </div>

        {/* Correo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold', color: 'black' }}>
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
            required
          />
        </div>

        {/* Contraseña */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password" style={{ fontWeight: 'bold', color: 'black' }}>
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
            required
          />
        </div>

        {/* Ley de Protección de Datos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '15px',
            color: 'black',
            marginLeft: '40px',
            marginTop: '10px',
          }}
        >
          <input
            type="checkbox"
            checked={leyAceptada}
            readOnly
            onClick={(e) => {
              e.preventDefault();
              setMostrarModal(true);
            }}
          />
          <label>
            Acepto la{' '}
            <span
              onClick={() => setMostrarModal(true)}
              style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ley de Protección de Datos
            </span>
          </label>
        </div>

        {/* Ya tienes cuenta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            fontSize: '17px',
            color: 'black',
            marginBottom: '0px',
            marginTop: '30px',
            marginLeft: '40px',
          }}
        >
          <span>¿Ya tienes una cuenta?</span>
          <Link
            to="/login"
            style={{
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Entra Aquí
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
          Registrar
        </button>
      </form>

      {/* Modal */}
      {mostrarModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setMostrarModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 0 15px rgba(0,0,0,0.3)',
              fontSize: '14px',
              color: 'black',
            }}
          >
            <h2>Ley de Protección de Datos</h2>
            <p style={{ textAlign: 'justify' }}>
              Tus datos personales serán tratados conforme a la legislación vigente en materia de protección de datos.
              Al aceptar, consientes que tus datos se utilicen con fines administrativos y de comunicación interna.
              Para más detalles, consulta nuestra política de privacidad completa.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  backgroundColor: '#ccc',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setLeyAceptada(true);
                  setMostrarModal(false);
                }}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
