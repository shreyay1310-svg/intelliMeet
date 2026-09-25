import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  description: string;
  host: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  meetingType: 'internal' | 'client' | 'team-sync' | 'review';
  platform: 'IntellMeet' | 'Google Meet' | 'Teams' | 'Zoom';
  meetingRoomId: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  recordingUrl?: string;
  transcriptId?: mongoose.Types.ObjectId;
  summaryId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const meetingSchema = new Schema<IMeeting>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a meeting title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startTime: {
      type: Date,
      required: [true, 'Please provide start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please provide end time'],
    },
    duration: {
      type: Number,
      default: 30,
    },
    meetingType: {
      type: String,
      enum: ['internal', 'client', 'team-sync', 'review'],
      default: 'internal',
    },
    platform: {
      type: String,
      enum: ['IntellMeet', 'Google Meet', 'Teams', 'Zoom'],
      default: 'IntellMeet',
    },
    meetingRoomId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'ended', 'cancelled'],
      default: 'scheduled',
      index: true,
    },
    recordingUrl: {
      type: String,
      default: '',
    },
    transcriptId: {
      type: Schema.Types.ObjectId,
      ref: 'Transcript',
    },
    summaryId: {
      type: Schema.Types.ObjectId,
      ref: 'MeetingSummary',
    },
  },
  {
    timestamps: true,
  }
);

export const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);
