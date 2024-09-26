import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
