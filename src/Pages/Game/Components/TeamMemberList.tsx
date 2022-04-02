import { useSelector } from 'react-redux';
import Flag from '../../../Components/Common/Flag';
import { RootState } from '../../../Redux/store/rootStore';

function TeamMemberList() {
  const sovietPlayers = useSelector((rootState: RootState) => rootState.game.sovietTeam.players);
  const usaPlayers = useSelector((rootState: RootState) => rootState.game.usaTeam.players);
  return (
    <table>
      <tr>
        <th>Soviet</th>
        {sovietPlayers.map((player) => (
          <td>{player.nickname}</td>
        ))}
      </tr>
      <tr>
        <th>USA</th>
        {usaPlayers.map((player) => (
          <td>{player.nickname}</td>
        ))}
      </tr>
    </table>
  );
}

export default TeamMemberList;
