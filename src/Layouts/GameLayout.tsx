import { Outlet, useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

export default function GameLayout() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <header>
        <nav>
          <div role='button' tabIndex={0} onClick={() => navigate(-1)} onKeyDown={() => navigate(-1)}>
            &larr; 뒤로가기
          </div>
        </nav>
        <div>방 번호 : {roomId}</div>
      </header>
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
