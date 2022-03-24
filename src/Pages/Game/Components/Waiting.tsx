import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Waiting() {
  const content = '\x00....';
  const [dot, setDot] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const animKey = setInterval(() => {
      setIndex((pervIndex) => {
        if (pervIndex >= 3) {
          setDot('');
          return 0;
        }
        return pervIndex + 1;
      });
    }, 1000);
    return () => clearInterval(animKey);
  }, []);

  useEffect(() => {
    setDot((prevDot) => prevDot + content[index]);
  }, [index]);

  return (
    <Container>
      <span>Waiting{dot}</span>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  left: 0;
  min-width: 200px;
  font-size: 15pt;
  font-weight: bold;
  background-color: gray;
  text-align: center;
  padding: 2rem 4rem;
  border-radius: 1rem;
  border: 0.3rem white solid;
  margin-right: 2rem;
  span {
    position: absolute;
    left: 5rem;
    bottom: 0.8rem;
  }
`;
