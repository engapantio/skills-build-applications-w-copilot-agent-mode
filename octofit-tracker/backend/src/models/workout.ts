import { model, Schema } from 'mongoose';

export interface Workout {
  name: string;
  description?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
