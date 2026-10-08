import { model, Schema } from 'mongoose';

export interface Workout {
  name?: string;
  description?: string;
  difficulty?: string;
  durationMinutes?: number;
  exercises?: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    exercises: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
