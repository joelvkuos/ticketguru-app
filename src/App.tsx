import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Events from './pages/Events'
import TicketType from './pages/TicketType'
import Sales from './pages/Sales'
import Tickets from './pages/Tickets'
import Info from './pages/Info'
import Login from './pages/Login'
import Navbar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import { isAuthenticated } from './services/authService'

function App() {
  const location = useLocation();
  const isAuth = isAuthenticated();

  // Jos ei ole kirjautunut ja ei ole login-sivulla, ohjaa loginiin
  if (!isAuth && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickettype"
          element={
            <ProtectedRoute>
              <TicketType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
