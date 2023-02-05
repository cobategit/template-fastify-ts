import { AppError } from './app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export const asyncCatch = (fn: any) => {
  return (req: any, reply: any) => {
    Promise.resolve(fn(req, reply)).catch((error) => {
      throw new AppError(400, false, `Error asyncCatch - ${error}`, '001')
    })
  }
}
