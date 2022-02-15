<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './Layouts/BaseLayout';
import GameLayout from './Layouts/GameLayout';
import Login from './Login';
import Game from './Pages/Game';
import Word from './components/Word';
import Hints from './components/Hints';
=======
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Login'
import Heading from "./Heading"
>>>>>>> 9404545e50008babb33a5740790fb78833355b0b

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path='/game' element={<GameLayout />}>
          <Route path=':roomId' element={<Game />} />
        </Route>
        <Route path='/word' element={<Word wordList={["사과", "배", "포도", "딸기"]}/>} />
        <Route path='/hints' element={<Hints hintRecord={[["빨강", "", "보라", "케익"], ["동그라미", "노랑", "", "겨울"]]}/>} />
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Login />} />
        </Route>
        {/* FIXME: 사용자가 지정된 페이지를 제외한 다른 페이지 접속시 404 에러 보여주기 <Route path='/*' element={} /> */}
      </Routes>
    </Router>
  );
=======
  <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/lobby" element={<Heading />} />
    </Routes>
  </Router>
  )
>>>>>>> 9404545e50008babb33a5740790fb78833355b0b
}

export default App;
