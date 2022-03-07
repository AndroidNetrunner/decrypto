import styled from 'styled-components';

interface Scores {
  sovietDecode: number;
  sovietMistake: number;
  americaDecode: number;
  americaMistake: number;
}

export default function ScoreTable({ sovietDecode, sovietMistake, americaDecode, americaMistake }: Scores) {
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
          {sovietDecode > 0 ? (
            <img src='../../img/my-coin-green.gif' alt='green' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
        <CircleContainer>
          {sovietMistake > 0 ? (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/my-coin-pink.gif' alt='pink' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
      </tr>
      <tr>
        <th className='labelArea'>America</th>
        <CircleContainer>
          {americaDecode > 0 ? (
            <img src='../../img/my-coin-green.gif' alt='green' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          )}
          <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
        </CircleContainer>
        <CircleContainer>
          {americaMistake > 0 ? (
            <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <img src='../../img/my-coin-pink.gif' alt='pink' style={{ width: '2rem', height: '2rem' }} />
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
