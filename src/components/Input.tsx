interface IProps {
  onClick : ()=>void;
}

export default function Input({onClick}:IProps){
  return <>
      <label></label>
      <input/>
      <button onClick={onClick}></button>
    </>
}