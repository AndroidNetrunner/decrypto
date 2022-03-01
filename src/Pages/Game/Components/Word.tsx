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
        <Item className='wordItem'>{wordList[0]}</Item>
        <Item className='wordItem'>{wordList[1]}</Item>
        <Item className='wordItem'>{wordList[2]}</Item>
        <Item className='wordItem'>{wordList[3]}</Item>
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
  .wordItem {
    border: 2px solid;
    border-radius: 10px;
    padding: 10px;
  }
`;

const Item = styled.div`
  width: 100px;
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
  text-align: center;
`;

export default Word;
