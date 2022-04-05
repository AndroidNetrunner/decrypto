import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../Redux/store/rootStore';
import User from '../../../Interfaces/User.interface';

function getRows(sovietPlayers: User[], usaPlayers: User[]) {
  const ret = [];
  for (let i = 0; i < Math.max(sovietPlayers.length, usaPlayers.length); i += 1) {
    ret.push(
      <tr>
        <td className='Soviet' key={sovietPlayers[i] ? sovietPlayers[i].uid : `s${i}`}>
          {sovietPlayers[i] && sovietPlayers[i].nickname}
        </td>
        <td className='USA' key={usaPlayers[i] ? usaPlayers[i].uid : `u${i}`}>
          {usaPlayers[i] && usaPlayers[i].nickname}
        </td>
      </tr>,
    );
  }
  return ret;
}

function TeamMemberList() {
  const sovietPlayers = useSelector((rootState: RootState) => rootState.game.sovietTeam.players);
  const usaPlayers = useSelector((rootState: RootState) => rootState.game.usaTeam.players);
  return (
    <TeamTable>
      <tr>
        <th className='Soviet'>Soviet</th>
        <th className='USA'>USA</th>
      </tr>
      {getRows(sovietPlayers, usaPlayers)}
    </TeamTable>
  );
}

const TeamTable = styled.table`
  text-align: center;
  /* margin: auto; */
  font-size: 175%;
  .Soviet {
    background-color: #f15852;
  }
  .USA {
    background-color: #5685d0;
  }
  th,
  td {
    padding: 1rem;
  }
`;

export default TeamMemberList;
