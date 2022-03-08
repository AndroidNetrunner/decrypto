import { useState } from 'react';
import styled from 'styled-components';
import CodeGuess from './Components/CodeGuess';
import Hints from './Components/Hints';
import HintSubmit from './Components/HintSubmit';
import RoundResult from './Components/RoundResult';
import ScoreTable from './Components/ScoreTable';
import Timer from './Components/Timer';
import Word from './Components/Word';
import RuleModal from '../../Components/Common/RuleModal';
import Overlay from '../../Components/Common/Overlay';

type code = [number, number, number];
type hints = [string, string, string];
interface user {
  uid: string;
  nickname: string;
}
interface team {
  word: [string, string, string, string];
  hints: string[][];
  leader: user;
  players: user[];
  greenToken: number;
  redToken: number;
}

const dummy1: user = { uid: '0909', nickname: 'yeoyoon' };
const dummy2: user = { uid: '12341234', nickname: 'sjo' };
const dummy3: user = { uid: '351235', nickname: 'byukim' };
const dummy4: user = { uid: '561364', nickname: 'junseo' };

// 변하는 정보 Game 여기
const answerCode: code = [3, 1, 4];
const hints: hints = ['힌트3번', '힌트1번', '힌트4번'];
const codeGuess: code = [2, 1, 4];
const codeSteal: code = [1, 2, 3];

// 고정된 정보
const guessTeamName = 'Soviet';
const stealTeamName = 'America';
const gameLength = 15;
const captain = dummy1;

/*
Class Game -> interface america, interface Svoiet, interface Turn, gamelength, captain
*/

const america: team = {
  word: ['비트코인', '감자', '수건', '침대'],
  hints: [
    ['떡상', '강원도', '', '쿨쿨'],
    ['0x', '', '샤워', '수면'],
    ['금전', '', '물', '내방'],
  ],
  leader: dummy1,
  players: [dummy1, dummy2],
  greenToken: 1,
  redToken: 1,
};

const soviet: team = {
  word: ['제주도', '소화기', '단무지', '할아버지'],
  hints: [
    ['여행', '불', '', '허허'],
    ['대한민국', '빨강', '김밥', ''],
    ['', '안전', '노란색', '흰머리'],
  ],
  leader: dummy3,
  players: [dummy3, dummy4],
  greenToken: 1,
  redToken: 0,
};

export default function Game() {
  const currentUser: user = dummy1;
  const [gameStage, setStage] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const toggleResult = () => {
    setResultModal((prev) => !prev);
  };

  const nextStage = () => {
    setStage(gameStage + 1);
  };
  const currentStage = gameStage % 4;

  function renderByStage(stage: number, sovietLeader: user, americaLeader: user, me: user) {
    if (stage === 0 && americaLeader === me)
      return (
        <RenderingArea>
          <HintSubmit answer={answerCode} wordList={america.word} stage={nextStage} />{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 0)
      return (
        <RenderingArea>
          <Waiting>
            <p>Waiting...</p>
          </Waiting>{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 1 && americaLeader === me)
      return (
        <RenderingArea>
          <Waiting>
            <p>Waiting...</p>
          </Waiting>{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 1)
      return (
        <RenderingArea>
          <CodeGuess hints={hints} /> <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 2 && sovietLeader === me)
      return (
        <RenderingArea>
          <HintSubmit answer={answerCode} wordList={soviet.word} stage={nextStage} />{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 2)
      return (
        <RenderingArea>
          <Waiting>
            <p>Waiting...</p>
          </Waiting>{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    if (stage === 3 && sovietLeader === me)
      return (
        <RenderingArea>
          <Waiting>
            <p>Waiting...</p>
          </Waiting>{' '}
          <Timer gameTime={gameLength} />
        </RenderingArea>
      );
    return (
      <RenderingArea>
        <CodeGuess hints={hints} /> <Timer gameTime={gameLength} />
      </RenderingArea>
    );
  }

  return (
    <Container>
      {soviet.players.includes(currentUser) ? (
        <Word wordList={soviet.word} />
      ) : (
        <Word wordList={america.word} />
      )}
      <HintTokenArea>
        {renderByStage(currentStage, soviet.leader, america.leader, currentUser)}
        <ScoreTable
          sovietDecode={soviet.greenToken}
          sovietMistake={soviet.redToken}
          americaDecode={america.greenToken}
          americaMistake={america.redToken}
        />
      </HintTokenArea>
      <HintRecordArea>
        <Hints team='Soviet' hintRecord={soviet.hints} />
        <Hints team='America' hintRecord={america.hints} />
      </HintRecordArea>
      <button name='Result' onClick={toggleResult} type='button'>
        result
      </button>
      {resultModal && (
        <Overlay onClickOverlay={toggleResult}>
          <RoundResult
            answerCode={answerCode}
            hints={hints}
            codeGuess={codeGuess}
            guessTeamName={guessTeamName}
            codeSteal={codeSteal}
            stealTeamName={stealTeamName}
          />
        </Overlay>
      )}
      {/* Will turn into Modal */}
    </Container>
  );
}

/*
1. USA, Soviet 나눠서 뭘 보여줄지 결정 
  a. 내가 어떤팀에 속해있는지 확인
  b. 몇번째 라운드인지 확인
Stage 0 : America Leader 가 Hint 제출
-----> Server에 제출
Stage 1 : America Team이 Code guess 및 Soviet Team Interrupt
-----> Round 결과 모달창 + Hint 내역에 추가
Stage 2 : Soviet Leader 가 Hint 제출
-----> Server
Stage 3 : Soviet Team code guess 및 america team interrupt
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

const RuleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const RenderingArea = styled.div`
  display: flex;
  align-items: center;
`;

const Waiting = styled.div`
  font-size: 15pt;
  font-weight: bold;
  background-color: gray;
  text-align: center;
  padding: 2rem 4rem;
  border-radius: 1rem;
  border: 0.3rem white solid;
  margin-right: 2rem;
`;
