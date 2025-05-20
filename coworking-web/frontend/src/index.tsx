import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function IndexPage() {
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

      <Link
        to="/login"
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
      </Link>
    </div>
  );
}
