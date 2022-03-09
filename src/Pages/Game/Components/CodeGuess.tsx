import styled from 'styled-components';

function makeEmptyOptionTag() {
  const emptyOptionTag = document.createElement('option');
  emptyOptionTag.value = '';
  emptyOptionTag.disabled = true;
  emptyOptionTag.selected = true;
  return emptyOptionTag;
}

function makeNewOptions(code: HTMLSelectElement, possibleCode: number[], codeIndex: number) {
  while (code.firstChild) {
    code.removeChild(code.firstChild);
  }
  code.appendChild(makeEmptyOptionTag());
  possibleCode.forEach((number, index) => {
    const child = document.createElement('option');
    child.value = number.toString();
    child.text = number.toString();
    if (codeIndex !== -1 && codeIndex === index + 1) {
      child.selected = true;
    }
    code.appendChild(child);
  });
}

function handleChange() {
  const firstCode = document.getElementById('guessFirstCode') as HTMLSelectElement;
  const secondCode = document.getElementById('guessSecondCode') as HTMLSelectElement;
  const thirdCode = document.getElementById('guessThirdCode') as HTMLSelectElement;
  const possibleCode = [1, 2, 3, 4];
  const selectedIndex = [
    firstCode.options.selectedIndex,
    secondCode.options.selectedIndex,
    thirdCode.options.selectedIndex,
  ];
  const possibleSecondCode = possibleCode.filter((value, index) => index !== selectedIndex[0] - 1);
  const possibleThirdCode = possibleSecondCode.filter((value, index) => index !== selectedIndex[1] - 1);
  makeNewOptions(secondCode, possibleSecondCode, selectedIndex[1]);
  makeNewOptions(thirdCode, possibleThirdCode, selectedIndex[2]);
}

function CodeGuess({ hints }: { hints: string[] }) {
  return (
    <GuessForm onChange={handleChange}>
      <div className='formArea'>
        <table>
          <tr>
            <th style={{ color: 'white' }}>Hint</th>
            <th style={{ color: 'white' }}>Code</th>
          </tr>
          <tr>
            <td className='labelArea'>
              <label htmlFor='guessFirstCode'>{hints[0]}</label>
            </td>
            <td>
              <select name='guessFirstCode' id='guessFirstCode' required>
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
              <label htmlFor='guessSecondCode'>{hints[1]}</label>
            </td>
            <td>
              <select name='guessSecondCode' id='guessSecondCode' required>
                {' '}
              </select>
            </td>
          </tr>
          <tr>
            <td className='labelArea'>
              <label htmlFor='guessThirdCode'>{hints[2]}</label>
            </td>
            <td>
              <select name='guessThirdCode' id='guessThirdCode' required>
                {' '}
              </select>
            </td>
          </tr>
        </table>
        <div className='buttonArea'>
          <button type='submit'>Submit</button>
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
