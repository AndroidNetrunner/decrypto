import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Login'
import OpponentHints from './components/OpponentHints'
import ScoreTable from './components/ScoreTable'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/hidden" element={<OpponentHints hints={[['폭포','나무'], ['꿈', '시계'], ['사랑','태양'], ['눈','시련']]}/>} />
    <Route path="/scoreTable" element={<ScoreTable hints={[['폭포','나무'], ['꿈', '시계'], ['사랑','태양'], ['눈','시련']]}/>} />
    </Routes>
  </Router>
  )
}

export default App
