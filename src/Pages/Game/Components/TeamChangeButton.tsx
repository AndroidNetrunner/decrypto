import styled from 'styled-components';

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

// 테스트용 더미 유저
// auth 연결하면 currentUser 로 검증 예정
const dummyUser = {
  userId: 394998,
  nickname: 'gamja',
};

interface Props {
  setTeam: React.Dispatch<React.SetStateAction<Iteam>>;
}

export default function TeamChangeButton({ setTeam }: Props) {
  const onClickTeamChangeButton = () => {
    setTeam((oldTeam) => {
      const { firstTeam, secondTeam } = oldTeam;
      if (firstTeam.users.find((user) => user.userId === dummyUser.userId)) {
        const filteredUsers = firstTeam.users.filter((user) => user.userId !== dummyUser.userId);
        return {
          firstTeam: { users: [...filteredUsers] },
          secondTeam: { users: [...secondTeam.users, dummyUser] },
        };
      }
      if (secondTeam.users.find((user) => user.userId === dummyUser.userId)) {
        const filteredUsers = secondTeam.users.filter((user) => user.userId !== dummyUser.userId);
        return {
          firstTeam: { users: [...firstTeam.users, dummyUser] },
          secondTeam: { users: [...filteredUsers] },
        };
      }
      return { ...oldTeam };
    });
  };
  return (
    <Button type='button' onClick={onClickTeamChangeButton}>
      {/* //* 💡 요거 속한 팀에 따라 아이콘 변경하면 좋을 것 같음! */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='25px'
        height='25px'
        version='1.1'
        viewBox='0 0 700 700'
      >
        <g xmlns='http://www.w3.org/2000/svg'>
          <path d='m608.72 260.4c-9.5195-9.5195-24.641-9.5195-33.602 0l-23.516 23.523v-3.9219c0-111.44-90.719-201.6-201.6-201.6-53.199 0-103.6 20.719-141.68 58.238-9.5195 9.5195-9.5195 24.641 0 33.602 9.5195 9.5195 24.641 9.5195 33.602 0 29.121-28.559 67.199-44.238 108.08-44.238 84.559 0 154 68.879 154 154v3.9219l-23.52-23.52c-9.5195-9.5195-24.641-9.5195-33.602 0-8.9609 9.5195-9.5195 24.641 0 33.602l63.84 64.395c4.4805 4.4805 10.641 7.2812 16.801 7.2812 6.1602 0 12.32-2.2383 16.801-7.2812l64.398-64.398c9.5195-9.5195 9.5195-24.641 0-33.602z' />
          <path d='m458.08 389.2c-29.121 28.559-67.199 44.238-108.08 44.238-84.559 0-154-68.879-154-154v-3.9219l23.52 23.52c4.4805 4.4805 10.641 7.2812 16.801 7.2812 6.1602 0 12.32-2.2383 16.801-7.2812 9.5195-9.5195 9.5195-24.641 0-33.602l-63.84-63.832c-9.5195-9.5195-24.641-9.5195-33.602 0l-64.398 64.398c-9.5195 9.5195-9.5195 24.641 0 33.602 9.5195 8.9609 24.641 9.5195 33.602 0l23.52-23.52-0.003906 3.918c0 111.44 90.719 201.6 201.6 201.6 53.199 0 103.6-20.719 141.68-58.238 9.5195-9.5195 9.5195-24.641 0-33.602-8.9609-9.5234-24.078-9.5234-33.602-0.5625z' />
        </g>
      </svg>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 1rem;
  background-color: #ff9999;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #ff9999c0;
  }
  &:active {
    transform: scale(0.9);
  }
  svg {
    fill: white;
  }
`;
