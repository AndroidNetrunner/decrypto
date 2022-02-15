import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  captain: {
    uid: string;
    username: string;
  };
}

const currentUser = {
  uid: '0909',
  username: 'yeooyoon',
};

export default function SetGameLength({ captain }: Props) {
  const [gameTime, setGameTime] = useState(30);

  const onChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    setGameTime(Number(value));
  };
  console.log(gameTime);
  return (
    <SelectBoxWrapper>
      <Select id='timer-select' onChange={onChangeTime} disabled={currentUser.uid !== captain.uid}>
        <option disabled selected>
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

// Icon에 사용할 Icon SVG 컴포넌트 생성
const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 24px;
  height: 24px;
`;

const Option = styled.option`
  background: black;
  color: #fff;
  padding: 3px 0;
`;
