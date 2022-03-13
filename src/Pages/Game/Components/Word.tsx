import styled from 'styled-components';

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
  padding: 20px;
  width: 60%;
`;

const ItemList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Number = styled.div`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  width: 100px;
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
    top: 9rem;
    position: absolute;
  }
`;

export default Word;
