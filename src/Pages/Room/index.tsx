import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import socket from '../../Utils/socket';
import GameStartButton from './Components/GameStartButton';
import TeamChangeButton from './Components/TeamChangeButton';
import SetGameLength from './Components/SetGameLength';

export interface User {
  _id: string;
  uid: string;
  nickname: string;
  isOwner: string;
  isRedTeam: boolean;
}

export interface ITeam {
  firstTeam: {
    users: User[];
  };
  secondTeam: {
    users: User[];
  };
}

export default function Room() {
  const { roomId } = useParams();
  const [user, setUser] = useState<User>({
    _id: '',
    uid: '',
    nickname: '',
    isOwner: '',
    isRedTeam: true,
  });
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

  /*
    ! 방장이 게임 시작 버튼을 눌렀을 때의 로직
  */
  const onClickStartButton = () => {
    if (firstTeam.users.length < 2 || secondTeam.users.length < 2 || !user.isOwner) {
      return;
    }
    console.log('나는 방장이지롱');
    // socket.emit('GAME_START', team, (confirmTeam) => {
    //   console.log('GAME_START | 방장');
    //   console.log(confirmTeam);
    // });
  };

  /*
    ! 사용자가 팀 변경을 요청하는 로직
  */
  const onClickChangeButton = () => {
    const { uid } = user;
    const to = user.isRedTeam ? 'blue' : 'red';
    socket.emit('CHANGE_TEAM', uid, to, () => {
      const afterUserData = { ...user, isRedTeam: !user.isRedTeam };
      if (to === 'red') {
        const filteredUser = team.secondTeam.users.filter((secondTeamUser) => secondTeamUser.uid !== uid);
        setTeam({
          firstTeam: { users: [...team.firstTeam.users, afterUserData] },
          secondTeam: { users: [...filteredUser] },
        });
      } else if (to === 'blue') {
        const filteredUser = team.firstTeam.users.filter((firstTeamUser) => firstTeamUser.uid !== uid);
        setTeam({
          firstTeam: { users: [...filteredUser] },
          secondTeam: { users: [...team.secondTeam.users, afterUserData] },
        });
      }
      setUser(afterUserData);
    });
  };

  /*
    ! 누군가 들어왔을 때 로직
    * @param userData = 들어온 유저의 데이터
    * @param userTeam = 들어온 유저가 배정받은 팀
    * 들어온 유저의 데이터와 배정된 팀 정보를 받는다 userData = (isOwner, nickname, uid, _id), 'red' | 'blue'
    * 해당 정보를 바탕으로 팀 state 를 변경한다.
  */
  socket.off('ENTER_ROOM').on('ENTER_ROOM', (userData, userTeam) => {
    if (userTeam === 'red') {
      setTeam({
        firstTeam: { users: [...firstTeam.users, userData] },
        secondTeam: { users: [...secondTeam.users] },
      });
    } else {
      setTeam({
        firstTeam: { users: [...firstTeam.users] },
        secondTeam: { users: [...secondTeam.users, userData] },
      });
    }
    console.log('🚀 들어온 유저 🚀', userData);
  });

  /* 
    ! 누군가 팀을 바꿨을 때 로직
    *@param userData = 변경을 한 유저의 데이터
    *@param to = 팀 변경 목적지, ex)red 일 경우 해당 유저의 기존 팀은 blue 팀이고, red 팀으로 변경 요청을 한 것
  */

  socket.off('CHANGE_TEAM').on('CHANGE_TEAM', (userData, to) => {
    const { uid } = userData;
    if (to === 'red') {
      const filteredUser = team.secondTeam.users.filter((secondTeamUser) => secondTeamUser.uid !== uid);
      setTeam({
        firstTeam: { users: [...team.firstTeam.users, userData] },
        secondTeam: { users: [...filteredUser] },
      });
    } else {
      const filteredUser = team.firstTeam.users.filter((firstTeamUser) => firstTeamUser.uid !== uid);
      setTeam({
        firstTeam: { users: [...filteredUser] },
        secondTeam: { users: [...team.secondTeam.users, userData] },
      });
    }
    console.log('🔄 팀을 바꾼 유저 🔄', userData);
  });

  /*
    ! 누군가 떠났을 때 로직
    *@param userData = 떠난 유저의 데이터
    *@param userTeam = 떠난 유저가 속해있던 팀
  */
  socket.off('LEAVE_ROOM').on('LEAVE_ROOM', (userData, userTeam) => {
    const { uid } = userData;
    if (userTeam === 'red') {
      const filteredUser = team.firstTeam.users.filter((firstTeamUser) => firstTeamUser.uid !== uid);
      setTeam({
        ...team,
        firstTeam: { users: [...filteredUser] },
      });
    } else {
      const filteredUser = team.secondTeam.users.filter((firstTeamUser) => firstTeamUser.uid !== uid);
      setTeam({
        ...team,
        secondTeam: { users: [...filteredUser] },
      });
    }
    console.log('👋🏻 나간 유저 👋🏻', userData);
  });

  /*
    ! 초기 로딩시 받아야 할 데이터
    기존에 들어와 있는 유저들의 목록을 받아서 반영해야한다.
    에러가 발생하는 경우는 새로고침을 하여 방이 사라졌을 때 발생하므로 이전 페이지로 리다이렉트 해줘야한다.
  */
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    axios({
      method: 'GET',
      url: `${import.meta.env.REACT_APP_BACKEND_BASE_URL}/game/${roomId}`,
      params: { uid },
    })
      .then((response) => {
        const { data } = response;
        const isFirstTeamUser = Boolean(
          data.gameInfo.team.redTeam.users.find((firstTeamUser: User) => firstTeamUser.uid === uid),
        );
        setUser({ ...data.userInfo, isRedTeam: isFirstTeamUser });
        setTeam({
          firstTeam: { users: [...data.gameInfo.team.redTeam.users] },
          secondTeam: { users: [...data.gameInfo.team.blueTeam.users] },
        });
      })
      .catch((e) => console.log(e));
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log('🙌🏻 이건 저에요 🙌🏻', user);

  return (
    <Container>
      <TeamContainer>
        <input name='firstTeamName' value={firstTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {firstTeam.users.length ? (
            firstTeam.users.map((user) => <User key={user.uid}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>
      </TeamContainer>
      <TeamChangeButton user={user} team={team} onClickChangeButton={onClickChangeButton} />
      <TeamContainer>
        <input name='secondTeamName' value={secondTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {secondTeam.users.length ? (
            secondTeam.users.map((user) => <User key={user.uid}>{user.nickname}</User>)
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
