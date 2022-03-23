import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateDB } from '../../Redux/reducer/updateDB';
import { updateUser } from '../../Redux/reducer/updateUser';
import { RootState } from '../../Redux/store/rootStore';
import socket from '../../Utils/socket';
import Game from '../../Interfaces/Game.interface';
import UserInterface from '../../Interfaces/User.interface';
import GameStartButton from './Components/GameStartButton';
import TeamChangeButton from './Components/TeamChangeButton';
import SetGameLength from './Components/SetGameLength';

export default function Room() {
  const game: Game = useSelector((state: RootState) => state.game);
  const user: UserInterface = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
    ! 방장이 게임을 시작시켰을 때 로직
    * @param gameInfo
    * 모든 유저가 준비 됐는지 확인 후 게임 시작 
    * navigation 으로 다음 페이지로 이동
  */

  socket.off('GAME_START').on('GAME_START', (gameInfo) => {
    dispatch(updateDB(gameInfo));
    navigate(`/room/${game.roomId}/start`);
  });
  /*
    ! 누군가 들어왔을 때 로직
    * @param userData = 들어온 유저의 데이터
    * @param userTeam = 들어온 유저가 배정받은 팀
    * 들어온 유저의 데이터와 배정된 팀 정보를 받는다 userData = (isOwner, nickname, uid, _id), 'red' | 'blue'
    * 해당 정보를 바탕으로 팀 state 를 변경한다.
  */

  socket.off('ENTER_ROOM').on('ENTER_ROOM', (gameInfo) => {
    dispatch(updateDB(gameInfo));
  });

  /*
    ! 누군가 팀을 바꿨을 때 로직
    *@param userData = 변경을 한 유저의 데이터
    *@param to = 팀 변경 목적지, ex)red 일 경우 해당 유저의 기존 팀은 blue 팀이고, red 팀으로 변경 요청을 한 것
  */
  socket.off('CHANGE_TEAM').on('CHANGE_TEAM', (gameInfo) => {
    dispatch(updateDB(gameInfo));
  });

  /*
    ! 누군가 떠났을 때 로직
    *@param userData = 떠난 유저의 데이터
    *@param userTeam = 떠난 유저가 속해있던 팀
  */
  socket.off('LEAVE_ROOM').on('LEAVE_ROOM', (gameInfo) => {
    dispatch(updateDB(gameInfo));
  });

  /*
    ! 접속 시 초기 1회 데userInfo이터 받는 이벤트
    *@param gameInfo = 게임에 관한 정보
    ex) 소련팀, 미국팀, 룸아이디, 현재 플레이 현황
    *@param userInfo = 접속한 유저의 정보
    ex) 방장, 소련팀인지?, 닉네임
    * 해당 정보는 서버에서 검증된 정보이므로 이 정보를 가지고 state 를 업데이트 시켜줘야 할 것 같습니다~!
   */
  socket.off('INIT_DATA').on('INIT_DATA', (gameInfo, userInfo) => {
    dispatch(updateUser(userInfo));
    dispatch(updateDB(gameInfo));
  });
  console.log('🎮 ROOM PAGE game 🎮', game);

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
            {game.sovietTeam.players.length ? (
              game.sovietTeam.players.map((player) => <User key={player.uid}>{player.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
        <TeamChangeButton />
        <TeamContainer className='USA'>
          <TeamName className='USA'>
            <span>
              USA
              <img src='../../img/usa.png' alt='USA' />
            </span>
          </TeamName>
          <UserList className='USA'>
            {game.usaTeam.players.length ? (
              game.usaTeam.players.map((player) => <User key={player.uid}>{player.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
      </Teams>
      <Control>
        <GameStartButton />
        <SetGameLength />
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
  flex-direction: column;
  color: black;
  flex-wrap: wrap;
`;

const TeamContainer = styled.div`
  margin: 3rem;
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
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Teams = styled.div`
  display: flex;
  margin-top: 7%;
`;
