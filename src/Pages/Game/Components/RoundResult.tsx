import styled from 'styled-components';

type code = [number, number, number];

// function ResultDescription({ color, content }: { color: string; content: string }) {
//   return <h3>{content}</h3>;
// }

function RoundResult({
  answerCode,
  hints,
  codeGuess,
  guessTeamName,
  codeSteal,
  stealTeamName,
}: {
  answerCode: code;
  hints: [string, string, string];
  codeGuess: code;
  guessTeamName: string;
  codeSteal: code;
  stealTeamName: string;
}) {
  const stealSuccess = answerCode.toString() === codeSteal.toString();
  const guessSuccess = answerCode.toString() === codeGuess.toString();
  return (
    <StyledRoundResult stealSuccess={stealSuccess} guessSuccess={guessSuccess}>
      
      <div className='roundResult'>
        <h1>이번 라운드의 결과입니다.</h1>
        <h2 className='answerCodeArea'>
          정답 코드: <span className='answerCode'>{answerCode.join(' - ')}</span>{' '}
        </h2>
        <h2 className='hintsArea'>
          힌트: <span className='hints'>{hints[0]}</span>
          <span className='hints'>{hints[1]}</span>
          <span className='hints'>{hints[2]}</span>
        </h2>
      </div>

      <div className='teamResult'>

        <div className='stealTeamResult'>
          <h2>
            {stealTeamName}팀의 탈취 시도: <span className='codeSteal'>{codeSteal.join(' - ')}</span>
          </h2>
          <StyledResultDescription color={stealSuccess ? 'green' : 'gray'}>
            {stealSuccess
              ? `${stealTeamName} 팀은 코드 탈취에 성공하였습니다.`
              : `${stealTeamName} 팀은 코드 탈취에 실패하였습니다.`}
          </StyledResultDescription>
        </div>

        <div className='guessTeamResult'>
          <h2>
            {guessTeamName}팀의 코드 추측: <span className='codeGuess'>{codeGuess.join(' - ')}</span>
          </h2>
          <StyledResultDescription color={guessSuccess ? 'gray' : 'red'}>
            {guessSuccess
              ? `${guessTeamName} 팀은 코드 추측에 성공하였습니다.`
              : `${guessTeamName} 팀은 코드 추측에 실패하였습니다.`}
          </StyledResultDescription>
        </div>
      </div>
    </StyledRoundResult>
  );
}

export default RoundResult;

const StyledRoundResult = styled.div<{ stealSuccess: boolean; guessSuccess: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 15px;
  div {
    width: 100%;
  }
  h1 {
    display: block;
    text-align: center;
  }
  h2 {
    display: block;
    margin: 10px 0;
  }
  span {
    padding: 5px;
    color: white;
    border-radius: 100px;
  }
  .answerCodeArea,
  .hintsArea {
    text-align: center;
  }
  .roundResult {
    display: flex;
    flex-direction: column;
  }

  .stealTeamResult {
    display: flex;
    flex-direction: column;
  }

  .guessTeamResult {
    float: left;
    display: flex;
    flex-direction: column;
  }

  span.answerCode {
    background-color: black;
  }

  span.hints {
    background-color: #005666;
  }
  span.codeSteal {
    background-color: ${(props) => (props.stealSuccess ? 'green' : 'gray')};
  }
  span.codeGuess {
    background-color: ${(props) => (props.guessSuccess ? 'gray' : 'red')};
  }
  .teamResult {
    display: flex;
    text-align: center;
  }
`;

const StyledResultDescription = styled.h3`
  color: ${(props) => props.color};
`;

/* 
라운드가 끝나면 보여줘야 되는 정보: 
1. 정답 코드
2. 각 팀의 추측
3. 토큰 변동 현황
*/
