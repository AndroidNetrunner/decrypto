import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Hints from './Components/Hints';
import GameInterface from '../../Interfaces/Game.interface';
import User from '../../Interfaces/User.interface';
import RoundResult from './Components/RoundResult';
import GameResult from './Components/GameResult';
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
import getLeader from '../../Utils/getLeader';
import usePreventLeave from '../../Hooks/usePreventLeave';

export default function Game() {
  const game: GameInterface = useSelector((state: RootState) => state.game);
  const user: User = useSelector((state: RootState) => state.user);
  const [roundResultModal, setRoundResultModal] = useState(false);
  const [gameResultModal, setGameResultModal] = useState(false);
  const dispatch = useDispatch();
  const { enablePrevent, disablePrevent } = usePreventLeave();
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
    setRoundResultModal(true);
  });
  // 서버가 endCondition 판단 후 클라이언트에게 NEW_ROUND or

  socket.off('NEW_ROUND').on('NEW_ROUND', (gameInfo) => {
    dispatch(updateDB(gameInfo));
    setRoundResultModal(false);
  });

  socket.off('END_GAME').on('END_GAME', (gameInfo) => {
    dispatch(updateDB(gameInfo));
    setGameResultModal(true);
  });
  const doNothing = () => {
    console.log(' ');
  };

  useEffect(() => {
    enablePrevent();
    return disablePrevent;
  }, []);

  return (
    <Container>
      <TopArea>
        <CurrentLeader leader={getLeader(game, game.stageNumber).nickname} />
        <ShowTeam>
          <Flag nation={myTeam === 'sovietTeam' ? 'soviet' : 'usa'} />
        </ShowTeam>
      </TopArea>
      <MiddleArea>
        <TeamMemberList />
        <Word />
      </MiddleArea>
      <HintTokenArea>
        <RenderByStage />
        <ScoreTable />
      </HintTokenArea>
      <HintRecordArea>
        <Hints team='Soviet' />
        <Hints team='usa' />
      </HintRecordArea>
      {roundResultModal && (
        <Overlay onClickOverlay={doNothing}>
          <RoundResult />
        </Overlay>
      )}
      {gameResultModal && (
        <Overlay onClickOverlay={doNothing}>
          <GameResult />
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

const MiddleArea = styled.div`
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
