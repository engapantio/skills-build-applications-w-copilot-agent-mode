import { model, Schema } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  teamId?: Schema.Types.ObjectId;
  totalPoints: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

export const UserModel = model<User>('User', userSchema);
