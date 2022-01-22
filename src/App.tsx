import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
