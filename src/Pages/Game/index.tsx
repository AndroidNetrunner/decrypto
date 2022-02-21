import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import socket from '../../socket';
import GameStartButton from './Components/GameStartButton';
import TeamChangeButton from './Components/TeamChangeButton';
import SetGameLength from './timer';

const dummyUser = {
  userId: 394998,
  nickname: 'gamja',
};

interface IUser {
  nickname: string;
  uuid: string;
  isOwner: boolean;
  _id: string;
}
interface ITeam {
  firstTeam: {
    users: IUser[];
  };
  secondTeam: {
    users: IUser[];
  };
}

const captain = {
  uid: 394998,
  username: 'yeoyoon',
};

export default function Game() {
  const [teamNames, setTeamNames] = useState({
    firstTeamName: 'White',
    secondTeamName: 'Black',
  });

  const [team, setTeam] = useState<ITeam>({
    firstTeam: {
      users: [],
    },
    secondTeam: {
      users: [],
    },
  });

  const { firstTeamName, secondTeamName } = teamNames;
  const { firstTeam, secondTeam } = team;

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTeamNames({
      ...teamNames,
      [name]: value,
    });
  };

  const onClickStartButton = () => {
    if (firstTeam.users.length < 2 || secondTeam.users.length < 2 || captain.uid !== dummyUser.userId) {
      return;
    }

    // * 방장이 게임 스타트를 하면 현재 팀 state 를 서버로 보낸다.
    // * 그 후 서버는 각각의 인원에게 팀 state 를 보내고, 방장에게 callback 함수를 실행시키도록 한다.
    // * 우선 navigate 로 창 전환을 한 후 GAME_START 이벤트로 넘어온 팀 배열을 적용한다.

    // TODO: 팀 변경, 게임 떠나기(방장, 팀원)

    // ? 방장이 게임 시작할 때 서버에 보내야 할 것들은 무엇일까?
    // ? 게임 설정, 팀원
    socket.emit('GAME_START', team, (confirmTeam) => {
      console.log('GAME_START | 방장');
      console.log(confirmTeam);
    });
  };

  const { roomId } = useParams();
  // ! 누군가 들어왔을 때 로직
  socket.off('ENTER_ROOM').on('ENTER_ROOM', (userData) => {
    setTeam({ ...team, firstTeam: { users: [...team.firstTeam.users, userData] } });
    // 들어온 유저의 데이터 : userData: { nickname: string; uuid: string; isOwner: boolean; _id: string }
    console.log(userData);
  });

  // ! 누군가 떠났을 때 로직
  socket.off('LEAVE_ROOM').on('LEAVE_ROOM', (uuid) => {
    console.log(uuid);
    // ? 떠난 유저를 지우기 위해 uuid 만 제공받아 클라이언트에서 처리할 것인지
    // ? 혹은 응답에 team 을 통째로 받아 처리할 것인지
    // * 클라이언트 측에서 처리하기엔 2안이 더 편리할 것 같다. 그냥 setTeam(response) 하면 되지 않을까?
    // * 첫번째 방식으로 처리한다면 uuid, 나가기 전 팀을 전달해야 클라이언트에서 불필요한 접근이 줄어들 것 같다.
  });

  useEffect(() => {
    axios({ method: 'GET', url: `${import.meta.env.REACT_APP_BACKEND_BASE_URL}/game/${roomId}` }).then(
      (response) => {
        const {
          data: { users },
        } = response;
        setTeam({ ...team, firstTeam: { users: [...users] } });
        console.log(users);
      },
      // * 여기서도 팀을 통째로 받는 것이 쉬울 것 같다.
      // * 그러기 위해선 처음부터 db 에 team 이 분리되어 있어야한다.
    );

    return () => socket.disconnect();
  }, []);

  return (
    <Container>
      <TeamContainer>
        <input name='firstTeamName' value={firstTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {firstTeam.users.length ? (
            firstTeam.users.map((user) => <User key={user.uuid}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>
      </TeamContainer>
      <TeamChangeButton team={team} setTeam={setTeam} />
      <TeamContainer>
        <input name='secondTeamName' value={secondTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {secondTeam.users.length ? (
            secondTeam.users.map((user) => <User key={user.uuid}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>
      </TeamContainer>
      {/* <SetGameLength captain={captain} /> */}
      <GameStartButton team={team} onClickStartButton={onClickStartButton} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const TeamContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 60rem;
  input {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 2rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 128, 0.6);
    &:focus {
      outline: none;
    }
  }
`;

const UserList = styled.ul`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  border: 1px solid black;
  margin-bottom: 3rem;
  border-radius: 1rem;
`;

const User = styled.li`
  padding: 3rem 1rem;
  font-size: 2rem;
  text-align: center;
`;
