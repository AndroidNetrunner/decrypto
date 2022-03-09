import styled from 'styled-components';

type answerCode = [number, number, number];
type ourTeamWord = [string, string, string, string];

function HintSubmit({
  answer,
  wordList,
  stage,
}: {
  answer: answerCode;
  wordList: ourTeamWord;
  stage: () => void;
}) {
  return (
    <Container>
      <AnswerCode>
        CODE <br /> {answer[0]} - {answer[1]} - {answer[2]}{' '}
      </AnswerCode>
      <HintForm onSubmit={stage}>
        <div>
          <label htmlFor='hintform-first'>#{answer[0]}</label>
          <input type='text' id='hintform-first' placeholder={`${wordList[answer[0] - 1]}의 힌트...`} />{' '}
          <br />
          <label htmlFor='hintform-second'>#{answer[1]}</label>
          <input type='text' id='hintform-second' placeholder={`${wordList[answer[1] - 1]}의 힌트...`} />{' '}
          <br />
          <label htmlFor='hintform-third'>#{answer[2]}</label>
          <input type='text' id='hintform-third' placeholder={`${wordList[answer[2] - 1]}의 힌트...`} />{' '}
          <br />
        </div>
        <div className='buttonArea'>
          <button type='submit'>Submit</button>
        </div>
      </HintForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const HintForm = styled.form`
  display: flex;
  label {
    font-size: 15pt;
    color: #b4bce3;
    margin-right: 1rem;
  }
  input {
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    background-color: #fbeaeb;
    border: none;
    border-radius: 10px;
    padding: 0.4em 0.3em;
  }
  .buttonArea {
    padding: 15px;
    margin: auto 0;
  }

  button {
    &:disabled {
      pointer-events: none;
      opacity: 0.65;
    }
    height: 40px;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #000000;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    background-color: #b4bce3;
  }
`;

const AnswerCode = styled.span`
  font-size: 15pt;
  font-weight: bold;
  background-color: gray;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.3rem white solid;
  margin-right: 2rem;
`;

export default HintSubmit;
