import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';
import User from '../../../Interfaces/User.interface';
import getLeader from '../../../Utils/getLeader';

function getCurrentState(player: User) {
  const game = useSelector((rootState: RootState) => rootState.game);
  const stage = game.stageNumber;
  const leader = getLeader(game, stage);

  if ((stage % 4 === 0 && leader.uid === player.uid) || (stage % 4 === 2 && leader.uid === player.uid)) {
    return '힌트 제출중...';
  }
  if (
    stage % 4 === 0 ||
    (stage % 4 === 1 && leader.uid === player.uid) ||
    stage % 4 === 2 ||
    (stage % 4 === 3 && leader.uid === player.uid)
  ) {
    return 'Wating...';
  }
  if (stage % 4 === 1) {
    return '코드 추측중...';
  }
  return '코드 추측중...';
}

export default function ShowState({ teamName, players }: { teamName: string; players: User[] }) {
  return (
    <Container>
      <TeamName>{teamName}</TeamName>
      {players.map((player) => (
        <StateArea>
          <Player>{player.nickname}</Player>
          <StateMessage>{getCurrentState(player)}</StateMessage>
        </StateArea>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 20rem;
  margin: 2rem;
  background-color: #b4bce3;
  border-radius: 15px;
`;

const TeamName = styled.div`
  text-align: center;
`;

const StateArea = styled.div`
  display: flex;
`;

const Player = styled.div`
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
`;

const StateMessage = styled.div`
  color: red;
`;
