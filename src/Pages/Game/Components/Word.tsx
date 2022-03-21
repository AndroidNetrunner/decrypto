import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Game from '../../../Interfaces/Game.interface';
import User from '../../../Interfaces/User.interface';
import { RootState } from '../../../Redux/store/rootStore';
import TV from '../../../Assets/img/tv-fullsz.gif';

function Word() {
  const user: User = useSelector((rootState: RootState) => rootState.user);
  const game: Game = useSelector((rootState: RootState) => rootState.game);
  console.log(game.sovietTeam.words);
  const wordList = game.sovietTeam.players.find((player) => player.uid === user.uid)
    ? game.sovietTeam.words
    : game.usaTeam.words;
  console.log(wordList);
  return (
    <Container>
      {wordList.map((word: string, index: number) => (
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
