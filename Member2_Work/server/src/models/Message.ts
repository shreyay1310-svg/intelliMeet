import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  meetingId: mongoose.Types.ObjectId | string;
  sender?: mongoose.Types.ObjectId;
  senderName: string;
  senderAvatar: string;
  text: string;
  isSystemMessage: boolean;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    meetingId: {
      type: Schema.Types.Mixed,
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    senderName: {
      type: String,
      required: true,
    },
    senderAvatar: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    isSystemMessage: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>('Message', messageSchema);
