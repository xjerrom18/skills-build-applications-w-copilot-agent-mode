import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IMetric extends Document {
  session: Types.ObjectId
  type: string
  value: number
  unit?: string
  recordedAt: Date
}

const MetricSchema = new Schema<IMetric>({
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String },
  recordedAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IMetric>('Metric', MetricSchema)
