import { Routes, Route } from 'react-router-dom'
import './App.css'
import Events from './pages/Events'
import TicketType from './pages/TicketType'
import Sales from './pages/Sales'
import Navbar from './components/NavBar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/tickettype" element={<TicketType />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </>
  )
}

export default App
