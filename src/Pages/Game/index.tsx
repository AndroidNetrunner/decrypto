import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Hints from './Components/Hints';
import GameInterface from '../../Interfaces/Game.interface';
import User from '../../Interfaces/User.interface';
import RoundResult from './Components/RoundResult';
import ScoreTable from './Components/ScoreTable';
import CurrentLeader from './Components/CurrentLeader';
import Flag from '../../Components/Common/Flag';
import socket from '../../Utils/socket';
import { updateDB } from '../../Redux/reducer/updateDB';
import Word from './Components/Word';
import Overlay from '../../Components/Common/Overlay';
import RenderByStage from './Components/RenderByStage';
import TeamMemberList from './Components/TeamMemberList';
import { RootState } from '../../Redux/store/rootStore';

function getLeader(game: GameInterface, stage: number) {
  const { players } = Math.floor(stage / 2) % 2 ? game.usaTeam : game.sovietTeam;
  return players[Math.floor(stage / 4) % players.length];
}

export default function Game() {
  const game: GameInterface = useSelector((state: RootState) => state.game);
  const user: User = useSelector((state: RootState) => state.user);
  const [resultModal, setResultModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myTeam = game.sovietTeam.players.some((player: User) => player.uid === user.uid)
    ? 'sovietTeam'
    : 'usaTeam';
  socket.off('SUBMIT_HINT').on('SUBMIT_HINT', (gameInfo) => {
    dispatch(updateDB(gameInfo));
  });
  socket.off('SUBMIT_CODE').on('SUBMIT_CODE', (gameInfo) => {
    dispatch(updateDB(gameInfo));
  });
  socket.off('SHOW_RESULT').on('SHOW_RESULT', (gameInfo) => {
    dispatch(updateDB(gameInfo));
    setResultModal(true);
  });
  socket.off('NEW_ROUND').on('NEW_ROUND', (gameInfo) => {
    dispatch(updateDB(gameInfo));
    setResultModal(false);
  });
  if (
    game.sovietTeam.greenToken === 2 ||
    game.sovietTeam.redToken === 2 ||
    game.usaTeam.greenToken === 2 ||
    game.usaTeam.redToken === 2
  ) {
    socket.emit('END_GAME');
    if (game.sovietTeam.greenToken === 2 || game.usaTeam.redToken === 2) alert('SOVIET WINS!!');
    else alert('USA WINS!!!');
    navigate(`/`);
  }
  const doNothing = () => {
    console.log(' ');
  };

  return (
    <Container>
      <TopArea>
        <CurrentLeader leader={getLeader(game, game.stageNumber).nickname} />
        <ShowTeam>
          <Flag nation={myTeam === 'sovietTeam' ? 'soviet' : 'usa'} />
        </ShowTeam>
        <TeamMemberList />
      </TopArea>
      <Word />
      <HintTokenArea>
        <RenderByStage />
        <ScoreTable />
      </HintTokenArea>
      <HintRecordArea>
        <Hints team='Soviet' />
        <Hints team='usa' />
      </HintRecordArea>
      {resultModal && (
        <Overlay onClickOverlay={doNothing}>
          <RoundResult />
        </Overlay>
      )}
    </Container>
  );
}

/*
! Logic 입니당
  1. USA, Soviet 나눠서 뭘 보여줄지 결정 
    a. 내가 어떤팀에 속해있는지 확인
    b. 몇번째 라운드인지 확인
  Stage 0 : usa Leader 가 Hint 제출
  -----> Server에 제출
  Stage 1 : usa Team이 Code guess 및 Soviet Team Interrupt
  -----> Round 결과 모달창 + Hint 내역에 추가
  Stage 2 : Soviet Leader 가 Hint 제출
  -----> Server
  Stage 3 : Soviet Team code guess 및 usa team interrupt
  -----> 결과
*/

const TopArea = styled.div`
  display: flex;
  width: 100%;
`;

const ShowTeam = styled.div`
  text-align: left;
  font-size: 5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const HintTokenArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const HintRecordArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;
