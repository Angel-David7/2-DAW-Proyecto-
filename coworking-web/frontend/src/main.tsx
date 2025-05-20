import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importa tus páginas
import App from "./index.tsx";
import Login from "./login";
import Registrate from "./register";
import InicioUsuario from "./iniciousuario";
import EspaciosReuniones from './ver-espacios';
import ReservarEspacio from './Reservar-espacio';
import MisReservas from './mis-reservas';
import AdminInicio  from "./inicio-admin.tsx";
import GestionUsuarios from "./Gestion-usuarios.tsx";
import Gestionarreservas from "./Gestionar-reservas.tsx";

// Define rutas
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  {path: "/register", element: <Registrate />},
  {path: "/user-home-page", element: <InicioUsuario />},
  {path:"/user-meeting-page", element:<EspaciosReuniones />},
  {path:"/user-reservation-page", element:<ReservarEspacio />},
  {path:"/user-My-reservations-page", element:<MisReservas />},

  {path:"/admin-home-page", element:<AdminInicio />},
  {path:"/admin-Usermanagement-page", element:<GestionUsuarios />},
  {path:"/admin-reservations-page", element:<Gestionarreservas />},

]);

// Renderizado
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
