import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository.ts'
import { AuthenticateUserUseCase } from './authenticate.ts'
import { hash } from 'bcrypt'
import { UserInvalidCredentials } from '../errors/user-invalid-credentials.ts'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('Unit Test User Login', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(userRepository)
  })

  it('should authenticate a user', async () => {
    await userRepository.create({
      id: randomUUID(),
      birthday: String(new Date('2002-24-09')),
      city: 'Salto',
      created_at: String(new Date()),
      email: 'Johndoe@example.com',
      name: 'John Doe',
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'USER',
    })

    const { user } = await sut.execute({
      email: 'Johndoe@example.com',
      password: '12345678',
    })

    expect(user.email).toBe('Johndoe@example.com')
  })

  it('should throw a error if email is wrong', async () => {
    await userRepository.create({
      id: randomUUID(),
      birthday: String(new Date('2002-24-09')),
      city: 'Salto',
      created_at: String(new Date()),
      email: 'Johndoe@example.com',
      name: 'John Doe',
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'USER',
    })

    await expect(async () =>
      sut.execute({
        email: 'Johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UserInvalidCredentials)
  })

  it('should throw a error if password is wrong', async () => {
    await userRepository.create({
      id: randomUUID(),
      birthday: String(new Date('2002-24-09')),
      city: 'Salto',
      created_at: String(new Date()),
      email: 'Johndoe@example.com',
      name: 'John Doe',
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'USER',
    })

    await expect(async () =>
      sut.execute({
        email: 'wrong-password@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserInvalidCredentials)
  })
})
