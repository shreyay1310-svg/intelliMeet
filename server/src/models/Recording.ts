import mongoose, { Document, Schema } from 'mongoose';

export interface IRecording extends Document {
  meetingId: mongoose.Types.ObjectId;
  title: string;
  durationSeconds: number;
  url: string;
  thumbnailUrl: string;
  sizeBytes: number;
  recordedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const recordingSchema = new Schema<IRecording>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    durationSeconds: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    sizeBytes: {
      type: Number,
      default: 0,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Recording = mongoose.model<IRecording>('Recording', recordingSchema);
