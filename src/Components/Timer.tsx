import { useRef } from 'react';
import styled from 'styled-components';

export default function Timer({ gameTime }: { gameTime: number }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);

  let progressValue = 0;
  const progressEndValue = 100;
  const setTimer = gameTime * 10;
  const progress = setInterval(() => {
    if (progressRef.current !== null && progressValueRef.current !== null) {
      progressValue += 1;
      progressValueRef.current.textContent = `${(gameTime - (progressValue / 100) * gameTime).toFixed(0)}`;
      progressRef.current.style.background = `conic-gradient(
        #a37094 ${progressValue * 3.6}deg,
        #ccc2c9 ${progressValue * 3.6}deg
        )`;
      if (progressValue === progressEndValue) {
        console.log('done'); // 추후에 서버에 제출하는 코드로 변경
        clearInterval(progress);
      }
    }
  }, setTimer);

  return (
    <div>
      <TimerLeft ref={progressValueRef}>{(setTimer / 10).toFixed(0)}</TimerLeft>
      <CircularProgress ref={progressRef} />
    </div>
  );
}

const TimerLeft = styled.div`
  font-family: neodgm, sans-serif;
  font-size: 10rem;
  text-align: center;
  height: 100px;
  width: 250px;
`;

const CircularProgress = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50%;
`;
