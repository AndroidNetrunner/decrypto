import { useEffect, useState } from 'react';
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
  isSovietTeam: boolean;
}

export interface ITeam {
  sovietTeam: {
    users: User[];
  };
  usaTeam: {
    users: User[];
  };
}

export default function Room() {
  const [user, setUser] = useState<User>({
    _id: '',
    uid: '',
    nickname: '',
    isOwner: '',
    isSovietTeam: true,
  });
  const [team, setTeam] = useState<ITeam>({
    sovietTeam: {
      users: [],
    },
    usaTeam: {
      users: [],
    },
  });

  const { sovietTeam, usaTeam } = team;

  /*
    ! 방장이 게임 시작 버튼을 눌렀을 때의 로직
  */
  const onClickStartButton = () => {
    if (sovietTeam.users.length < 2 || usaTeam.users.length < 2 || !user.isOwner) {
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
    const to = user.isSovietTeam ? 'soviet' : 'usa';
    socket.emit('CHANGE_TEAM', uid, to, () => {
      const afterChangedUserData = { ...user, isSovietTeam: !user.isSovietTeam };
      if (to === 'soviet') {
        const filteredUser = team.usaTeam.users.filter((usaTeamUser) => usaTeamUser.uid !== uid);
        setTeam({
          sovietTeam: { users: [...team.sovietTeam.users, afterChangedUserData] },
          usaTeam: { users: [...filteredUser] },
        });
      } else if (to === 'usa') {
        const filteredUser = team.sovietTeam.users.filter((sovietTeamUser) => sovietTeamUser.uid !== uid);
        setTeam({
          sovietTeam: { users: [...filteredUser] },
          usaTeam: { users: [...team.usaTeam.users, afterChangedUserData] },
        });
      }
      setUser(afterChangedUserData);
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
    if (userTeam === 'soviet') {
      setTeam({
        sovietTeam: { users: [...sovietTeam.users, userData] },
        usaTeam: { users: [...usaTeam.users] },
      });
    } else {
      setTeam({
        sovietTeam: { users: [...sovietTeam.users] },
        usaTeam: { users: [...usaTeam.users, userData] },
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
    if (to === 'soviet') {
      const filteredUser = team.usaTeam.users.filter((usaTeamUser) => usaTeamUser.uid !== uid);
      setTeam({
        sovietTeam: { users: [...team.sovietTeam.users, userData] },
        usaTeam: { users: [...filteredUser] },
      });
    } else {
      const filteredUser = team.sovietTeam.users.filter((sovietTeamUser) => sovietTeamUser.uid !== uid);
      setTeam({
        sovietTeam: { users: [...filteredUser] },
        usaTeam: { users: [...team.usaTeam.users, userData] },
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
    if (userTeam === 'soviet') {
      const filteredUser = team.sovietTeam.users.filter((sovietTeamUser) => sovietTeamUser.uid !== uid);
      setTeam({
        ...team,
        sovietTeam: { users: [...filteredUser] },
      });
    } else {
      const filteredUser = team.usaTeam.users.filter((sovietTeamUser) => sovietTeamUser.uid !== uid);
      setTeam({
        ...team,
        usaTeam: { users: [...filteredUser] },
      });
    }
    console.log('👋🏻 나간 유저 👋🏻', userData);
  });

  /*
    ! 접속 시 초기 데이터 받는 이벤트
    *@param gameInfo = 게임에 관한 정보
    ex) 소련팀, 미국팀, 룸아이디, 현재 플레이 현황

    *@param userInfo = 접속한 유저의 정보
    ex) 방장, 소련팀인지?, 닉네임

    * 해당 정보는 서버에서 검증된 정보이므로 이 정보를 가지고 state 를 업데이트 시켜줘야 할 것 같습니다~!
   */
  socket.off('INIT_DATA').on('INIT_DATA', (gameInfo, userInfo) => {
    console.log(gameInfo);
    console.log(userInfo);
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log('🙌🏻 이건 저에요 🙌🏻', user);

  return (
    <Container>
      <Teams>
        <TeamContainer className='Soviet'>
          <TeamName className='Soviet'>
            <span>
              Soviet
              <img src='../../img/soviet.png' alt='soviet' />
            </span>
          </TeamName>
          <UserList className='Soviet'>
            {sovietTeam.users.length ? (
              sovietTeam.users.map((user) => <User key={user.uid}>{user.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
        <TeamChangeButton user={user} team={team} onClickChangeButton={onClickChangeButton} />
        <TeamContainer className='USA'>
          <TeamName className='USA'>
            <span>
              USA
              <img src='../../img/usa.png' alt='USA' />
            </span>
          </TeamName>
          <UserList className='USA'>
            {usaTeam.users.length ? (
              usaTeam.users.map((user) => <User key={user.uid}>{user.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
      </Teams>
      <Control>
        <GameStartButton team={team} onClickStartButton={onClickStartButton} />
        {/* <SetGameLength captain={captain} /> */}
      </Control>
    </Container>
  );
}

const TeamName = styled.div`
  display: flex;
  height: 8rem;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 5rem;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  span {
    position: relative;
  }
  img {
    position: absolute;
    transform: translateY(-25%);
    right: -10rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
`;

const TeamContainer = styled.div`
  margin: 3rem 5rem;
  width: 100%;
  height: 100%;
  min-width: 40rem;
  .Soviet {
    background-color: #f15852;
  }
  .USA {
    background-color: #9ebdf0;
  }
`;

const UserList = styled.ul`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  height: 100%;
  margin-bottom: 3rem;
  border-radius: 1rem;
`;

const User = styled.li`
  margin: 1rem 1rem;
  padding: 3rem 1rem;
  border: 1rem 1rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 1rem;
  background-color: rgb(255, 255, 255, 0.3);
`;

const Control = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Teams = styled.div`
  display: flex;
  margin: 5rem 0rem 0rem 0rem;
`;
