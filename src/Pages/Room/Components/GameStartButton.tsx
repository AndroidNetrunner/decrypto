import styled from 'styled-components';
import { ITeam } from '..';

interface Props {
  team: ITeam;
  onClickStartButton: () => void;
}

export default function GameStartButton({ team, onClickStartButton }: Props) {
  const { sovietTeam, usaTeam } = team;
  return (
    <Button
      disabled={sovietTeam.users.length < 2 || usaTeam.users.length < 2}
      type='button'
      onClick={onClickStartButton}
    >
      Start
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
