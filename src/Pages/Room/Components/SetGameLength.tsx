import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../Redux/store/rootStore';
import socket from '../../../Utils/socket';
import User from '../../../Interfaces/User.interface';

export default function SetGameLength() {
  const user: User = useSelector((state: RootState) => state.user);

  const onChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gameTime = Number(event.target.value);
    socket.emit('SET_TIMER', gameTime);
  };
  return (
    <SelectBoxWrapper>
      <Select id='timer-select' defaultValue='DEFAULT' onChange={onChangeTime} disabled={!user.captain}>
        <option value='DEFAULT' disabled>
          👑게임 속도 정하기👑
        </option>
        <option value='60'>느릿느릿(20 ~ 30 mins)</option>
        <option value='30'>일반게임(10 ~ 20 mins)</option>
        <option value='15'>스피드전(5 ~ 10 mins)</option>
      </Select>
      <IconSVG width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M10 14L16 6H4L10 14Z' fill='#495057' />
      </IconSVG>
    </SelectBoxWrapper>
  );
}

const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 200px;
  height: 40px;
  padding: 8px 8px;
  font-size: 15px;
  line-height: inherit;
  border: 1px solid;
  border-radius: 10px;
  color: #495057;
  border-color: transparent;
  background-color: #e5dbff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    border-color: none;
  }
  option {
    color: black;
    background-color: black;
  }
`;

const SelectBoxWrapper = styled.div`
  display: flex;
`;

const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 24px;
  height: 24px;
`;
