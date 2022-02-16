import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Timer({ gameTime }: { gameTime: number }) {
  const progressRef = useRef<HTMLDivElement>(null);

  let progressValue = 0;
  const progressEndValue = 100;
  const setTimer = gameTime * 10;
  const progress = setInterval(() => {
    if (progressRef.current !== null) {
      progressValue += 1;
      progressRef.current.style.background = `conic-gradient(
        #a37094 ${progressValue * 3.6}deg,
        #ccc2c9 ${progressValue * 3.6}deg
        )`;
      if (progressValue === progressEndValue) {
        console.log('done'); //추후에 서버에 제출하는 코드로 변경
        clearInterval(progress);
      }
    }
  }, setTimer);

  useEffect(() => {
    return () => clearInterval(progress);
  }, []);

  return <CircularProgress ref={progressRef} />;
}

const CircularProgress = styled.div`
  position: relative;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  .before {
    content: '';
    position: absolute;
    height: 84%;
    width: 84%;
    background-color: #ffffff;
    border-radius: 50%;
  }
`;
