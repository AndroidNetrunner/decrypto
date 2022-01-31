import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './Layouts/BaseLayout';
import GameLayout from './Layouts/GameLayout';
import Login from './Login';
import Game from './Routes/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='game' element={<GameLayout />}>
          <Route path=':roomId' element={<Game />} />
        </Route>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
