import { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Overlay from '../Components/Common/Overlay';
import RuleModal from '../Components/Common/RuleModal';

export default function BaseLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [bgm, setBgm] = useState(new Audio('audio/login_bgm.mp3'));

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (headerRef.current !== null) {
      headerRef.current.style.cssText = headerRef.current.style.cssText ? '' : 'filter: blur(3px)';
    }
    if (mainRef.current !== null) {
      mainRef.current.style.cssText = mainRef.current.style.cssText ? '' : 'filter: blur(3px)';
    }
  };
  const onClickAudioButton = () => {
    if (isPlayingBGM) {
      bgm.pause();
      console.log('음악 실행 중 => 음악 중단');
      setIsPlayingBGM(false);
    } else {
      bgm.play();
      console.log('음악 중단 => 음악 실행 중');
      setIsPlayingBGM(true);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header ref={headerRef}>
          <img src='img/pacMan.gif' alt='pacMan' style={{ width: '10rem', height: '10rem' }} />
          <h1>Decrypto</h1>
        </Header>
        <RuleButton name='Rule' onClick={toggleModal}>
          {isModalOpen ? (
            <img src='img/book-open.png' alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
          ) : (
            <img src='img/book-close.png' alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
          )}
        </RuleButton>
        <AudioButton onClick={onClickAudioButton}>{ {isPlayingBGM ? (
            <img src='img/audio_on.png' alt='audio' style={{ width: '10rem', height: '10rem' }} />
          ) : (
            <img src='img/audio_off.png' alt='audio' style={{ width: '10rem', height: '10rem' }} />
          )}</AudioButton>
        <Main ref={mainRef}>
          <Outlet />
        </Main>
        {isModalOpen && (
          <Overlay onClickOverlay={toggleModal}>
            <RuleModal toggleModal={toggleModal} />
          </Overlay>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  padding: 8rem 9rem;
  background-color: #2e3c7e;
  color: #fbeaeb;
`;

const Container = styled.div`
  position: relative;
  border: 5px solid white;
  height: 100%;
  overflow: hidden;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  h1 {
    font-family: 'PressStart';
    font-size: 5rem;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  margin: 0 auto;
  margin-top: 5rem;
`;

const RuleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const AudioButton = styled.button`
  position: absolute;
  top: 0;
  right: 5rem;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;
