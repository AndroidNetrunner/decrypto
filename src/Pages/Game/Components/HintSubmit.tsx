import styled from 'styled-components';

type answerCode = [number, number, number];
type ourTeamWord = [string, string, string, string];

function HintSubmit({ answer, wordList }: { answer: answerCode; wordList: ourTeamWord }) {
  return (
    <>
      <AnswerCode>
        정답 코드: {answer[0]} - {answer[1]} - {answer[2]}
      </AnswerCode>
      <br />
      <br />
      <HintForm>
        <label htmlFor='hintform-first'>#{answer[0]}</label>
        <input type='text' id='hintform-first' placeholder={`${wordList[answer[0] - 1]}의 힌트...`} /> <br />
        <label htmlFor='hintform-second'>#{answer[1]}</label>
        <input type='text' id='hintform-second' placeholder={`${wordList[answer[1] - 1]}의 힌트...`} /> <br />
        <label htmlFor='hintform-third'>#{answer[2]}</label>
        <input type='text' id='hintform-third' placeholder={`${wordList[answer[2] - 1]}의 힌트...`} /> <br />
        <input type='submit' value='제출' />
      </HintForm>
    </>
  );
}

const HintForm = styled.form`
  label {
    font-size: 15pt;
    font-weight: bold;
  }
  input {
    margin-bottom: 1rem;
    margin-left: 0.5rem;
  }
`;

const AnswerCode = styled.span`
  font-size: 15pt;
  font-weight: bold;
`;

export default HintSubmit;
