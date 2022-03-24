import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Game from '../../../Interfaces/Game.interface';
import { RootState } from '../../../Redux/store/rootStore';
import CodeGuess from './CodeGuess';
import HintSubmit from './HintSubmit';
import User from '../../../Interfaces/User.interface';
import Waiting from './Waiting';

// leader를 stage 로 구할 수 있는 함수.
// leader/2 가 짝수면 soviet, 홀수면 usa, leader/4 가 해당 팀의 리더
function getLeader(game: Game, stage: number) {
  const { players } = Math.floor(stage / 2) % 2 ? game.usaTeam : game.sovietTeam;
  return players[Math.floor(stage / 4) % players.length];
}
export default function RenderByStage() {
  const game = useSelector((rootState: RootState) => rootState.game);
  const stage = game.stageNumber;
  const leader = getLeader(game, stage);
  const me: User = useSelector((rootState: RootState) => rootState.user);
  const myTeam = game.sovietTeam.players.some((player: User) => player.uid === me.uid)
    ? 'sovietTeam'
    : 'usaTeam';
  const myTeamCode = game[myTeam].codes;
  if (stage % 4 === 0 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <HintSubmit />
      </RenderingArea>
    );
  if (stage % 4 === 0)
    return (
      <RenderingArea>
        <Waiting />
      </RenderingArea>
    );
  if (stage % 4 === 1 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <Waiting />
      </RenderingArea>
    );
  if (stage % 4 === 1)
    return <RenderingArea>{!myTeamCode.length ? <CodeGuess /> : <Waiting />}</RenderingArea>;
  if (stage % 4 === 2 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <HintSubmit />
      </RenderingArea>
    );
  if (stage % 4 === 2)
    return (
      <RenderingArea>
        <Waiting />
      </RenderingArea>
    );
  if (stage % 4 === 3 && leader.uid === me.uid)
    return (
      <RenderingArea>
        <Waiting />
      </RenderingArea>
    );
  return <RenderingArea>{!myTeamCode.length ? <CodeGuess /> : <Waiting />}</RenderingArea>;
}

const RenderingArea = styled.div`
  display: flex;
  align-items: center;
`;
