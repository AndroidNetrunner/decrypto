import React, { useState } from 'react';
import styled from 'styled-components';

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
    userId: 132,
    nickname: 'juseo',
  },
  {
    userId: 122,
    nickname: 'jinbekim',
  },
];

interface ITempUser {
  nickname: string;
  userId: number;
}

export default function Game() {
  const [teamNames, setTeamNames] = useState({
    firstTeamName: 'White',
    secondTeamName: 'Black',
  });
  const [firstTeam, setFirstTeam] = useState<ITempUser[]>(dummyFirstTeam);
  const [secondTeam, setSecondTeam] = useState<ITempUser[]>(dummySecondTeam);

  const { firstTeamName, secondTeamName } = teamNames;

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTeamNames({
      ...teamNames,
      [name]: value,
    });
  };

  const onClickJoinButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    if (name === 'firstTeam') {
      const targetIndex = firstTeam.findIndex((user) => user.userId === dummyUser.userId);
      if (targetIndex === -1) {
        if (firstTeam.length === 4) {
          alert('인원이 이상합니다!');
          return;
        }
        const filterdUser = secondTeam.filter((user) => user.userId !== dummyUser.userId);
        setSecondTeam(filterdUser);
        setFirstTeam([...firstTeam, dummyUser]);
      } else {
        setFirstTeam([...firstTeam.slice(0, targetIndex), ...firstTeam.slice(targetIndex + 1)]);
      }
    } else if (name === 'secondTeam') {
      const targetIndex = secondTeam.findIndex((user) => user.userId === dummyUser.userId);
      if (targetIndex === -1) {
        if (secondTeam.length === 4) {
          alert('인원이 이상합니다!');
          return;
        }
        const filterdUser = firstTeam.filter((user) => user.userId !== dummyUser.userId);
        setFirstTeam(filterdUser);
        setSecondTeam([...secondTeam, dummyUser]);
      } else {
        setSecondTeam([...secondTeam.slice(0, targetIndex), ...secondTeam.slice(targetIndex + 1)]);
      }
    }
  };

  return (
    <Container>
      <TeamContainer>
        <input name='firstTeamName' value={firstTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {firstTeam.length ? (
            firstTeam.map((user) => <User key={user.userId}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>
        <JoinButton
          type='button'
          name='firstTeam'
          onClick={onClickJoinButton}
          isFull={firstTeam.length === 4}
        >
          {firstTeam.includes(dummyUser) ? '팀 떠나기' : firstTeam.length === 4 ? 'Full' : '팀 참가하기'}
        </JoinButton>
      </TeamContainer>

      <TeamContainer>
        <input name='secondTeamName' value={secondTeamName} onChange={onChangeName} type='text' />
        <UserList>
          {secondTeam.length ? (
            secondTeam.map((user) => <User key={user.userId}>{user.nickname}</User>)
          ) : (
            <User>참가하세오,,!</User>
          )}
        </UserList>

        <JoinButton
          type='button'
          name='secondTeam'
          onClick={onClickJoinButton}
          isFull={secondTeam.length === 4}
        >
          {secondTeam.includes(dummyUser) ? '팀 떠나기' : secondTeam.length === 4 ? 'Full' : '팀 참가하기'}
        </JoinButton>
      </TeamContainer>
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

const JoinButton = styled.button<{ isFull: boolean }>`
  display: block;
  margin: 0 auto;
  font-size: 1.6rem;
  color: white;
  width: 100%;
  /* background-color: rgba(0, 0, 128, 0.6); */
  background-color: ${(props) => (props.isFull ? '#ff9999' : 'rgba(0, 0, 128, 0.6)')};
  border: none;
  padding: 1rem 0rem;
  border-radius: 1rem;
  transition: all 0.1s linear;
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
  cursor: pointer;
`;
