import { useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Overlay from '../Components/Common/Overlay';
import RuleModal from '../Components/Common/RuleModal';

export default function GameLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <Wrapper>
      <Container>
        <RuleButton name='Rule' onClick={toggleModal}>
          {isModalOpen ? (
            <img src='../img/book-open.png' alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
          ) : (
            <img src='../img/book-close.png' alt='RuleBook' style={{ width: '10rem', height: '10rem' }} />
          )}
        </RuleButton>
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
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;
