import styled from 'styled-components';

type answerCode = [number, number, number];
type ourTeamWord = [string, string, string, string];

function HintSubmit({ answer, wordList }: { answer: answerCode; wordList: ourTeamWord }) {
  return (
    <>
      <span>
        정답 코드: {answer[0]} - {answer[1]} - {answer[2]}
      </span>
      <HintForm>
        <input type='text' placeholder={`${wordList[answer[0] - 1]}의 힌트...`} />
        <input type='text' placeholder={`${wordList[answer[1] - 1]}의 힌트...`} />
        <input type='text' placeholder={`${wordList[answer[2] - 1]}의 힌트...`} />
        <input type='submit' value='제출' />
      </HintForm>
    </>
  );
}

const HintForm = styled.form``;

export default HintSubmit;
