import { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Overlay from '../Components/Common/Overlay';
import RuleModal from '../Components/Common/RuleModal';
import AudioOff from '../Assets/img/audio-off.png';
import AudioOn from '../Assets/img/audio-on.png';
import BookClose from '../Assets/img/book-close.png';
import BookOpen from '../Assets/img/book-open.png';
import Music from '../Assets/audio/login_bgm.mp3';

export default function BaseLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const bgmRef = useRef<HTMLAudioElement>(null);

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
    if (bgmRef.current) {
      if (isPlayingBgm) {
        bgmRef.current.pause();
        setIsPlayingBgm(false);
      } else {
        bgmRef.current.volume = 0.05;
        bgmRef.current.play();
        setIsPlayingBgm(true);
      }
    }
  };

  useEffect(() => {
    return () => bgmRef.current?.pause();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header ref={headerRef}>
          <img src='img/pacman.gif' alt='pacMan' style={{ width: '10rem', height: '10rem' }} />
          <h1>Decrypto</h1>
        </Header>
        <ButtonControl>
          <audio src={Music} ref={bgmRef}>
            <track kind='captions' />
          </audio>
          <AudioButton onClick={onClickAudioButton}>
            {isPlayingBgm ? (
              <img src={AudioOn} alt='audio-on' style={{ width: '10rem', height: '10rem' }} />
            ) : (
              <img src={AudioOff} alt='audio-off' style={{ width: '10rem', height: '10rem' }} />
            )}
          </AudioButton>
          <RuleButton name='Rule' onClick={toggleModal}>
            {isModalOpen ? (
              <img src={BookOpen} alt='RuleBook-open' style={{ width: '10rem', height: '10rem' }} />
            ) : (
              <img src={BookClose} alt='RuleBook-close' style={{ width: '10rem', height: '10rem' }} />
            )}
          </RuleButton>
        </ButtonControl>
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
  padding: 2%;
  background-color: #2e3c7e;
  color: #fbeaeb;
`;

const Container = styled.div`
  position: relative;
  border: 0.5rem solid white;
  height: 100%;
  overflow-y: auto;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  h1 {
    font-family: 'PressStart';
    font-size: 500%;
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
  width: 10rem;
  height: 10rem;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const AudioButton = styled.button`
  width: 10rem;
  height: 10rem;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const ButtonControl = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 2rem;
`;
