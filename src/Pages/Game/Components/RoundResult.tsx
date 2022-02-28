import styled from 'styled-components';

type code = [number, number, number];

interface Props {
  answerCode: code;
  hints: [string, string, string];
  codeGuess: code;
  guessTeamName: string;
  codeSteal: code;
  stealTeamName: string;
}

function RoundResult({ answerCode, hints, codeGuess, guessTeamName, codeSteal, stealTeamName }: Props) {
  const stealSuccess = answerCode.toString() === codeSteal.toString();
  const guessSuccess = answerCode.toString() === codeGuess.toString();
  return (
    <Container>
      <Result>
        <h1>이번 라운드의 결과입니다.</h1>
        <h2>
          정답 코드: <AnswerCode>{answerCode.join(' - ')}</AnswerCode>{' '}
        </h2>
        <HintContainer>
          힌트:
          {hints.map((hint) => (
            <Hint key={hint}>{hint}</Hint>
          ))}
        </HintContainer>
      </Result>

      <TeamResultContainer>
        <TeamResult isSuccess={stealSuccess} successColor='green' failureColor='grey'>
          <h2>
            {stealTeamName}팀의 탈취 시도: <SubmitCode>{codeSteal.join(' - ')}</SubmitCode>
          </h2>
          <ResultDescription>
            {stealSuccess
              ? `${stealTeamName} 팀은 코드 탈취에 성공하였습니다.`
              : `${stealTeamName} 팀은 코드 탈취에 실패하였습니다.`}
          </ResultDescription>
        </TeamResult>

        <TeamResult isSuccess={guessSuccess} successColor='gray' failureColor='red'>
          <h2>
            {guessTeamName}팀의 코드 추측: <SubmitCode>{codeGuess.join(' - ')}</SubmitCode>
          </h2>
          <ResultDescription>
            {guessSuccess
              ? `${guessTeamName} 팀은 코드 추측에 성공하였습니다.`
              : `${guessTeamName} 팀은 코드 추측에 실패하였습니다.`}
          </ResultDescription>
        </TeamResult>
      </TeamResultContainer>
    </Container>
  );
}

export default RoundResult;

const Container = styled.div`
  font-family: neodgm, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1,
  h2 {
    margin-bottom: 1rem;
  }
`;

const Code = styled.span`
  padding: 0.25rem 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  color: white;
`;

const AnswerCode = styled(Code)`
  background-color: black;
`;

const SubmitCode = styled(Code)``;

const HintContainer = styled.div`
  margin-bottom: 2rem;
`;

const Hint = styled.span`
  display: inline-block;
  min-width: 4rem;
  color: white;
  padding: 0.5rem;
  border-radius: 5rem;
  background-color: #005666;
`;

const TeamResultContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ResultDescription = styled.h3``;

const TeamResult = styled.div<{ isSuccess: boolean; successColor: string; failureColor: string }>`
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 1rem;
  }
  ${SubmitCode} {
    background-color: ${({ isSuccess, successColor, failureColor }) =>
      isSuccess ? successColor : failureColor};
  }
  ${ResultDescription} {
    color: ${({ isSuccess, successColor, failureColor }) => (isSuccess ? successColor : failureColor)};
  }
`;

/* 
라운드가 끝나면 보여줘야 되는 정보: 
1. 정답 코드
2. 각 팀의 추측
3. 토큰 변동 현황
*/
