import { model, Schema } from 'mongoose';

export interface LeaderboardEntry {
  userId?: Schema.Types.ObjectId;
  teamId?: Schema.Types.ObjectId;
  score: number;
}

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

leaderboardSchema.pre('validate', function () {
  if (Boolean(this.userId) === Boolean(this.teamId)) {
    this.invalidate('userId', 'A leaderboard entry must reference either a user or a team.');
  }
});

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
