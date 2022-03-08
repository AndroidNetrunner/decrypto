import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Overlay from '../Components/Common/Overlay';
import RuleModal from '../Components/Common/RuleModal';
import AudioOff from '../Assets/img/audio-off.png';
import AudioOn from '../Assets/img/audio-on.png';
import BookClose from '../Assets/img/book-close.png';
import BookOpen from '../Assets/img/book-open.png';
import Music from '../Assets/audio/in_game.mp3';

export default function GameLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [bgm, setBgm] = useState(new Audio(Music));

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onClickAudioButton = () => {
    if (isPlayingBgm) {
      bgm.pause();
      setIsPlayingBgm(false);
    } else {
      bgm.volume = 0.03;
      bgm.play();
      setIsPlayingBgm(true);
    }
  };

  useEffect(() => {
    return () => bgm.pause();
  }, []);

  return (
    <Wrapper>
      <Container>
        <ButtonControl>
          <AudioButton onClick={onClickAudioButton}>
            {isPlayingBgm ? (
              <img src={AudioOn} alt='audio_on' style={{ width: '10rem', height: '10rem' }} />
            ) : (
              <img src={AudioOff} alt='audio_off' style={{ width: '10rem', height: '10rem' }} />
            )}
          </AudioButton>
          <RuleButton name='Rule' onClick={toggleModal}>
            {isModalOpen ? (
              <img src={BookOpen} alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
            ) : (
              <img src={BookClose} alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
            )}
          </RuleButton>
        </ButtonControl>
        <Main>
          <Outlet />
        </Main>
      </Container>
      {isModalOpen && (
        <Overlay onClickOverlay={toggleModal}>
          <RuleModal toggleModal={toggleModal} />
        </Overlay>
      )}
    </Wrapper>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  padding: 0rem 5rem;
  margin: 0 auto;
  background-color: #2e3c7e;
`;

const Container = styled.div`
  position: relative;
  border: 5px solid white;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  padding: 8rem 9rem;
  background-color: #2e3c7e;
  color: #fbeaeb;
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
