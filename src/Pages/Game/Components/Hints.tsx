import styled from 'styled-components';

function Hints({ hintRecord }: { hintRecord: string[][] }) {
  return (
    <Container>
      <Title>힌트 제공 현황</Title>
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
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  width: 250px;
  border: 2px solid;
  border-radius: 20px;
`;

const Title = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 50px;
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
`;

export default Hints;
