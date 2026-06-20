import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ISession extends Document {
  user: Types.ObjectId
  workout: Types.ObjectId
  startAt: Date
  endAt?: Date
  notes?: string
}

const SessionSchema = new Schema<ISession>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: false },
  startAt: { type: Date, default: () => new Date() },
  endAt: { type: Date },
  notes: { type: String }
})

export default mongoose.model<ISession>('Session', SessionSchema)
