import styled from 'styled-components';

function checkForm(event: React.MouseEvent<HTMLInputElement, MouseEvent>): boolean {
  const firstCode = document.getElementById('guessFirstCode') as HTMLSelectElement;
  const secondCode = document.getElementById('guessSecondCode')  as HTMLSelectElement;
  const thirdCode = document.getElementById('guessThirdCode') as HTMLSelectElement;
  if (firstCode && secondCode && thirdCode) {
    if (
      !(
        firstCode.options.selectedIndex !== secondCode.options.selectedIndex &&
        secondCode.options.selectedIndex !== thirdCode.options.selectedIndex &&
        firstCode.options.selectedIndex !== thirdCode.options.selectedIndex
      )
    ) {
      alert('코드 안에 같은 숫자가 포함되어 있습니다.');
      event.preventDefault();
      return false;
    }
    return true;
  }
  return false;
}

function CodeGuess({ hints }: { hints: string[] }) {
  return (
    <GuessForm>
      <label htmlFor='guessFirstCode'>힌트: {hints[0]}</label>
      <select name='guessFirstCode' id='guessFirstCode' required>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      <label htmlFor='guessSecondCode'>힌트: {hints[1]}</label>
      <select name='guessSecondCode' id='guessSecondCode' required>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      <label htmlFor='guessThirdCode'>힌트: {hints[2]}</label>
      <select name='guessThirdCode' id='guessThirdCode' required>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      <input type='submit' value='제출' onClick={checkForm} />
    </GuessForm>
  );
}

const GuessForm = styled.form`

`;
export default CodeGuess;