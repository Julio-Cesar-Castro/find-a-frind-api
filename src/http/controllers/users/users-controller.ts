import { makeRegisterUseCase } from '@/factories/make-register-use-case.ts'
import { UserAlreadyExist } from '@/use-cases/errors/user-already-exist.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, { error: 'Deve ter no mínimo 6 caracteres' }),
    phone: z.string().min(10, { error: 'Deve ter no mínimo 10 caracteres' }),
    city: z.string(),
    birthday: z.string(),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
  })

  const { email, name, password, birthday, city, phone, role } =
    bodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      password,
      phone,
      email,
      city,
      birthday,
      role,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExist) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
