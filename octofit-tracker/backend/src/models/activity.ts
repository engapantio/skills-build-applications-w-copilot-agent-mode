import { model, Schema } from 'mongoose';

export interface Activity {
  userId?: Schema.Types.ObjectId;
  activityType?: string;
  durationMinutes?: number;
  caloriesBurned?: number;
  date?: Date;
  notes?: string;
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    activityType: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    caloriesBurned: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
