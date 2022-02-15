import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Heading() {
  const navigate = useNavigate();

  return (
    <Container>
      <button type='button' onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <RoomNo>방 번호: 253</RoomNo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 30px;
`;

const RoomNo = styled.h1`
  margin: auto;
`;
