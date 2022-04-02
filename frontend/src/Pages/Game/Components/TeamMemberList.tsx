import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../Redux/store/rootStore';

function TeamMemberList() {
  const sovietPlayers = useSelector((rootState: RootState) => rootState.game.sovietTeam.players);
  const usaPlayers = useSelector((rootState: RootState) => rootState.game.usaTeam.players);
  return (
    <TeamTable>
      <tr className='Soviet'>
        <th>Soviet</th>
        {sovietPlayers.map((player) => (
          <td>{player.nickname}</td>
        ))}
      </tr>
      <tr className='USA'>
        <th>USA</th>
        {usaPlayers.map((player) => (
          <td>{player.nickname}</td>
        ))}
      </tr>
    </TeamTable>
  );
}

const TeamTable = styled.table`
  text-align: center;
  /* margin: auto; */
  font-size: 175%;
  tr.Soviet {
    background-color: #f15852;
  }
  tr.USA {
    background-color: #9ebdf0;
  }
  th,
  td {
    padding: 2rem;
  }
`;

export default TeamMemberList;
