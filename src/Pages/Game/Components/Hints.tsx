import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';

function Hints({ team }: { team: string }) {
  const recordFrom = team === 'Soviet' ? 'sovietTeam' : 'usaTeam';
  let hintRecord = useSelector((rootState: RootState) => rootState.game[recordFrom].hints);
  const stageNumber = useSelector((rootState: RootState) => rootState.game.stageNumber);

  if (
    (stageNumber % 4 === 1 && recordFrom === 'sovietTeam') ||
    (stageNumber % 4 === 3 && recordFrom === 'usaTeam')
  )
    hintRecord = hintRecord.slice(0, -1);
  return (
    <Container>
      <Title>{team}</Title>
      <HintArea>
        <ItemList>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>4</Item>
        </ItemList>
        {hintRecord.map((item: string[]) => (
          <ItemList>
            <Item>{item[0]}</Item>
            <Item>{item[1]}</Item>
            <Item>{item[2]}</Item>
            <Item>{item[3]}</Item>
          </ItemList>
        ))}
      </HintArea>
    </Container>
  );
}

const Container = styled.div`
  width: 35rem;
  margin: 2rem;
`;

const Title = styled.p`
  font-size: 1.3rem;
  color: white;
  text-align: center;
  margin-bottom: 5px;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 20%;
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
  color: #2e3c7e;
`;

const HintArea = styled.div`
  padding: 1.5rem;
  background-color: #b4bce3;
  border-radius: 15px;
`;

export default Hints;
