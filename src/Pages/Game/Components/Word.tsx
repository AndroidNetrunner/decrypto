import styled from 'styled-components';
import TV from '../../../Assets/img/tv-fullsz.gif';

function Word({ wordList }: { wordList: [string, string, string, string] }) {
  return (
    <Container>
      <ItemList>
        <Number>1</Number>
        <Number>2</Number>
        <Number>3</Number>
        <Number>4</Number>
      </ItemList>
      <ItemList>
        <TmpContainer>{wordList[0]}</TmpContainer>
        <TmpContainer>{wordList[1]}</TmpContainer>
        <TmpContainer>{wordList[2]}</TmpContainer>
        <TmpContainer>{wordList[3]}</TmpContainer>
      </ItemList>
    </Container>
  );
}

const TmpContainer = styled.div`
  width: 18rem;
  height: 13rem;
  font-size: 250%;
  background: url(${TV});
  background-size: cover;
  text-align: center;
  padding: 4% 7% 5% 4%;
`;
const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const ItemList = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Number = styled.div`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  width: 100px;
`;

export default Word;
