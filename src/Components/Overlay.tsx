import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClickOverlay: () => void;
}

export default function Overlay({ children, onClickOverlay }: Props) {
  return <Container onClick={onClickOverlay}>{children}</Container>;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
`;
