import mongoose from 'mongoose';

interface CodeInterface {
  code: string;
}

const CodeSchema = new mongoose.Schema({
  code: { type: String },
});

const Code = mongoose.model<CodeInterface>('Code', CodeSchema);
export default Code;
