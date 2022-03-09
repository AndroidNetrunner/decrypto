import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameStartButton from './Components/GameStartButton';
import TeamChangeButton from './Components/TeamChangeButton';
import SetGameLength from './Components/SetGameLength';

const dummyUser = {
  userId: '0909',
  nickname: 'gamja',
};

const dummyFirstTeam = [
  {
    userId: 1,
    nickname: 'byukim',
  },
  {
    userId: 2,
    nickname: 'sjo',
  },
  {
    userId: 3,
    nickname: 'yeju',
  },
];

const dummySecondTeam = [
  {
    userId: 6,
    nickname: 'yeoyoon',
  },
  {
    userId: 394998,
    nickname: 'gamja',
  },
  {
    userId: 122,
    nickname: 'jinbekim',
  },
];

interface IUser {
  userId: number;
  nickname: string;
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
  uid: '0909',
  username: 'yeoyoon',
};

export default function Room() {
  const navigate = useNavigate();
  const [team, setTeam] = useState<ITeam>({
    firstTeam: {
      users: [...dummyFirstTeam],
    },
    secondTeam: {
      users: [...dummySecondTeam],
    },
  });

  const { firstTeam, secondTeam } = team;

  const onClickStartButton = () => {
    if (firstTeam.users.length < 2 || secondTeam.users.length < 2 || captain.uid !== dummyUser.userId) {
      return;
    }
    console.log('start');
    navigate('start');
  };

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
            {firstTeam.users.length ? (
              firstTeam.users.map((user) => <User key={user.userId}>{user.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
        <TeamChangeButton team={team} setTeam={setTeam} />
        <TeamContainer className='USA'>
          <TeamName className='USA'>
            <span>
              USA
              <img src='../../img/usa.png' alt='USA' />
            </span>
          </TeamName>
          <UserList className='USA'>
            {secondTeam.users.length ? (
              secondTeam.users.map((user) => <User key={user.userId}>{user.nickname}</User>)
            ) : (
              <User>참가하세오,,!</User>
            )}
          </UserList>
        </TeamContainer>
      </Teams>
      <Control>
        <GameStartButton team={team} onClickStartButton={onClickStartButton} />
        <SetGameLength captain={captain} />
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
  margin: 7% 0 0;
`;
