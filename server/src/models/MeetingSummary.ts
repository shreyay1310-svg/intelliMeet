import mongoose, { Document, Schema } from 'mongoose';

export interface IActionItem {
  task: string;
  assigneeName?: string;
  assignee?: mongoose.Types.ObjectId;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface IMeetingSummary extends Document {
  meetingId: mongoose.Types.ObjectId;
  overview: string;
  keyTakeaways: string[];
  actionItems: IActionItem[];
  decisions: string[];
  highlights: string[];
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
}

const meetingSummarySchema = new Schema<IMeetingSummary>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
      unique: true,
      index: true,
    },
    overview: {
      type: String,
      required: true,
    },
    keyTakeaways: [
      {
        type: String,
      },
    ],
    actionItems: [
      {
        task: { type: String, required: true },
        assigneeName: { type: String },
        assignee: { type: Schema.Types.ObjectId, ref: 'User' },
        dueDate: { type: Date },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
      },
    ],
    decisions: [{ type: String }],
    highlights: [{ type: String }],
    topics: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const MeetingSummary = mongoose.model<IMeetingSummary>('MeetingSummary', meetingSummarySchema);
