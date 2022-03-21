import { useState } from 'react';
import styled from 'styled-components';
import Hints from './Components/Hints';
import RoundResult from './Components/RoundResult';
import ScoreTable from './Components/ScoreTable';
import Word from './Components/Word';
import Overlay from '../../Components/Common/Overlay';
import RenderByStage from './Components/RenderByStage';
import { RootState } from '../../Redux/store/rootStore';

export default function Game() {
  const [resultModal, setResultModal] = useState(false);
  const toggleResult = () => {
    setResultModal((prev) => !prev);
  };

  return (
    <Container>
      <Word />
      <HintTokenArea>
        <RenderByStage />
        <ScoreTable />
      </HintTokenArea>
      <HintRecordArea>
        <Hints team='Soviet' />
        <Hints team='usa' />
      </HintRecordArea>
      <button name='Result' onClick={toggleResult} type='button'>
        result
      </button>
      {resultModal && (
        <Overlay onClickOverlay={toggleResult}>
          <RoundResult />
        </Overlay>
      )}
      {/* Will turn into Modal */}
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

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2e3c7e;
  justify-content: center;
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
