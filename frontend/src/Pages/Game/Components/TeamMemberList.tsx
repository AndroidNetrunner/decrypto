import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../Redux/store/rootStore';
import User from '../../../Interfaces/User.interface';

function TeamMemberList() {
  const sovietPlayers = useSelector((rootState: RootState) => rootState.game.sovietTeam.players);
  const usaPlayers = useSelector((rootState: RootState) => rootState.game.usaTeam.players);
  return (
    <TeamContainer>
      <Team color='#f15852'>
        <div className='Soviet title'>Soviet</div>
        {sovietPlayers.map((player: User) => (
          <div className='Soviet'>{player.nickname}</div>
        ))}
      </Team>
      <Team color='#5685d0'>
        <div className='USA title'>USA</div>
        {usaPlayers.map((player: User) => (
          <div className='USA'>{player.nickname}</div>
        ))}
      </Team>
    </TeamContainer>
  );
}

const TeamContainer = styled.div`
  width: 10%;
  display: table;
  table-layout: fixed;
  word-break: break-all;
`;

const Team = styled.div`
  font-size: 175%;
  text-align: center;
  display: table-cell;
  div {
    background-color: ${(props) => props.color};
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .title {
    font-weight: bold;
  }
`;

export default TeamMemberList;
