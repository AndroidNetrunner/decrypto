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

interface Props {
  team: Iteam;
  onClickStartButton: () => void;
}

export default function GameStartButton({ team, onClickStartButton }: Props) {
  const { firstTeam, secondTeam } = team;
  return (
    <Button
      disabled={firstTeam.users.length < 2 || secondTeam.users.length < 2}
      type='button'
      onClick={onClickStartButton}
    >
      hi
    </Button>
  );
}

const Button = styled.button`
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  font-size: 2rem;
  padding: 1.5rem 8rem;
  background-color: #ffdf86;
  border: 3px solid #e4dbff;
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: ${(props) => (props.disabled ? '' : 'scale(0.95)')};
  }
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    opacity: 0.65;
    filter: blur(1px);
  }
`;
