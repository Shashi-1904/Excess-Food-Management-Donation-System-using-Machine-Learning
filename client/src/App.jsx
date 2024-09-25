import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Homepage></Homepage>

    </>
  )
}

export default App
