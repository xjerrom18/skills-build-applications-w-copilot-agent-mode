import * as metricService from '../services/metricService'
import Session from '../models/Session'
import { Types } from 'mongoose'

export async function list() {
  return metricService.list()
}

export async function create(data: any) {
  if (!data || !data.session || !data.type) {
    const err: any = new Error('Metric requires session and type')
    err.status = 400
    throw err
  }

  if (!Types.ObjectId.isValid(data.session)) {
    const err: any = new Error('Invalid session id')
    err.status = 400
    throw err
  }

  const sessionExists = await Session.exists({ _id: data.session })
  if (!sessionExists) {
    const err: any = new Error('Referenced session does not exist')
    err.status = 400
    throw err
  }

  // Normalize type
  data.type = String(data.type).trim()

  return metricService.create(data)
}

export async function getById(id: string) {
  return metricService.getById(id)
}

export async function update(id: string, data: any) {
  // Prevent changing session reference
  if (data.session) delete data.session
  return metricService.update(id, data)
}

export async function remove(id: string) {
  return metricService.remove(id)
}
