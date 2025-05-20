import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div className="container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <Link to="/login" className="login-link">
        Login
      </Link>
    </div>
  );
}
