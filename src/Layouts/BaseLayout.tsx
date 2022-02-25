import { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Overlay from '../Components/Common/Overlay';
import RuleModal from '../Components/Common/RuleModal';

export default function BaseLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (headerRef.current !== null) {
      headerRef.current.style.cssText = headerRef.current.style.cssText ? '' : 'filter: blur(3px)';
    }
    if (mainRef.current !== null) {
      mainRef.current.style.cssText = mainRef.current.style.cssText ? '' : 'filter: blur(3px)';
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
