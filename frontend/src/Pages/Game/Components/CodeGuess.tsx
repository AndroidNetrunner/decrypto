import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/rootStore';
import socket from '../../../Utils/socket';

function CodeGuess() {
  const { stageNumber } = useSelector((rootState: RootState) => rootState.game);
  const currentTeam = stageNumber % 4 === 1 ? 'sovietTeam' : 'usaTeam';
  const { hints } = useSelector((rootState: RootState) => rootState.game[currentTeam]);
  const { answerCode } = useSelector((rootState: RootState) => rootState.game);
  const [firstCode, setFirstCode] = useState(0);
  const [secondCode, setSecondCode] = useState(0);
  const [thirdCode, setThirdCode] = useState(0);

  const isValidCode = (): boolean => {
    if (!(firstCode && secondCode && thirdCode)) return false;
    return new Set([firstCode, secondCode, thirdCode]).size === 3;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTimeout(() => socket.emit('SUBMIT_CODE', [firstCode, secondCode, thirdCode]), 0);
  };

  return (
    <GuessForm onSubmit={handleSubmit}>
      <div className='formArea'>
        <table>
          <tr>
            <th style={{ color: 'white' }}>Hint</th>
            <th style={{ color: 'white' }}>Code</th>
          </tr>
          <tr>
            <td className='labelArea'>
              <label htmlFor='guessFirstCode'>{hints[Math.floor(stageNumber / 4)][answerCode[0] - 1]}</label>
            </td>
            <td>
              <select required onChange={(event) => setFirstCode(Number(event.target.value))}>
                <option disabled selected>
                  {' '}
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className='labelArea'>
              <label htmlFor='guessSecondCode'>{hints[Math.floor(stageNumber / 4)][answerCode[1] - 1]}</label>
            </td>
            <td>
              <select required onChange={(event) => setSecondCode(Number(event.target.value))}>
                <option disabled selected>
                  {' '}
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className='labelArea'>
              <label htmlFor='guessThirdCode'>{hints[Math.floor(stageNumber / 4)][answerCode[2] - 1]}</label>
            </td>
            <td>
              <select required onChange={(event) => setThirdCode(Number(event.target.value))}>
                <option disabled selected>
                  {' '}
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </td>
          </tr>
        </table>
        <div className='buttonArea'>
          <button type='submit' disabled={!isValidCode()}>
            Submit
          </button>
        </div>
      </div>
    </GuessForm>
  );
}

const GuessForm = styled.form`
  margin: 0.5%;

  .formArea {
    display: flex;
  }

  table {
    border-collapse: separate;
    border-spacing: 3px 5px;
  }

  .labelArea {
    background-color: #fbeaeb;
    width: 15rem;
    border-radius: 8px;
    padding: 0.6em;
  }

  .buttonArea {
    padding: 15px;
    margin: auto 0;
  }

  button {
    &:disabled {
      pointer-events: none;
      opacity: 0.65;
    }
    height: 40px;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #000000;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    background-color: #b4bce3;
  }

  label {
    font-size: 12px;
  }

  select {
    width: 35px;
    padding: 0.4em 0.3em;
    border: none;
    border-radius: 10px;
    background-color: #b4bce3;
  }
`;
export default CodeGuess;
