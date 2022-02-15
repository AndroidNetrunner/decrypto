import React, { useState } from 'react';
import styled from 'styled-components';
import TeamChangeButton from './Components/TeamChangeButton';
import SetGameLength from './timer';

const dummyUser = {
  userId: 394998,
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
interface Iteam {
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

export default function Game() {
  const [teamNames, setTeamNames] = useState({
    firstTeamName: 'White',
    secondTeamName: 'Black',
  });
  const [team, setTeam] = useState<Iteam>({
    firstTeam: {
      users: [...dummyFirstTeam],
    },
    secondTeam: {
      users: [...dummySecondTeam],
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

  const onClickJoinButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name: teamName },
    } = event;

    if (teamName === 'firstTeam' || teamName === 'secondTeam') {
      const isInclude = team[teamName].users.some((user) => user.userId === dummyUser.userId);
      if (!isInclude && team[teamName].users.length !== 4) {
        const filteredUsers = {
          firstTeam: { users: firstTeam.users.filter((user) => user.userId !== dummyUser.userId) },
          secondTeam: { users: secondTeam.users.filter((user) => user.userId !== dummyUser.userId) },
        };
        setTeam({ ...team, ...filteredUsers, [teamName]: { users: [...team[teamName].users, dummyUser] } });
      } else {
        const filteredUsers = team[teamName].users.filter((user) => user.userId !== dummyUser.userId);
        setTeam({ ...team, [teamName]: { users: [...filteredUsers] } });
      }
    }
  };

  return (
    <Container>
      <TeamContainer>
        <input name='firstTeamName' value={firstTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {firstTeam.users.length ? (
            firstTeam.users.map((user) => <User key={user.userId}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>
        <JoinButton
          type='button'
          name='firstTeam'
          onClick={onClickJoinButton}
          bgColor={
            firstTeam.users.includes(dummyUser)
              ? '#ff9999'
              : firstTeam.users.length === 4
              ? '#ffbe76'
              : '#00008099'
          }
          isFull={firstTeam.users.length === 4}
        >
          {firstTeam.users.includes(dummyUser)
            ? '팀 떠나기'
            : firstTeam.users.length === 4
            ? 'Full'
            : '팀 참가하기'}
        </JoinButton>
      </TeamContainer>
      <TeamChangeButton team={team} setTeam={setTeam} />
      <TeamContainer>
        <input name='secondTeamName' value={secondTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {secondTeam.users.length ? (
            secondTeam.users.map((user) => <User key={user.userId}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>

        <JoinButton
          type='button'
          name='secondTeam'
          onClick={onClickJoinButton}
          bgColor={
            secondTeam.users.includes(dummyUser)
              ? '#ff9999'
              : secondTeam.users.length === 4
              ? '#ffbe76'
              : '#00008099'
          }
          isFull={secondTeam.users.length === 4}
        >
          {secondTeam.users.includes(dummyUser)
            ? '팀 떠나기'
            : secondTeam.users.length === 4
            ? 'Full'
            : '팀 참가하기'}
        </JoinButton>
      </TeamContainer>
      <SetGameLength captain={captain} />
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

const JoinButton = styled.button<{ isFull: boolean; bgColor: string }>`
  display: block;
  margin: 0 auto;
  font-size: 1.6rem;
  color: white;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
  border: none;
  padding: 1rem 0rem;
  border-radius: 1rem;
  transition: all 0.1s linear;
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
