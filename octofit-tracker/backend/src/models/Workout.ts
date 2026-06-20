import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  description?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
