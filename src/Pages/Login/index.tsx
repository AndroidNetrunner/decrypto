import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { v4 as uuidV4 } from 'uuid';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import socket from '../../Utils/socket';

export default function Login() {
  const [nickname, onChangeNickname] = useInput(localStorage.getItem('nick') ?? '');
  const [toggleButton, setToggleButton] = useState(false);
  const [roomId, onChangeRoomId] = useInput();
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.connect();
    enterRoom();
  };

  const enterRoom = () => {
    if (toggleButton === true) return;
    setToggleButton(true);
    // * 방 만들기 or 방 참가하기 했을 때 로직입니다.
    // * 방 만들기 : nanoid 로 random 한 str 만들어서 보냅니다.
    // * 방 참가하기 : 입력된 roomId 를 사용합니다.
    // * emit(event, 보낼 정보1, 보낼 정보2, 맨 마지막엔 백엔드에서 처리가 완료된 후 발생할 callback 함수)
    let uid = localStorage.getItem('uid');
    localStorage.setItem('nick', nickname);
    if (uid === null) {
      uid = uuidV4();
      localStorage.setItem('uid', uid);
    }
    const payload = { nickname, roomId, uid };
    socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
      navigate(`room/${confirmRoomId}`);
    });
  };

  useEffect(() => {
    socket.disconnect();
  }, []);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <InputWrapper>
            <span>Name</span>
            <input
              autoComplete='off'
              value={nickname}
              onChange={onChangeNickname}
              placeholder='Enter nickname'
              id='nickname'
            />
          </InputWrapper>
          <InputWrapper>
            <span>Room</span>
            <input
              autoComplete='off'
              value={roomId}
              onChange={onChangeRoomId}
              placeholder='Enter room number'
              id='room'
            />
          </InputWrapper>
        </InputContainer>
        <Button disabled={!(nickname.length && roomId.length)}>Enter Game</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 860px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 13rem;
`;

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
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  margin: auto;
  margin-top: 8rem;
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
  span {
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
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  }
`;
