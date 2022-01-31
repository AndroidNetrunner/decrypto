import styled from 'styled-components';

export default function Header({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.header`
  padding: 3rem 0rem;
`;
