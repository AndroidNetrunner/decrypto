import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';

export default function ScoreTable() {
  const { sovietTeam, usaTeam } = useSelector((state: RootState) => ({
    sovietTeam: state.game.sovietTeam,
    usaTeam: state.game.usaTeam,
  }));
  return (
    <ScoreTableArea>
      <tr>
        <th> </th>
        <th className='labelArea'>해독 토큰</th>
        <th className='labelArea'>오답 토큰</th>
      </tr>
      <tr>
        <th className='labelArea'>Soviet</th>
        <CircleContainer>
          {sovietTeam.greenToken > 0 ? (
            <img src='../../img/my-coin-green.gif' alt='green' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
        <CircleContainer>
          {sovietTeam.redToken > 0 ? (
            <img src='../../img/my-coin-pink.gif' alt='pink' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
      </tr>
      <tr>
        <th className='labelArea'>usa</th>
        <CircleContainer>
          {usaTeam.greenToken > 0 ? (
            <img src='../../img/my-coin-green.gif' alt='green' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
        <CircleContainer>
          {usaTeam.redToken > 0 ? (
            <img src='../../img/my-coin-pink.gif' alt='pink' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
      </tr>
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
    border-radius: 3rem;
    margin: 2rem;
  }
`;

const CircleContainer = styled.td`
  text-align: center;
`;
