import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

// 테스트용 더미 유저
// auth 연결하면 currentUser 로 검증 예정
const dummyUser = {
  userId: 394998,
  nickname: 'gamja',
};

interface Props {
  team: ITeam;
  setTeam: React.Dispatch<React.SetStateAction<ITeam>>;
}

export default function TeamChangeButton({ team, setTeam }: Props) {
  const [isFirstTeamUser, setIsFirstTeamUser] = useState<boolean>(false);
  const { firstTeam, secondTeam } = team;

  useEffect(() => {
    if (team.firstTeam.users.some((user) => user.userId === dummyUser.userId)) {
      setIsFirstTeamUser(true);
    }
  }, []);

  const onClickTeamChangeButton = () => {
    if (isFirstTeamUser) {
      const filteredUsers = firstTeam.users.filter((user) => user.userId !== dummyUser.userId);
      setTeam({
        firstTeam: { users: [...filteredUsers] },
        secondTeam: { users: [...secondTeam.users, dummyUser] },
      });
    }
    if (!isFirstTeamUser) {
      const filteredUsers = secondTeam.users.filter((user) => user.userId !== dummyUser.userId);
      setTeam({
        firstTeam: { users: [...firstTeam.users, dummyUser] },
        secondTeam: { users: [...filteredUsers] },
      });
    }
    setIsFirstTeamUser((prev) => !prev);
  };

  return (
    <Wrapper>
      <Button type='button' onClick={onClickTeamChangeButton} isFirstTeamUser={isFirstTeamUser}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='3rem'
          height='3rem'
          version='1.1'
          viewBox='0 0 700 555'
        >
          <path d='m556.3 203.5h-223.91l61.609-61.633c13.965-13.934 21.684-32.523 21.684-52.277 0-19.75-7.7188-38.344-21.684-52.289-28.824-28.84-75.77-28.84-104.61 0l-187.83 187.85c-13.996 13.922-21.699 32.496-21.699 52.309v1.707c0 19.758 7.6602 38.305 21.582 52.219l187.93 187.93c13.961 14.012 32.547 21.746 52.348 21.746 19.773 0 38.371-7.7344 52.227-21.621 14-13.977 21.746-32.559 21.746-52.344 0-19.75-7.6953-38.309-21.684-52.328l-61.566-61.602h223.87c40.641 0 73.703-33.566 73.703-74.848-0.007812-41.246-33.07-74.816-73.711-74.816z' />
        </svg>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button<{ isFirstTeamUser: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 1rem;
  background-color: ${(props) => (props.isFirstTeamUser ? '#9EBDF0' : '#f15852')};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.isFirstTeamUser ? '#9EBDF0' : '#f15852')};
  }
  &:active {
    transform: scale(0.95);
  }
  svg {
    fill: white;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isFirstTeamUser ? 'rotateY(180deg)' : '')};
  }
`;
