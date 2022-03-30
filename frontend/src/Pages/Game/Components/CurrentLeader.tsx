import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';

function CurrentLeader({ leader }: { leader: string }) {
  const { stageNumber } = useSelector((rootState: RootState) => rootState.game);
  return (
    <ShowLeader turn={stageNumber}>
      <span>현재 출제자: {leader}</span>
    </ShowLeader>
  );
}

const ShowLeader = styled.div<{ turn: number }>`
  margin-top: 2rem;
  font-size: 2rem;
  color: white;
  width: 48%;
  span {
    background-color: ${(props) => (props.turn % 4 < 2 ? '#f15852' : '#9ebdf0')};
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid white;
  }
  height: 3rem;
`;

export default CurrentLeader;
