import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from './Hooks/useInput';

export default function Login() {
  const [nickname, onChangeNickname] = useInput();
  const [roomNumber, onChangeRoomNumber] = useInput();
  const navigate = useNavigate();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`game/${roomNumber}`);
  };
  return (
    <Container>
      <Title>Decrypto</Title>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <label htmlFor='nickname'>
            닉네임
            <input value={nickname} onChange={onChangeNickname} id='nickname' />
          </label>
          <label htmlFor='room'>
            방 번호
            <input value={roomNumber} onChange={onChangeRoomNumber} id='room' />
          </label>
        </InputContainer>
        <ButtonContainer>
          <EntryButton disabled={!nickname.length}>방 만들기</EntryButton>
          <EntryButton disabled={!(nickname.length && roomNumber.length)}>참가하기</EntryButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

// 둘 다 값이 없을 경우 => 방 만들기, 참가하기 비활성화
// 닉네임에만 값이 있을 경우 -> 방 만들기 버튼 활성화, 참가하기 버튼 비활성화
// 닉네임과 방 번호에 값이 있을 경우 -> 참가하기 버튼 활성화

// 제목
// Input 2개

const Button = styled.button`
  &:disabled {
    pointer-events: none;
    opacity: 0.65;
  }
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
`;

const EntryButton = styled(Button)`
  background-color: purple;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1``;

const Container = styled.div`
  max-width: 860px;
  margin: auto;
`;
