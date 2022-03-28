export default function Flag({ nation }: { nation: string }) {
  return <img alt='img' src={nation === 'soviet' ? '../../../img/soviet.png' : '../../../img/usa.png'} />;
}
