import mongoose, { Document, Schema } from 'mongoose';

export interface ITranscriptEntry {
  speaker: string;
  userId?: mongoose.Types.ObjectId;
  timestamp: Date;
  text: string;
}

export interface ITranscript extends Document {
  meetingId: mongoose.Types.ObjectId;
  entries: ITranscriptEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const transcriptSchema = new Schema<ITranscript>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
      index: true,
    },
    entries: [
      {
        speaker: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now },
        text: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Transcript = mongoose.model<ITranscript>('Transcript', transcriptSchema);
