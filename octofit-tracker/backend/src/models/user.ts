import { model, Schema } from 'mongoose';

export interface User {
  username?: string;
  email?: string;
  displayName?: string;
  teamId?: Schema.Types.ObjectId;
  totalPoints?: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    displayName: { type: String, trim: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
