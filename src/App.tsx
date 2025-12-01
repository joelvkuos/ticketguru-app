import { Routes, Route } from 'react-router-dom'
import './App.css'
import Events from './pages/Events'
import TicketType from './pages/TicketType'
import Navbar from './components/NavBar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/tickettype" element={<TicketType />} />
      </Routes>
    </>
  )
}

export default App
