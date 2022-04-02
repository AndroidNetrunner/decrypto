import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Coin from './Coin';
import { RootState } from '../../../Redux/store/rootStore';

export default function ScoreTable() {
  const { sovietTeam, usaTeam } = useSelector((state: RootState) => ({
    sovietTeam: state.game.sovietTeam,
    usaTeam: state.game.usaTeam,
  }));
  return (
    <ScoreTableArea>
      <tbody>
        <tr>
          <th> </th>
          <th className='labelArea'>해독 토큰</th>
          <th className='labelArea'>오답 토큰</th>
        </tr>
        <tr>
          <th className='labelArea'>Soviet</th>
          <CircleContainer>
            <Coin color='green' count={sovietTeam.greenToken} />
            <Coin color='green' count={sovietTeam.greenToken - 1} />
          </CircleContainer>
          <CircleContainer>
            <Coin color='red' count={sovietTeam.redToken} />
            <Coin color='red' count={sovietTeam.redToken - 1} />
          </CircleContainer>
        </tr>
        <tr>
          <th className='labelArea'>USA</th>
          <CircleContainer>
            <Coin color='green' count={usaTeam.greenToken} />
            <Coin color='green' count={usaTeam.greenToken - 1} />
          </CircleContainer>
          <CircleContainer>
            <Coin color='red' count={usaTeam.redToken} />
            <Coin color='red' count={usaTeam.redToken - 1} />
          </CircleContainer>
        </tr>
      </tbody>
    </ScoreTableArea>
  );
}

const ScoreTableArea = styled.table`
  width: 300px;
  font-size: 1.3rem;
  border-collapse: separate;
  border-spacing: 20px 5px;
  .labelArea {
    background-color: #b4bce3;
    padding: 0.5rem;
    border-radius: 0.6rem;
    margin: 2rem;
  }
`;

const CircleContainer = styled.td`
  text-align: center;
`;
