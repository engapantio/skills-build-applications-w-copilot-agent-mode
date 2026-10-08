import { model, Schema } from 'mongoose';

export interface LeaderboardEntry {
  userId?: Schema.Types.ObjectId;
  teamId?: Schema.Types.ObjectId;
  score?: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
