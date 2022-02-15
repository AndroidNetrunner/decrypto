import { Outlet } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Layout/Header';

export default function BaseLayout() {
  return (
    <>
      <Header>
        <div>여기 Navigate 나 홈페이지</div>
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
