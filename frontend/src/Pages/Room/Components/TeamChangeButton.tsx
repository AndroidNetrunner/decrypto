import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateDB } from '../../../Redux/reducer/updateDB';
import { RootState } from '../../../Redux/store/rootStore';
import { updateUser } from '../../../Redux/reducer/updateUser';
import socket from '../../../Utils/socket';
import Game from '../../../Interfaces/Game.interface';
import User from '../../../Interfaces/User.interface';

export default function TeamChangeButton() {
  const user: User = useSelector((state: RootState) => state.user);
  const game: Game = useSelector((state: RootState) => state.game);
  const [clickable, setClickable] = useState(true);
  const dispatch = useDispatch();
  const isSovietTeamUser = Boolean(game.sovietTeam.players.find((player) => player.uid === user.uid));

  const handleButtonClick = () => {
    socket.emit('CHANGE_TEAM', user, (gameInfo, userInfo) => {
      dispatch(updateDB(gameInfo));
      dispatch(updateUser(userInfo));
    });
    setClickable(false);
    setTimeout(() => {
      setClickable(true);
    }, 1000);
  };

  return (
    <Wrapper>
      <Button
        type='button'
        onClick={handleButtonClick}
        isSovietTeamUser={isSovietTeamUser}
        disabled={!clickable}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='3rem'
          height='3rem'
          version='1.1'
          viewBox='0 0 700 555'
        >
          <path d='m556.3 203.5h-223.91l61.609-61.633c13.965-13.934 21.684-32.523 21.684-52.277 0-19.75-7.7188-38.344-21.684-52.289-28.824-28.84-75.77-28.84-104.61 0l-187.83 187.85c-13.996 13.922-21.699 32.496-21.699 52.309v1.707c0 19.758 7.6602 38.305 21.582 52.219l187.93 187.93c13.961 14.012 32.547 21.746 52.348 21.746 19.773 0 38.371-7.7344 52.227-21.621 14-13.977 21.746-32.559 21.746-52.344 0-19.75-7.6953-38.309-21.684-52.328l-61.566-61.602h223.87c40.641 0 73.703-33.566 73.703-74.848-0.007812-41.246-33.07-74.816-73.711-74.816z' />
        </svg>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button<{ isSovietTeamUser: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 1rem;
  background-color: ${(props) => (props.isSovietTeamUser ? '#9EBDF0' : '#f15852')};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.isSovietTeamUser ? '#9EBDF0' : '#f15852')};
  }
  &:active {
    transform: scale(0.95);
  }
  svg {
    fill: white;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isSovietTeamUser ? 'rotateY(180deg)' : '')};
  }
`;
