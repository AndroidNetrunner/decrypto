import GameInterface from '../Interfaces/Game.interface';

export default function getLeader(game: GameInterface, stage: number) {
  const { players } = Math.floor(stage / 2) % 2 ? game.usaTeam : game.sovietTeam;
  return players[Math.floor(stage / 4) % players.length];
}
