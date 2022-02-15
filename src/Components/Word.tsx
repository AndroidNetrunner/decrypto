import styled from 'styled-components';

function Word({ wordList }: { wordList: string[] }) {
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
        <Item>{wordList[0]}</Item>
        <Item>{wordList[1]}</Item>
        <Item>{wordList[2]}</Item>
        <Item>{wordList[3]}</Item>
      </ItemList>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  width: 300px;
  border: 2px solid;
  border-radius: 20px;
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
  width: 50px;
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
  text-align: center;
`;

export default Word;
