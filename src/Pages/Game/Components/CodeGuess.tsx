import styled from 'styled-components';

// function checkForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): boolean {
//   const firstCode = document.getElementById('guessFirstCode') as HTMLSelectElement;
//   const secondCode = document.getElementById('guessSecondCode') as HTMLSelectElement;
//   const thirdCode = document.getElementById('guessThirdCode') as HTMLSelectElement;
//   if (firstCode && secondCode && thirdCode) {
//     if (
//       !(
//         firstCode.options.selectedIndex !== secondCode.options.selectedIndex &&
//         secondCode.options.selectedIndex !== thirdCode.options.selectedIndex &&
//         firstCode.options.selectedIndex !== thirdCode.options.selectedIndex
//       )
//     ) {
//       alert('코드 안에 같은 숫자가 포함되어 있습니다.');
//       event.preventDefault();
//       return false;
//     }
//     return true;
//   }
//   return false;
// }

function handleChange() {
  const firstCode = document.getElementById('guessFirstCode') as HTMLSelectElement;
  const secondCode = document.getElementById('guessSecondCode') as HTMLSelectElement;
  const thirdCode = document.getElementById('guessThirdCode') as HTMLSelectElement;
  const possibleCode = [1, 2, 3, 4];
  const selectedFirstCodeIndex = firstCode.options.selectedIndex;
  const selectedSecondCodeIndex = secondCode.options.selectedIndex;
  const selectedThirdCodeIndex = thirdCode.options.selectedIndex;
  const possibleSecondCode = possibleCode.filter((value, index) => index !== selectedFirstCodeIndex);
  const possibleThirdCode = possibleSecondCode.filter((value, index) => index !== selectedSecondCodeIndex);
  while (secondCode.firstChild) {
    secondCode.removeChild(secondCode.firstChild);
  }
  while (thirdCode.firstChild) {
    thirdCode.removeChild(thirdCode.firstChild);
  }
  possibleSecondCode.forEach((number, index) => {
    const child = document.createElement('option');
    child.value = number.toString();
    child.text = number.toString();
    if (selectedSecondCodeIndex !== -1 && selectedSecondCodeIndex === index) {
      child.selected = true;
    }
    secondCode.appendChild(child);
  });
  possibleThirdCode.forEach((number, index) => {
    const child = document.createElement('option');
    child.value = number.toString();
    child.text = number.toString();
    if (selectedThirdCodeIndex !== -1 && selectedThirdCodeIndex === index) {
      child.selected = true;
    }
    thirdCode.appendChild(child);
  });
}

function CodeGuess({ hints }: { hints: string[] }) {
  return (
    <GuessForm onChange={handleChange}>
      <table>
        <tr>
          <th>힌트</th>
          <th>번호</th>
        </tr>
        <tr>
          <td>
            <label htmlFor='guessFirstCode'>{hints[0]}</label>
          </td>
          <td>
            <select name='guessFirstCode' id='guessFirstCode' required>
              <option disabled selected>
                Choose Answer
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor='guessSecondCode'>{hints[1]}</label>
          </td>
          <td>
            <select name='guessSecondCode' id='guessSecondCode' required>
              {/* <option value='1'>1</option>
              <option value='2' selected>
                2
              </option>
              <option value='3'>3</option>
              <option value='4'>4</option> */}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor='guessThirdCode'>{hints[2]}</label>
          </td>
          <td>
            <select name='guessThirdCode' id='guessThirdCode' required>
              {/* <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3' selected>
                3
              </option>
              <option value='4'>4</option> */}
            </select>
          </td>
        </tr>
      </table>
      <button type='submit'>제출</button>
    </GuessForm>
  );
}

const GuessForm = styled.form`
  th,
  td {
    padding: 2px;
  }

  button {
    &:disabled {
      pointer-events: none;
      opacity: 0.65;
    }
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #ffffff;
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
    background-color: #006364;
  }
`;
export default CodeGuess;
