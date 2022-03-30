import User from '../../../Interfaces/User.interface';
import Flag from '../../../Components/Common/Flag';
function TeamMemberList({ nation, members }: { nation: 'soviet' | 'usa'; members: User[] }) {
  return (
    <table>
      <th>
        <Flag nation={nation} />
      </th>
      {members.map((member) => (
        <tr>
          <td>{member.nickname}</td>
        </tr>
      ))}
    </table>
  );
}
