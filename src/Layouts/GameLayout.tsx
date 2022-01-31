import { Outlet, useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Header from '../Components/Layout/Header';

export default function GameLayout() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Nav>
          <div role='button' tabIndex={0} onClick={() => navigate(-1)} onKeyDown={() => navigate(-1)}>
            &larr; 뒤로가기
          </div>
        </Nav>
        <RoomNumber>방 번호 : {roomId}</RoomNumber>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 0rem 5rem;
  margin: 0 auto;
`;

const Nav = styled.nav``;

const RoomNumber = styled.span``;
