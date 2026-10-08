import { model, Schema } from 'mongoose';

export interface Team {
  name: string;
  description?: string;
  members: Schema.Types.ObjectId[];
  totalPoints: number;
}

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

teamSchema.index({ name: 1 }, { unique: true });

const Team = model('Team', teamSchema);

export default Team;
