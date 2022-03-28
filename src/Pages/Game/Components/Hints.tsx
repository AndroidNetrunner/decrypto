import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Flag from '../../../Components/Common/Flag';
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
      <ResizeFlag>
        <Flag nation={team === 'Soviet' ? 'soviet' : 'usa'} />
      </ResizeFlag>
      <HintArea>
        <ItemList>
          <Item key='one'>1</Item>
          <Item key='two'>2</Item>
          <Item key='three'>3</Item>
          <Item key='four'>4</Item>
        </ItemList>
        {hintRecord.map((hintList: string[]) => (
          <ItemList key={hintList.join()}>
            {hintList.map((hint) => (
              <Item key={hint}>{hint}</Item>
            ))}
          </ItemList>
        ))}
      </HintArea>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  margin: 0.5rem;
  display: flex;
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
  width: 40rem;
  padding: 1.5rem;
  background-color: #b4bce3;
  border-radius: 15px;
`;

const ResizeFlag = styled.div`
  position: relative;
`;

export default Hints;
