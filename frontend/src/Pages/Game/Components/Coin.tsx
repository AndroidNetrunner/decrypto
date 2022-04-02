interface Props {
  color: string;
  count: number;
}

export default function Coin({ color, count }: Props) {
  if (color === 'green' && count >= 1)
    return <img src='../../img/my-coin-green.gif' alt='green' style={{ width: '2rem', height: '2rem' }} />;
  if (color === 'green')
    return <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />;
  if (color === 'red' && count >= 1)
    return <img src='../../img/my-coin-pink.gif' alt='pink' style={{ width: '2rem', height: '2rem' }} />;
  if (color === 'red')
    return <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />;
  return <img src='../../img/empty-coin.gif' alt='empty' style={{ width: '2rem', height: '2rem' }} />;
}
