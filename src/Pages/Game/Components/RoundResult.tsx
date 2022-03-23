import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';

function RoundResult() {
  const answerCode = useSelector((rootState: RootState) => rootState.game.answerCode);
  const stealTeam = useSelector((rootState: RootState) =>
    rootState.game.stageNumber % 4 === 3 ? 'sovietTeam' : 'usaTeam',
  );
  const guessTeam = stealTeam === 'sovietTeam' ? 'usaTeam' : 'sovietTeam';
  const codeSteal = useSelector((rootState: RootState) => rootState.game[stealTeam].codes);
  const codeGuess = useSelector((rootState: RootState) => rootState.game[guessTeam].codes);
  const stealSuccess = answerCode.toString() === codeSteal.toString();
  const guessSuccess = answerCode.toString() === codeGuess.toString();
  const stealTeamName = stealTeam === 'sovietTeam' ? '소련' : '미국';
  const guessTeamName = stealTeamName === '소련' ? '미국' : '소련';
  return (
    <Container>
      <Result>
        <h1>이번 라운드의 결과입니다.</h1>
        <h2>
          정답 코드: <AnswerCode>{answerCode.join(' - ')}</AnswerCode>{' '}
        </h2>
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
  background-color: white;
  border-radius: 1rem;
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
