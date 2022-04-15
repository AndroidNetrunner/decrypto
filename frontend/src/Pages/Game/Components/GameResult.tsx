import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';
import Game from '../../../Interfaces/Game.interface';

export default function GameResult() {
  const [isToggle, setToggle] = useState({
    sovietWords: false,
    usaWords: false,
    sovietHints: false,
    usaHints: false,
  });
  const toggleParagraph = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    if (id === 'sovietWords' || id === 'usaWords' || id === 'sovietHints' || id === 'usaHints') {
      setToggle({ ...isToggle, [id]: !isToggle[id] });
    }
  };
  const navigate = useNavigate();
  const getGameResult = (game: Game) => {
    if (game.sovietTeam.greenToken === 2)
      return {
        sovietWin: true,
        description: `소련팀의 해독 토큰 2개 획득으로 인한 승리`,
      };
    if (game.usaTeam.greenToken === 2)
      return {
        sovietWin: false,
        description: `미국팀의 해독 토큰 2개 획득으로 인한 승리`,
      };
    if (game.sovietTeam.redToken === 2)
      return {
        sovietWin: false,
        description: `소련팀의 오답 토큰 2개 획득으로 인한 패배`,
      };
    return {
      sovietWin: true,
      description: `미국팀의 오답 토큰 2개 획득으로 인한 패배`,
    };
  };
  const { game } = useSelector((rootState: RootState) => rootState);
  const gameResult = getGameResult(game);
  return (
    <ResultWrapper onClick={(e) => e.stopPropagation()}>
      <ButtonWrapper>
        <CloseButton>
          <svg
            onClick={() => navigate('/')}
            xmlns='http://www.w3.org/2000/svg'
            width='28px'
            height='28px'
            viewBox='0 0 24 24'
          >
            <g data-name='Layer 2'>
              <g data-name='close'>
                <rect width='24' height='24' transform='rotate(180 12 12)' opacity='0' />
                <path d='M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z' />
              </g>
            </g>
          </svg>
        </CloseButton>
      </ButtonWrapper>
      <ResultText>
        <Title>Decrypto</Title>
        <SemiTitle>결과 발표</SemiTitle>
        <Paragraph showOn>
          {gameResult.sovietWin ? <SovietSpan>소련</SovietSpan> : <UsaSpan>미국</UsaSpan>}팀의 승리로 게임이
          종료되었습니다!
          <br />
          {gameResult.sovietWin ? (
            <SovietSpan>{gameResult.description}</SovietSpan>
          ) : (
            <UsaSpan>{gameResult.description}</UsaSpan>
          )}
        </Paragraph>
        <TeamContainer>
          <TeamColumn>
            <SemiTitle id='sovietHints' onClick={toggleParagraph}>
              <SovietSpan>소련</SovietSpan>팀 힌트
              <IconSVG
                width='30'
                height='30'
                viewBox='0 0 16 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10 14L16 6H4L10 14Z' fill='#cd0000' />
              </IconSVG>
            </SemiTitle>
            <Paragraph showOn={isToggle.sovietHints}>
              <HintTable>
                <tr>
                  <th>1번</th>
                  <th>2번</th>
                  <th>3번</th>
                  <th>4번</th>
                </tr>
                {game.sovietTeam.hints.map((hint) => (
                  <tr>
                    <td>{hint[0]}</td>
                    <td>{hint[1]}</td>
                    <td>{hint[2]}</td>
                    <td>{hint[3]}</td>
                  </tr>
                ))}
              </HintTable>
            </Paragraph>
            <SemiTitle id='sovietWords' onClick={toggleParagraph}>
              <SovietSpan>소련</SovietSpan>팀 단어
              <IconSVG
                width='30'
                height='30'
                viewBox='0 0 16 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10 14L16 6H4L10 14Z' fill='#cd0000' />
              </IconSVG>
            </SemiTitle>
            <Paragraph showOn={isToggle.sovietWords}>
              1번: {game.sovietTeam.words[0]} <br /> 2번: {game.sovietTeam.words[1]} <br /> 3번:{' '}
              {game.sovietTeam.words[2]} <br /> 4번: {game.sovietTeam.words[3]}
            </Paragraph>
          </TeamColumn>
          <TeamColumn>
            <SemiTitle id='usaHints' onClick={toggleParagraph}>
              <UsaSpan>미국</UsaSpan>팀 힌트
              <IconSVG
                width='30'
                height='30'
                viewBox='0 0 16 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10 14L16 6H4L10 14Z' fill='#00468e' />
              </IconSVG>
            </SemiTitle>
            <Paragraph showOn={isToggle.usaHints}>
              <HintTable>
                <tr>
                  <th>1번</th>
                  <th>2번</th>
                  <th>3번</th>
                  <th>4번</th>
                </tr>
                {game.usaTeam.hints.map((hint) => (
                  <tr>
                    <td>{hint[0]}</td>
                    <td>{hint[1]}</td>
                    <td>{hint[2]}</td>
                    <td>{hint[3]}</td>
                  </tr>
                ))}
              </HintTable>
            </Paragraph>
            <SemiTitle id='usaWords' onClick={toggleParagraph}>
              <UsaSpan>미국</UsaSpan>팀 단어
              <IconSVG
                width='30'
                height='30'
                viewBox='0 0 16 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10 14L16 6H4L10 14Z' fill='#00468e' />
              </IconSVG>
            </SemiTitle>
            <Paragraph showOn={isToggle.usaWords}>
              1번: {game.usaTeam.words[0]} <br /> 2번: {game.usaTeam.words[1]} <br /> 3번:{' '}
              {game.usaTeam.words[2]} <br /> 4번: {game.usaTeam.words[3]}
            </Paragraph>
          </TeamColumn>
        </TeamContainer>
      </ResultText>
    </ResultWrapper>
  );
}

const HintTable = styled.table`
  th,
  tr {
    padding: 1.5rem;
  }
  margin: auto;
`;

const Paragraph = styled.p<{ showOn: boolean }>`
  line-height: 3rem;
  font-family: neodgm;
  font-size: 200%;
  display: ${({ showOn }) => (showOn ? 'block' : 'none')};
`;

const SemiTitle = styled.div`
  font-family: neodgm;
  font-size: 300%;
  margin: 2rem;
`;

const Title = styled.div`
  font-size: 300%;
  font-family: PressStart;
  text-align: center;
`;

const ResultText = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.span`
  top: 0;
  right: 0;
  margin-bottom: 1rem;
  svg {
    cursor: pointer;
    position: fixed;
  }
`;

const ResultWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  max-width: 60%;
  max-height: 70%;
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const IconSVG = styled.svg``;

const SovietSpan = styled.span`
  color: #cd0000;
`;

const UsaSpan = styled.span`
  color: #00468e;
`;

const TeamContainer = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
`;
const TeamColumn = styled.div`
  width: 50%;
`;
