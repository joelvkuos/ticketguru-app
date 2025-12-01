import { Routes, Route } from 'react-router-dom'
import './App.css'
import Events from './pages/Events'
import TicketType from './pages/TicketType'
import Sales from './pages/Sales'
import Tickets from './pages/Tickets'
import Navbar from './components/NavBar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/tickettype" element={<TicketType />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </>
  )
}

export default App
