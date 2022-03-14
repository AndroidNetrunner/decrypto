import styled from 'styled-components';
import TV from '../../../Assets/img/tv-fullsz.gif';

interface Props {
  wordList: [string, string, string, string];
}

function Word({ wordList }: Props) {
  return (
    <Container>
      {wordList.map((word, index) => (
        <div>
          <Number>{index + 1}</Number>
          <WordContainer>
            <div>{word}</div>
          </WordContainer>
        </div>
      ))}
    </Container>
  );
}

const WordContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 11rem;
  font-size: 175%;
  background: url(${TV});
  background-size: cover;
  text-align: center;
  div {
    margin-right: 2rem;
    padding-bottom: 0.5rem;
  }
`;
const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Number = styled.div`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

export default Word;
