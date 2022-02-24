import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput';

export default function Login() {
  const [nickname, onChangeNickname] = useInput();
  const [roomNumber, onChangeRoomNumber] = useInput();
  const navigate = useNavigate();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`room/${roomNumber}`);
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <InputWrapper>
            <label htmlFor='nickname'>Name</label>
            <input
              autoComplete='off'
              value={nickname}
              onChange={onChangeNickname}
              placeholder='Enter nickname'
              id='nickname'
            />
            <Button disabled={!nickname.length}>Creat Game</Button>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='room'>Room</label>
            <input
              autoComplete='off'
              value={roomNumber}
              onChange={onChangeRoomNumber}
              placeholder='Enter room number'
              id='room'
            />
            <Button disabled={!(nickname.length && roomNumber.length)}>Enter Game</Button>
          </InputWrapper>
        </InputContainer>
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
  height: 100%;
  height: 4.35rem;
  width: 100%;
  max-width: 10rem;
  background-color: #fbeaeb;
  border-radius: 0.5rem;
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child {
    margin-bottom: 8rem;
  }
  label {
    font-family: 'PressStart';
    font-size: 3rem;
    margin-right: 3rem;
    width: fit-content;
    max-width: 24rem;
  }
  input {
    font-family: 'PressStart';
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: none;
    margin-right: 4rem;
    width: 100%;
    max-width: 30rem;
  }
  span {
    height: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 13rem;
`;

const Container = styled.div`
  max-width: 860px;
  margin: auto;
`;
