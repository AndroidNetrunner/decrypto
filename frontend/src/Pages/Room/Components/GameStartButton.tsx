import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateDB } from '../../../Redux/reducer/updateDB';
import { RootState } from '../../../Redux/store/rootStore';
import socket from '../../../Utils/socket';
import Game from '../../../Interfaces/Game.interface';
import User from '../../../Interfaces/User.interface';

export default function GameStartButton() {
  const game: Game = useSelector((state: RootState) => state.game);
  const user: User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickStartButton = () => {
    if (game.sovietTeam.players.length < 2 || game.usaTeam.players.length < 2 || !user.captain) {
      return;
    }
    socket.emit('GAME_START', (gameInfo) => {
      dispatch(updateDB(gameInfo));
      navigate(`/room/${game.roomId}/start`);
    });
  };

  return (
    <Button
      disabled={game.sovietTeam.players.length < 2 || game.usaTeam.players.length < 2}
      type='button'
      onClick={onClickStartButton}
    >
      Start
    </Button>
  );
}

const Button = styled.button`
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  font-size: 2rem;
  padding: 1.5rem 8rem;
  background-color: #ffdf86;
  border: 3px solid #e4dbff;
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: ${(props) => (props.disabled ? '' : 'scale(0.95)')};
  }
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    opacity: 0.65;
    filter: blur(1px);
  }
`;
