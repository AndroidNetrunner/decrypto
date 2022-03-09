import styled from 'styled-components';

function Hints({ team, hintRecord }: { team: string; hintRecord: string[][] }) {
  return (
    <Container>
      <Title>{team}</Title>
      <HintArea>
        <ItemList>
          <Item className='num'>1</Item>
          <Item className='num'>2</Item>
          <Item className='num'>3</Item>
          <Item className='num'>4</Item>
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

  .num {
    font-size: 1.5rem;
    color: #2e3c7e;
  }
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
`;

const HintArea = styled.div`
  padding: 1.5rem;
  background-color: #b4bce3;
  border-radius: 15px;
`;

export default Hints;
