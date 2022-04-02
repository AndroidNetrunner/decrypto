import mongoose from 'mongoose';

interface WordInterface {
  word: string;
}

const wordSchema = new mongoose.Schema({
  word: { type: Array },
});

const Word = mongoose.model<WordInterface>('Word', wordSchema);
export default Word;
