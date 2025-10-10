import fastify, { type FastifyReply, type FastifyRequest } from 'fastify'

export const app = fastify()

app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send({ message: 'Hello World' })
})
