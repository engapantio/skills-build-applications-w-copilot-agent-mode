import { model, Schema } from 'mongoose';

export interface Activity {
  userId: Schema.Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

const Activity = model('Activity', activitySchema);

export default Activity;
