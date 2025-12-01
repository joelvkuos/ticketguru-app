import { Routes, Route } from 'react-router-dom'
import './App.css'
import Events from './pages/Events'
import Navbar from './components/NavBar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
      </Routes>
    </>
  )
}

export default App
