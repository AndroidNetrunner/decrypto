import styled from 'styled-components';

function Word({ wordList }: { wordList: [string, string, string, string] }) {
  return (
    <Container>
      <Title>우리팀 단어</Title>
      <ItemList>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </ItemList>
      <ItemList>
        <ItemContainer>
          <img src='../../img/tv-fullsz.gif' alt='green' style={{ width: '12rem', height: '10rem' }} />
          <Item className='wordItem'>{wordList[0]}</Item>
        </ItemContainer>
        <ItemContainer>
          <img src='../../img/tv-fullsz.gif' alt='green' style={{ width: '12rem', height: '10rem' }} />
          <Item className='wordItem'>{wordList[1]}</Item>
        </ItemContainer>
        <ItemContainer>
          <img src='../../img/tv-fullsz.gif' alt='green' style={{ width: '12rem', height: '10rem' }} />
          <Item className='wordItem'>{wordList[2]}</Item>
        </ItemContainer>
        <ItemContainer>
          <img src='../../img/tv-fullsz.gif' alt='green' style={{ width: '12rem', height: '10rem' }} />
          <Item className='wordItem'>{wordList[3]}</Item>
        </ItemContainer>
      </ItemList>
    </Container>
  );
}

const Container = styled.div`
  padding: 35px;
  width: 500px;
`;

const Title = styled.p`
  text-align: center;
  font-size: medium;
  margin-bottom: 10px;
`;

const ItemList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  position: relative;
  width: 100px;
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
  text-align: center;
`;

const ItemContainer = styled.div`
  .wordItem {
    text-align: center;
    top: 11rem;
    position: absolute;
  }
`;

export default Word;
