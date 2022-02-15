import styled from 'styled-components';

export default function ScoreTable({
  whiteTeamName = 'White',
  whiteDecode = 1,
  whiteMistake = 1,
  blackTeamName = 'Black',
  blackDecode = 1,
  blackMistake = 2,
}: {
  whiteTeamName: string;
  whiteDecode: number;
  whiteMistake: number;
  blackTeamName: string;
  blackDecode: number;
  blackMistake: number;
}) {
  return (
    <table>
      <tr>
        <th>팀 이름</th>
        <th>해독 토큰</th>
        <th>오답 토큰</th>
      </tr>
      <tr>
        <td>{whiteTeamName}</td>
        <CircleContainer>
          <Circle filled={whiteDecode > 0} color='green' />
          <Circle filled={whiteDecode > 1} color='green' />
        </CircleContainer>
        <CircleContainer>
          <Circle filled={whiteMistake > 0} color='red' />
          <Circle filled={whiteMistake > 1} color='red' />
        </CircleContainer>
      </tr>
      <tr>
        <td>{blackTeamName}</td>
        <CircleContainer>
          <Circle filled={blackDecode > 0} color='green' />
          <Circle filled={blackDecode > 1} color='green' />
        </CircleContainer>
        <CircleContainer>
          <Circle filled={blackMistake > 0} color='red' />
          <Circle filled={blackMistake > 1} color='red' />
        </CircleContainer>
      </tr>
    </table>
  );
}

const CircleContainer = styled.td`
  text-align: center;
`;

const Circle = styled.div<{ filled: boolean; color: string }>`
  border-radius: 8px;
  width: 10px;
  height: 10px;
  border-style: solid;
  border-color: ${(props) => props.color};
  background-color: ${(props) => (props.filled ? props.color : 'white')};
  display: inline-block;
  &:first-child {
    margin-right: 3px;
  }
`;
