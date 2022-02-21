import { Outlet } from 'react-router';
import styled from 'styled-components';

export default function BaseLayout() {
  return (
    <>
      <header>
        <HeaderWrapper>
          <div>LOGO</div>
        </HeaderWrapper>
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
  height: calc(100vh - 8.15rem);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 86rem;
  margin: 0 auto;
`;
