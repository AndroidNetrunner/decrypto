import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function Header({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.header`
  padding: 3rem 0rem;
`;
