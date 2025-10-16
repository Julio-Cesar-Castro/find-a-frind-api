import type { FastifyInstance } from 'fastify'
import { register } from './users-controller.ts'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
