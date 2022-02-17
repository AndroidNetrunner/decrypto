import styled from 'styled-components';

type directions =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop';

interface Positions {
  top: string;
  left: string;
  xAxis: string;
  yAxis: string;
}

interface Props {
  children: React.ReactNode;
  direction: directions;
  message: string;
}

export default function Tooltip({ children, message, direction }: Props) {
  const position = (() => {
    const positionResult: Positions = {
      top: '50%',
      left: '50%',
      xAxis: '-50%',
      yAxis: '-50%',
    };

    switch (direction) {
      case 'top':
        positionResult.top = '0%';
        positionResult.yAxis = '-120%';
        break;
      case 'topLeft':
        positionResult.top = '0%';
        positionResult.left = '0%';
        positionResult.xAxis = '0%';
        positionResult.yAxis = '-120%';
        break;
      case 'topRight':
        positionResult.top = '0%';
        positionResult.left = '100%';
        positionResult.xAxis = '-100%';
        positionResult.yAxis = '-120%';
        break;
      case 'rightTop':
        positionResult.top = '0%';
        positionResult.left = '100%';
        positionResult.xAxis = '5%';
        positionResult.yAxis = '0%';
        break;
      case 'right':
        positionResult.left = '100%';
        positionResult.xAxis = '5%';
        break;
      case 'rightBottom':
        positionResult.top = '100%';
        positionResult.left = '100%';
        positionResult.xAxis = '5%';
        positionResult.yAxis = '-100%';
        break;
      case 'bottomRight':
        positionResult.top = '100%';
        positionResult.left = '100%';
        positionResult.xAxis = '-100%';
        positionResult.yAxis = '20%';
        break;
      case 'bottom':
        positionResult.top = '100%';
        positionResult.yAxis = '20%';
        break;
      case 'bottomLeft':
        positionResult.top = '100%';
        positionResult.left = '0%';
        positionResult.xAxis = '0%';
        positionResult.yAxis = '20%';
        break;
      case 'leftBottom':
        positionResult.top = '100%';
        positionResult.left = '0%';
        positionResult.xAxis = '-105%';
        positionResult.yAxis = '-100%';
        break;
      case 'left':
        positionResult.left = '0%';
        positionResult.xAxis = '-105%';
        break;
      case 'leftTop':
        positionResult.top = '0%';
        positionResult.left = '0%';
        positionResult.xAxis = '-105%';
        positionResult.yAxis = '0%';
        break;
      default:
        break;
    }

    return positionResult;
  })();
  return (
    <Container>
      {children}
      <Content {...position}>{message}</Content>
    </Container>
  );
}

const Content = styled.div<Positions>`
  width: fit-content;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: ${(props) => `translate(${props.xAxis}, ${props.yAxis})`};
  color: white;
  opacity: 0;
  padding: 0.5rem;
  border-radius: 0.3rem;
  transition: opacity 0.2s ease-in-out;
  z-index: 99;
`;

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  &:hover,
  &:active {
    ${Content} {
      opacity: 1;
      transition-delay: 0.3s;
    }
  }
`;
