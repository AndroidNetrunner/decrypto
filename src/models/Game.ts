import mongoose from 'mongoose';

interface IGame {
  roomId: string;
  isPlay: boolean;
  users?: mongoose.Types.ObjectId[];
  team: {
    redTeam: { users: mongoose.Types.ObjectId[] };
    blueTeam: { users: mongoose.Types.ObjectId[] };
  };
}

const gameSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  isPlay: { type: Boolean, default: false },
  team: {
    redTeam: {
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    blueTeam: {
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;
