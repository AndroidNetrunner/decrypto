import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Game from '../../../Interfaces/Game.interface';
import { RootState } from '../../../Redux/store/rootStore';
import CodeGuess from './CodeGuess';
import HintSubmit from './HintSubmit';
import User from '../../../Interfaces/User.interface';

// leader를 stage 로 구할 수 있는 함수.
// leader/2 가 짝수면 soviet, 홀수면 usa, leader/4 가 해당 팀의 리더
function getLeader(game: Game, stage: number) {
  const { players } = Math.floor(stage / 2) % 2 ? game.usaTeam : game.sovietTeam;
  return players[Math.floor(stage / 2) % players.length];
}

export default function RenderByStage() {
  const game = useSelector((rootState: RootState) => rootState.game);
  const stage = game.stageNumber;
  const leader = getLeader(game, stage);
  const me: User = useSelector((rootState: RootState) => rootState.user);
  const myTeam = game.sovietTeam.players.some((player: User) => player.uid === me.uid)
    ? 'sovietTeam'
    : 'usaTeam';
  console.log(game);
  console.log(`myTeam: ${myTeam}`);
  const myTeamCode = game[myTeam].codes;
  console.log(myTeamCode);
  if (stage % 4 === 0 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <HintSubmit />
      </RenderingArea>
    );
  if (stage % 4 === 0)
    return (
      <RenderingArea>
        <Waiting>
          <p>Waiting...</p>
        </Waiting>{' '}
      </RenderingArea>
    );
  if (stage % 4 === 1 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <Waiting>
          <p>Waiting...</p>
        </Waiting>{' '}
      </RenderingArea>
    );
  if (stage % 4 === 1)
    return (
      <RenderingArea>
        {!myTeamCode.length ? (
          <CodeGuess />
        ) : (
          <Waiting>
            <p>Waiting...</p>
          </Waiting>
        )}
      </RenderingArea>
    );
  if (stage % 4 === 2 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <HintSubmit />
      </RenderingArea>
    );
  if (stage % 4 === 2)
    return (
      <RenderingArea>
        <Waiting>
          <p>Waiting...</p>
        </Waiting>
      </RenderingArea>
    );
  if (stage % 4 === 3 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <Waiting>
          <p>Waiting...</p>
        </Waiting>{' '}
      </RenderingArea>
    );
  if (stage % 4 === 3)
    return (
      <RenderingArea>
        {!myTeamCode.length ? (
          <CodeGuess />
        ) : (
          <Waiting>
            <p>Waiting...</p>
          </Waiting>
        )}
      </RenderingArea>
    );
}

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
