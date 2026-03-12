import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Reservations } from "./pages/Reservations";
import { Carta } from "./pages/Carta";
import { Galeria } from "./pages/Galeria";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ConfirmReservation } from './pages/ConfirmReservation';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "reservas", Component: Reservations },
      { path: "carta", Component: Carta },
      { path: "galeria", Component: Galeria },
      { path: "confirmar/:id", Component: ConfirmReservation },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
