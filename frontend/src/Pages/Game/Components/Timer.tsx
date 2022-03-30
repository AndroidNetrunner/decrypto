import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';

export default function Timer() {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);

  let progressValue = 0;
  const progressEndValue = 100;
  const gameTime = useSelector((rootState: RootState) => rootState.game.timer);
  const setTimer = gameTime * 10;

  useEffect(() => {
    const progress = setInterval(() => {
      if (progressRef.current !== null && progressValueRef.current !== null) {
        progressValue += 1;
        progressValueRef.current.textContent = `${(gameTime - (progressValue / 100) * gameTime).toFixed(0)}`;
        progressRef.current.style.background = `conic-gradient(
          #a37094 ${progressValue * 3.6}deg,
          #ccc2c9 ${progressValue * 3.6}deg
          )`;
        if (progressValue === progressEndValue) {
          clearInterval(progress);
        }
      }
    }, setTimer);
    return () => clearInterval(progress);
  }, []);
  return (
    <div>
      <TimerLeft ref={progressValueRef}>{(setTimer / 10).toFixed(0)}</TimerLeft>
      <CircularProgress ref={progressRef} />
    </div>
  );
}

const TimerLeft = styled.div`
  font-family: neodgm, sans-serif;
  font-size: 2rem;
  text-align: center;
  height: 20px;
  width: 50px;
  margin: 10px;
`;

const CircularProgress = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
`;
