import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './Layouts/BaseLayout';
import GameLayout from './Layouts/GameLayout';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Room from './Pages/Room';
import './Styles/font.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/room' element={<GameLayout />}>
          <Route path=':roomId' element={<Room />} />
          <Route path=':roomId/start' element={<Game />} />
        </Route>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Login />} />
        </Route>
        {/* FIXME: 사용자가 지정된 페이지를 제외한 다른 페이지 접속시 404 에러 보여주기 <Route path='/*' element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
